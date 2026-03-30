/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  ChevronDown, 
  BookOpen, 
  Pencil, 
  PenTool,
  Clock, 
  MapPin, 
  Play, 
  Star,
  ArrowRight,
  Globe,
  Printer,
  Gift,
  Cpu,
  Settings,
  Package,
  ChevronRight,
  ChevronLeft,
  Menu,
  Mouse,
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Megaphone,
  Shield,
  ShoppingBag,
  Zap,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Layers,
  GraduationCap,
  Keyboard,
  Headphones,
  Smartphone,
  Speaker,
  Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = React.useState<'home' | 'shop' | 'courses' | 'services' | 'cart' | 'printing'>('home');
  const [lang, setLang] = React.useState<'ENG' | 'HIN'>('ENG');
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  
  // UI-only cart state for demonstration purposes
  const [cartItems, setCartItems] = React.useState([
    { id: 1, name: "Premium Fountain Pen", price: 1299, qty: 1, img: "https://picsum.photos/seed/cart-0/100/100" },
    { id: 2, name: "Leather Bound Journal", price: 850, qty: 2, img: "https://picsum.photos/seed/cart-1/100/100" }
  ]);

  const addToCart = (product: any) => {
    // Simple UI-only logic to add item or increment quantity
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: Date.now(), ...product, qty: 1, img: `https://picsum.photos/seed/cart-${prev.length}/100/100` }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen flex bg-warm-bg selection:bg-delta-primary/20 selection:text-delta-primary">
      <Sidebar setView={setView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentView={view} 
          setView={setView} 
          lang={lang} 
          setLang={setLang} 
          onCartClick={() => setView('cart')} 
          cartCount={cartCount}
        />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onViewCart={() => { setView('cart'); setIsCartOpen(false); }}
        />

        {/* Floating Cart Trigger (Right Edge) */}
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 w-14 h-16 bg-white/80 backdrop-blur-md border-l border-y border-white/50 rounded-l-2xl shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center group transition-all duration-300"
        >
          <div className="relative">
            <ChevronLeft size={24} className="text-delta-primary group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-slate-400 group-hover:text-delta-primary transition-colors">Cart</span>
        </motion.button>

        <main className="pt-16">
          {view === 'home' && <HomePage setView={setView} onAddToCart={addToCart} />}
          {view === 'shop' && <ShopPage onAddToCart={addToCart} />}
          {view === 'courses' && <CoursesPage />}
          {view === 'services' && <ServicesPage />}
          {view === 'printing' && <PrintingPage />}
          {view === 'tech' && <TechPage onAddToCart={addToCart} />}
          {view === 'cart' && <CartPage items={cartItems} onRemove={removeFromCart} onUpdateQty={updateQty} />}
        </main>
        <Footer />
      </div>

      {/* Floating Chat Bubble */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-8 bottom-8 z-40 w-14 h-14 bg-white border border-black/5 rounded-full shadow-2xl flex items-center justify-center text-slate-900 hover:text-delta-primary transition-all"
      >
        <MessageCircle size={24} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </motion.button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        .font-hindi {
          font-family: 'Noto Sans Devanagari', sans-serif;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

// --- COMPONENTS ---

function Sidebar({ setView }: { setView: (v: any) => void }) {
  const [activeCategory, setActiveCategory] = React.useState('All Products');

  const categories = [
    { 
      name: 'All Products', 
      icon: <ShoppingBag size={18} />, 
      sub: [
        { name: 'Stationery', view: 'shop', icon: <Pencil size={14} /> },
        { name: 'Printing', view: 'printing', icon: <Printer size={14} /> },
        { name: 'Gifts', view: 'shop', icon: <Gift size={14} /> },
        { name: 'Tech Products', view: 'tech', icon: <Mouse size={14} /> }
      ] 
    },
    { 
      name: 'Education', 
      icon: <BookOpen size={18} />, 
      sub: [
        { name: 'Courses', view: 'courses', icon: <GraduationCap size={14} /> }
      ] 
    },
    { 
      name: 'Services', 
      icon: <Settings size={18} />,
      view: 'services'
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] border-r border-black/5 bg-white h-screen sticky top-0 z-50 p-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 cursor-pointer mb-12" onClick={() => setView('home')}>
        <div className="w-10 h-10 bg-delta-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">Δ</div>
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tighter text-delta-secondary leading-none">DELTA</span>
          <span className="text-[10px] font-bold text-delta-primary tracking-[0.1em] uppercase whitespace-nowrap">Institute & Stationery Store</span>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-4">Categories</h4>
          <div className="space-y-1">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-1">
                <button 
                  onClick={() => {
                    if (cat.view) {
                      setView(cat.view);
                      setActiveCategory(cat.name);
                    } else {
                      setActiveCategory(activeCategory === cat.name ? '' : cat.name);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${activeCategory === cat.name ? 'bg-slate-50 text-delta-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-delta-primary'}`}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon}
                    <span className="text-sm font-bold">{cat.name}</span>
                  </div>
                  {cat.sub && <ChevronDown size={14} className={activeCategory === cat.name ? '' : '-rotate-90'} />}
                </button>
                {activeCategory === cat.name && cat.sub && (
                  <div className="ml-6 space-y-1 py-2">
                    {cat.sub.map((s, j) => (
                      <button 
                        key={j} 
                        onClick={() => setView(s.view)}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-left group hover:bg-slate-50 transition-all"
                      >
                        <div className="text-slate-300 group-hover:text-delta-primary transition-colors">
                          {s.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-delta-primary transition-colors">{s.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Header({ currentView, setView, lang, setLang, onCartClick, cartCount }: { 
  currentView: string, 
  setView: (v: 'home' | 'shop' | 'courses' | 'services' | 'cart') => void,
  lang: 'ENG' | 'HIN',
  setLang: (l: 'ENG' | 'HIN') => void,
  onCartClick: () => void,
  cartCount: number
}) {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[280px] z-50 glass-header px-4 md:px-8 py-3 flex items-center justify-between border-b border-black/5">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:block w-48 lg:w-64">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-1.5 gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-delta-primary/20 transition-all">
            <Search size={14} className="text-slate-400" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-xs w-full" />
          </div>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-slate-600 absolute left-1/2 -translate-x-1/2">
        <button onClick={() => setView('home')} className={`${currentView === 'home' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Home</button>
        <button onClick={() => setView('shop')} className={`${currentView === 'shop' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Shop</button>
        <button onClick={() => setView('courses')} className={`${currentView === 'courses' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Courses</button>
        <button onClick={() => setView('services')} className={`${currentView === 'services' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Services</button>
      </nav>

      <div className="flex items-center gap-3 md:gap-6 text-slate-600">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 mr-2">
          <button 
            onClick={() => setLang('ENG')}
            className={`px-2 py-1 rounded ${lang === 'ENG' ? 'bg-black text-white' : 'hover:text-delta-primary'} transition-colors`}
          >
            ENG
          </button>
          <button 
            onClick={() => setLang('HIN')}
            className={`px-2 py-1 rounded ${lang === 'HIN' ? 'bg-black text-white font-hindi' : 'hover:text-delta-primary font-hindi'} transition-colors`}
          >
            हिन्दी
          </button>
        </div>

        <Heart size={20} className="cursor-pointer hover:text-delta-primary transition-colors" />
        <div 
          className="relative cursor-pointer hover:text-delta-primary transition-colors"
          onClick={onCartClick}
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-delta-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer overflow-hidden border border-white hover:border-delta-primary transition-all">
            <User size={18} className="text-slate-500" />
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-[60]"
              >
                <div className="p-4 border-b border-black/5">
                  <p className="text-xs font-black text-slate-900 truncate">Dyvanshhi SN</p>
                  <p className="text-[10px] text-slate-400 truncate">dyvanshhi.sn@gmail.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-delta-primary/10 hover:text-delta-primary transition-all flex items-center gap-2">
                    <Settings size={14} /> Dashboard
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-delta-primary/10 hover:text-delta-primary transition-all flex items-center gap-2">
                    <User size={14} /> Edit Profile
                  </button>
                  <div className="my-1 border-t border-black/5" />
                  <button className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all flex items-center gap-2">
                    <X size={14} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function CartPage({ items, onRemove, onUpdateQty }: { 
  items: any[], 
  onRemove: (id: number) => void,
  onUpdateQty: (id: number, delta: number) => void
}) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const savedItems = [
    { id: 101, name: "ARCHITECTURAL SCALE", img: "https://picsum.photos/seed/saved-1/100/100" },
    { id: 102, name: "PREMIUM DESK MAT", img: "https://picsum.photos/seed/saved-2/100/100" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Title Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your Shopping Cart</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{items.length} ITEMS READY FOR CHECKOUT</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-8">
            <button className="px-8 py-4 bg-black text-white rounded-lg font-bold text-xs flex items-center gap-3 shadow-lg shadow-black/20">
              <ShoppingCart size={16} fill="currentColor" /> CART OVERVIEW
            </button>
            <button className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all">
              <Heart size={16} /> SAVED ITEMS
            </button>
            <button className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all">
              <Clock size={16} /> ORDER HISTORY
            </button>
            <button className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all">
              <User size={16} /> PAYMENT METHODS
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Side - Main Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-8 group hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-500">
                  <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-delta-primary transition-colors">{item.name}</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">CARBON MATTE SERIES / LIMITED EDITION</p>
                        </div>
                        <p className="text-xl font-black text-slate-900">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
                      <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-sm font-black w-12 text-center text-slate-900">{item.qty}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-full transition-all"
                      >
                        <Trash2 size={14} /> REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-[2rem] border border-black/5 text-center space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
                  <ShoppingCart size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-sm text-slate-500">Add some items to your cart to see them here.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Summary Panel */}
          <div className="space-y-8">
            {/* Saved Items */}
            <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">SAVED ITEMS (2)</h3>
              <div className="space-y-6">
                {savedItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-[11px] font-black text-slate-900 leading-tight tracking-wide">{item.name}</h4>
                      <button className="text-[10px] font-black text-delta-primary uppercase tracking-widest hover:underline">MOVE TO CART</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-delta-primary transition-colors">
                  VIEW MORE <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#f1f3f5] p-10 rounded-[2rem] border border-black/5 space-y-10">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">ORDER SUMMARY</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>SUBTOTAL</span>
                  <span className="text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>GST (18%)</span>
                  <span className="text-slate-900">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>SHIPPING</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">TOTAL</span>
                <span className="text-5xl font-black text-slate-900">₹{total.toLocaleString()}</span>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DISCOUNT CODE</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="DELTA20" 
                    className="flex-1 bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-delta-primary/20 transition-all"
                  />
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all">APPLY</button>
                </div>
              </div>

              <div className="space-y-6">
                <button className="w-full py-5 bg-black text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-black/20">
                  PROCEED TO CHECKOUT
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Shield size={14} /> SECURE CHECKOUT VIA SSL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setView, onAddToCart }: { 
  setView: (v: 'home' | 'shop' | 'courses' | 'services' | 'cart' | 'printing') => void,
  onAddToCart: (p: any) => void 
}) {
  return (
    <>
      <section className="relative px-4 md:px-8 pt-4">
        <div className="relative min-h-[70vh] flex items-center px-8 md:px-16 overflow-hidden bg-white rounded-[3rem] border border-black/5 shadow-sm">
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold text-delta-primary tracking-tighter leading-[0.9]">Learning <br />& Store</h1>
                <p className="text-lg text-delta-secondary max-w-lg leading-relaxed font-medium">Expert computer services, quality stationery, and professional institute courses all under one roof.</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => setView('courses')} className="px-10 py-4 bg-white text-delta-primary border-2 border-delta-primary rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary hover:text-white transition-all">
                  Explore Courses
                </button>
                <button onClick={() => setView('shop')} className="px-10 py-4 bg-delta-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary/90 transition-all shadow-xl shadow-delta-primary/20">
                  Shop Now
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" alt="Modern office" className="w-full h-[550px] object-cover grayscale-[0.2]" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicator */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="text-slate-300 hover:text-slate-900 transition-colors">
            <ChevronLeft size={12} strokeWidth={4} />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-slate-200" />
            <div className="w-4 h-1 rounded-full bg-slate-900" />
            <div className="w-1 h-1 rounded-full bg-slate-200" />
          </div>
          <button className="text-slate-300 hover:text-slate-900 transition-colors">
            <ChevronRight size={12} strokeWidth={4} />
          </button>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-12 overflow-hidden bg-warm-bg">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {['PREMIUM STATIONERY', 'EXPERT COMPUTER SERVICES', 'PROFESSIONAL COURSES', 'BULK PRINTING', 'GIFT CUSTOMIZATION', 'FORM FILLING'].map((text, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-delta-primary" />
              <span className="text-4xl font-black text-delta-primary/10 uppercase tracking-tighter">{text}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {['PREMIUM STATIONERY', 'EXPERT COMPUTER SERVICES', 'PROFESSIONAL COURSES', 'BULK PRINTING', 'GIFT CUSTOMIZATION', 'FORM FILLING'].map((text, i) => (
            <div key={i + 10} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-delta-primary" />
              <span className="text-4xl font-black text-delta-primary/10 uppercase tracking-tighter">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Bar */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="bg-[#fdfde0] border-l-[8px] border-l-[#7a7a2e] rounded-r-[2.5rem] rounded-l-md py-8 px-12 flex items-center gap-8 shadow-sm">
          <div className="text-[#7a7a2e] flex-shrink-0">
            <Megaphone size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-[#7a7a2e]">Important Notices</h4>
            <p className="text-sm font-medium text-[#7a7a2e]/70 leading-relaxed">Live forms opened till Oct 31st. Ensure all submissions are verified.</p>
          </div>
        </div>
      </div>
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">Core Services</h2>
          <button onClick={() => setView('services')} className="text-[10px] font-black uppercase tracking-widest text-delta-secondary flex items-center gap-2 hover:text-delta-primary transition-colors">View All <ChevronRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: <Printer size={32} />, title: "Printing", color: "text-blue-600", bg: "bg-blue-50", view: 'printing' },
            { icon: <BookOpen size={32} />, title: "Form Filling", color: "text-green-600", bg: "bg-green-50", view: 'services' },
            { icon: <Cpu size={32} />, title: "Computer Services", color: "text-purple-600", bg: "bg-purple-50", view: 'services' },
            { icon: <Pencil size={32} />, title: "Stationery", color: "text-orange-600", bg: "bg-orange-50", view: 'shop' },
            { icon: <Gift size={32} />, title: "Gifts", color: "text-pink-600", bg: "bg-pink-50", view: 'shop' }
          ].map((service, idx) => (
            <div key={idx} onClick={() => setView(service.view as any)} className="flex flex-col items-center text-center space-y-4 group cursor-pointer">
              <div className={`w-24 h-32 ${service.bg} rounded-[2rem] flex items-center justify-center ${service.color} group-hover:scale-105 transition-transform duration-500 shadow-sm`}>
                {service.icon}
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-delta-primary">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">Top Picks</h2>
          <button onClick={() => setView('shop')} className="text-[10px] font-black uppercase tracking-widest text-delta-secondary flex items-center gap-2 hover:text-delta-primary transition-colors">View All <ChevronRight size={14} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Professional Signature Pen", price: "₹499", rating: 4.9, img: "pen" },
            { name: "Premium Leather Journal", price: "₹899", rating: 4.8, img: "journal" },
            { name: "Wireless Tech Mouse", price: "₹1299", rating: 4.7, img: "mouse" },
            { name: "Artistic Desk Lamp", price: "₹2499", rating: 4.9, img: "lamp" }
          ].map((product, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden group hover-lift p-4">
              <div className="aspect-square bg-slate-50 rounded-[2rem] mb-6 overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-black">{product.rating}</span>
                </div>
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                  <Heart size={14} />
                </button>
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <Package size={48} />
                </div>
              </div>
              <div className="space-y-2 px-2">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-delta-primary transition-colors truncate">{product.name}</h3>
                <p className="text-lg font-black text-delta-primary">{product.price}</p>
                <div className="pt-2">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-full hover:bg-delta-primary/10 hover:text-delta-primary transition-all"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

        {/* Info Grid Section - Rearranged to match image exactly */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Video Card */}
            <div className="bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="aspect-video bg-slate-100 relative group cursor-pointer overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-delta-primary shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={28} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Find us here Card */}
            <div className="bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="aspect-[2/1] bg-slate-100 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-60 grayscale-[0.5]" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-xl border-4 border-white/50">
                    <MapPin size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-delta-primary">
                  <MapPin size={24} className="text-[#2bb6b6]" />
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Find us here</h3>
                </div>
                <p className="text-sm font-medium text-slate-400">123 Station Road, Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Right Column - Ratings */}
          <div className="bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full">
            <div className="p-10 flex-1 flex flex-col space-y-8">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Ratings</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <ArrowRight size={14} className="rotate-45" /> Good
                    </div>
                    <div className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">240 verified</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 text-yellow-400 justify-end">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    <span className="text-xl font-black text-slate-900 ml-2">4.8</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">44% Reviews</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {[
                  { name: "Anuj P.", time: "1 week ago", text: "Great service and friendly staff!", avatar: "https://i.pravatar.cc/150?u=anuj" },
                  { name: "Neha R.", time: "3 days ago", text: "High-quality products and fast delivery!", avatar: "https://i.pravatar.cc/150?u=neha" }
                ].map((review, i) => (
                  <div key={i} className="p-6 bg-slate-50/50 rounded-[2rem] border border-black/5 flex gap-4 group hover:bg-white hover:shadow-md transition-all">
                    <img src={review.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">Verified Customer</p>
                        </div>
                        <span className="text-[10px] text-slate-300 font-bold">{review.time}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center">
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-delta-primary transition-colors">
                  View All <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* Banners Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[3rem] p-12 flex items-center justify-between group cursor-pointer overflow-hidden relative">
          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Service Guide B</h3>
            <p className="text-white/50 text-xs font-bold">Download our latest service catalog</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all relative z-10">
            <ArrowRight size={20} />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="bg-orange-500 rounded-[3rem] p-12 flex items-center justify-between group cursor-pointer overflow-hidden relative">
          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Coming Soon</h3>
            <p className="text-white/80 text-xs font-bold">New stationery collection launching</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-orange-500 transition-all relative z-10">
            <ArrowRight size={20} />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
      </section>
    </>
  );
}

function ShopPage({ onAddToCart }: { onAddToCart: (p: any) => void }) {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState(5000);
  const [selectedRatings, setSelectedRatings] = React.useState<number[]>([]);
  const [selectedPromotions, setSelectedPromotions] = React.useState<string[]>([]);
  const [availability, setAvailability] = React.useState<string[]>(['In Stock']);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('Default Sorting');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [quickViewProduct, setQuickViewProduct] = React.useState<any>(null);

  const categories = ['Pens', 'Notebooks', 'Art Supplies', 'Planners', 'Desk Accessories', 'Stationery Sets'];
  const brands = ['Parker', 'Moleskine', 'Faber-Castell', 'Staedtler', 'Pilot', 'Uni-ball', 'Camlin', 'Classmate'];
  const promotions = ['New Arrivals', 'Best Sellers', 'On Sale'];

  const products = [
    { id: 1, name: "Premium Fountain Pen", category: "Pens", brand: "Parker", price: 1299, originalPrice: 2599, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-pen-1/400/400", bestseller: true, inStock: true },
    { id: 2, name: "Leather Bound Journal", category: "Notebooks", brand: "Moleskine", price: 850, originalPrice: 1060, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-journal-1/400/400", bestseller: true, inStock: true },
    { id: 3, name: "Artist Sketch Set", category: "Art Supplies", brand: "Faber-Castell", price: 2100, originalPrice: 3000, discount: "30% off", rating: 5.0, img: "https://picsum.photos/seed/delta-art-1/400/400", bestseller: false, inStock: true },
    { id: 4, name: "Ergonomic Desk Lamp", category: "Desk Accessories", brand: "Other", price: 3499, originalPrice: 3880, discount: "10% off", rating: 5.0, img: "https://picsum.photos/seed/delta-lamp-1/400/400", bestseller: false, inStock: true },
    { id: 5, name: "Mechanical Pencil Set", category: "Pens", brand: "Staedtler", price: 450, originalPrice: 900, discount: "50% off", rating: 5.0, img: "https://picsum.photos/seed/delta-pencil-1/400/400", bestseller: true, inStock: true },
    { id: 6, name: "Hardcover Planner", category: "Planners", brand: "Classmate", price: 1100, originalPrice: 2200, discount: "50% off", rating: 5.0, img: "https://picsum.photos/seed/delta-planner-1/400/400", bestseller: true, inStock: true },
    { id: 7, name: "Gel Pen Multi-Color Pack", category: "Pens", brand: "Pilot", price: 750, originalPrice: 1500, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-gelpen-1/400/400", bestseller: false, inStock: true },
    { id: 8, name: "Watercolor Paint Set", category: "Art Supplies", brand: "Camlin", price: 1200, originalPrice: 2400, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-watercolor-1/400/400", bestseller: false, inStock: true },
    { id: 9, name: "Spiral Bound Notebook", category: "Notebooks", brand: "Classmate", price: 150, originalPrice: 300, discount: "50% off", rating: 5.0, img: "https://picsum.photos/seed/delta-notebook-1/400/400", bestseller: true, inStock: true },
    { id: 10, name: "Professional Drawing Pencils", category: "Art Supplies", brand: "Staedtler", price: 950, originalPrice: 1900, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-drawing-1/400/400", bestseller: false, inStock: true },
    { id: 11, name: "Executive Desk Organizer", category: "Desk Accessories", brand: "Other", price: 1800, originalPrice: 3600, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-organizer-1/400/400", bestseller: false, inStock: true },
    { id: 12, name: "Calligraphy Ink Set", category: "Art Supplies", brand: "Parker", price: 650, originalPrice: 1300, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-ink-1/400/400", bestseller: false, inStock: true },
    { id: 13, name: "Premium Acrylic Paints", category: "Art Supplies", brand: "Faber-Castell", price: 1500, originalPrice: 2000, discount: "25% off", rating: 4.7, img: "https://picsum.photos/seed/delta-art-2/400/400", bestseller: true, inStock: true },
    { id: 14, name: "Dotted Grid Journal", category: "Notebooks", brand: "Moleskine", price: 950, originalPrice: 1200, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-journal-2/400/400", bestseller: false, inStock: true },
    { id: 15, name: "Technical Drawing Pens", category: "Pens", brand: "Uni-ball", price: 800, originalPrice: 1000, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-pen-2/400/400", bestseller: false, inStock: true },
    { id: 16, name: "Luxury Wax Seal Kit", category: "Stationery Sets", brand: "Other", price: 2499, originalPrice: 4999, discount: "50% off", rating: 5.0, img: "https://picsum.photos/seed/delta-wax-1/400/400", bestseller: true, inStock: true },
    { id: 17, name: "Premium Calligraphy Set", category: "Stationery Sets", brand: "Parker", price: 3200, originalPrice: 4000, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-calli-1/400/400", bestseller: false, inStock: true },
    { id: 18, name: "Leather Pencil Case", category: "Desk Accessories", brand: "Moleskine", price: 1200, originalPrice: 1500, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-case-1/400/400", bestseller: false, inStock: true },
    { id: 19, name: "A5 Dot Grid Journal", category: "Notebooks", brand: "Moleskine", price: 899, originalPrice: 1199, discount: "25% off", rating: 4.9, img: "https://picsum.photos/seed/delta-journal-3/400/400", bestseller: true, inStock: true },
    { id: 20, name: "Dual Tip Brush Pens", category: "Art Supplies", brand: "Faber-Castell", price: 1800, originalPrice: 2400, discount: "25% off", rating: 4.7, img: "https://picsum.photos/seed/delta-brush-1/400/400", bestseller: false, inStock: true },
  ];

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const priceMatch = p.price <= priceRange;
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(p.rating));
    const promoMatch = selectedPromotions.length === 0 || 
      (selectedPromotions.includes('Best Sellers') && p.bestseller) ||
      (selectedPromotions.includes('On Sale') && p.discount) ||
      (selectedPromotions.includes('New Arrivals') && p.id > 10);
    const stockMatch = availability.length === 0 || 
      (availability.includes('In Stock') && p.inStock) ||
      (availability.includes('Out of Stocks') && !p.inStock);
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && brandMatch && priceMatch && ratingMatch && promoMatch && stockMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return 0;
  });

  const itemsPerPage = 16;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(5000);
    setSelectedRatings([]);
    setSelectedPromotions([]);
    setAvailability(['In Stock']);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const toggleFilter = (list: any[], setList: any, value: any) => {
    if (list.includes(value)) {
      setList(list.filter(i => i !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      {/* Hero Section - Updated to match TechPage style */}
      <section className="bg-delta-secondary py-16 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-delta-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic tracking-tighter">Stationery Shop</h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">Premium tools for your creative and academic journey.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-10">
              <h2 className="text-xl font-bold border-b border-slate-100 pb-4">Filter Options</h2>

              {/* Search */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Search Products</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search stationery..." 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-delta-primary/20 outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">By Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => { toggleFilter(selectedCategories, setSelectedCategories, cat); setCurrentPage(1); }}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">By Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => { toggleFilter(selectedBrands, setSelectedBrands, brand); setCurrentPage(1); }}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Price Range</h3>
                <div className="space-y-4">
                  <div className="text-sm font-bold text-slate-700">₹0 - ₹{priceRange}</div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    step="100"
                    value={priceRange}
                    onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-delta-primary"
                  />
                </div>
              </div>

              {/* Review */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Customer Review</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <label key={star} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedRatings.includes(star)}
                        onChange={() => { toggleFilter(selectedRatings, setSelectedRatings, star); setCurrentPage(1); }}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary"
                      />
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < star ? "currentColor" : "none"} className={i < star ? "" : "text-slate-200"} />)}
                        <span className="text-xs text-slate-400 ml-1 font-bold">{star} Star</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Promotions */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Promotions</h3>
                <div className="space-y-2">
                  {promotions.map(promo => (
                    <label key={promo} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedPromotions.includes(promo)}
                        onChange={() => { toggleFilter(selectedPromotions, setSelectedPromotions, promo); setCurrentPage(1); }}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{promo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Availability</h3>
                <div className="space-y-2">
                  {['In Stock', 'Out of Stocks'].map(status => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={availability.includes(status)}
                        onChange={() => { toggleFilter(availability, setAvailability, status); setCurrentPage(1); }}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results</p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none text-delta-primary cursor-pointer"
                >
                  <option>Default Sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-slate-400 mr-2">Active Filter</span>
              {selectedCategories.map(cat => (
                <button key={cat} onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-delta-primary transition-colors">
                  {cat} <X size={12} />
                </button>
              ))}
              {selectedBrands.map(brand => (
                <button key={brand} onClick={() => toggleFilter(selectedBrands, setSelectedBrands, brand)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-delta-primary transition-colors">
                  {brand} <X size={12} />
                </button>
              ))}
              {selectedPromotions.map(promo => (
                <button key={promo} onClick={() => toggleFilter(selectedPromotions, setSelectedPromotions, promo)} className="flex items-center gap-2 px-3 py-1.5 bg-green-700 text-white text-xs font-bold rounded-lg hover:bg-green-800 transition-colors">
                  {promo} <X size={12} />
                </button>
              ))}
              {priceRange < 5000 && (
                <button onClick={() => setPriceRange(5000)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-delta-primary transition-colors">
                  Price: ₹0 - ₹{priceRange} <X size={12} />
                </button>
              )}
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPromotions.length > 0 || priceRange < 5000) && (
                <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:underline ml-2">Clear All</button>
              )}
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {paginatedProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={product.id} 
                    className="group"
                  >
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#f3f4f6] mb-4 shadow-sm">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        referrerPolicy="no-referrer" 
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-delta-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-delta-primary/20">
                          {product.discount}
                        </span>
                      </div>
                      {/* Floating Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xl transition-colors">
                          <Heart size={18} />
                        </button>
                        <button 
                          onClick={() => setQuickViewProduct(product)}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-delta-primary shadow-xl transition-colors"
                        >
                          <Search size={18} />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-delta-primary shadow-xl transition-colors">
                          <Layers size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 px-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs font-black text-slate-900">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-delta-primary">₹{product.price.toLocaleString()}</span>
                        <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => onAddToCart({ name: product.name, price: product.price })}
                        className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl shadow-slate-900/10"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Search size={32} className="text-slate-200" />
                </div>
                <h3 className="font-bold text-slate-900">No products found</h3>
                <button onClick={clearAll} className="text-xs font-bold text-delta-primary hover:underline">Clear all filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-12">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-delta-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-delta-primary text-white shadow-lg shadow-delta-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-delta-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bulk Order Banner */}
      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="bg-delta-secondary rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Bulk Stationery Orders?</h2>
            <p className="text-white/80 text-lg">Special pricing for schools, offices, and large organizations. Get customized kits and wholesale rates.</p>
          </div>
          <button className="relative z-10 px-12 py-5 bg-delta-primary text-white font-black rounded-full hover:bg-delta-primary/90 transition-all uppercase tracking-widest text-xs shadow-2xl">
            Request Wholesale Quote
          </button>
        </div>
      </section>

      {/* Footer Features */}
      <section className="border-t border-slate-100 py-12 px-4 md:px-8 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <Package size={32} className="text-delta-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Free Shipping</h4>
              <p className="text-sm text-slate-400">Free shipping for order above ₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <CreditCard size={32} className="text-delta-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Flexible Payment</h4>
              <p className="text-sm text-slate-400">Multiple secure payment options</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <MessageCircle size={32} className="text-delta-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg">24x7 Support</h4>
              <p className="text-sm text-slate-400">We support online all days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-delta-primary transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-square bg-slate-50">
                <img 
                  src={quickViewProduct.img} 
                  alt={quickViewProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-8 md:p-12 space-y-8 flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-delta-primary">{quickViewProduct.brand}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(quickViewProduct.rating) ? "currentColor" : "none"} className={i < Math.floor(quickViewProduct.rating) ? "" : "text-slate-200"} />)}
                      <span className="text-sm font-black text-slate-900 ml-1">{quickViewProduct.rating}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{quickViewProduct.name}</h2>
                  <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">{quickViewProduct.category}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-black text-delta-primary">₹{quickViewProduct.price.toLocaleString()}</span>
                    <span className="text-xl text-slate-300 line-through font-bold">₹{quickViewProduct.originalPrice.toLocaleString()}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full uppercase tracking-widest">
                      {quickViewProduct.discount}
                    </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Experience the perfect blend of style and functionality with this premium {quickViewProduct.name.toLowerCase()}. Crafted for those who appreciate the finer details in their creative or professional work.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1">
                      <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-black w-12 text-center text-slate-900">1</span>
                      <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        onAddToCart({ name: quickViewProduct.name, price: quickViewProduct.price });
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-delta-primary transition-all shadow-xl shadow-slate-900/10"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                      <Heart size={14} /> Add to Wishlist
                    </button>
                    <button className="flex items-center gap-2 hover:text-delta-primary transition-colors">
                      <Layers size={14} /> Compare
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CoursesPage() {
  return (
    <div className="bg-warm-bg min-h-screen">
      <section className="bg-delta-secondary py-16 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif italic">Academic Courses</h1>
          <p className="text-white/70 max-w-xl mx-auto">Empowering students with quality education and professional skill development programs.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Computer Basics", icon: <Cpu />, color: "bg-slate-50 text-slate-600" },
            { title: "Graphic Design", icon: <PenTool />, color: "bg-slate-50 text-slate-600" },
            { title: "Tally & Accounting", icon: <BookOpen />, color: "bg-slate-50 text-slate-600" },
            { title: "Web Development", icon: <Cpu />, color: "bg-slate-50 text-slate-600" },
            { title: "Digital Marketing", icon: <Search />, color: "bg-slate-50 text-slate-600" },
            { title: "Soft Skills", icon: <User />, color: "bg-slate-50 text-slate-600" },
          ].map((course, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 soft-shadow hover-lift group">
              <div className={`w-14 h-14 ${course.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {React.cloneElement(course.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">Comprehensive curriculum designed by industry experts to help you master the subject from scratch.</p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3 Months</span>
                <button className="text-delta-primary font-black text-[10px] uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                  Enroll Now <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TechPage({ onAddToCart }: { onAddToCart: (p: any) => void }) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedBrand, setSelectedBrand] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = [
    { name: 'All', icon: <ShoppingBag size={14} /> },
    { name: 'Keyboards', icon: <Keyboard size={14} /> },
    { name: 'Headphones', icon: <Headphones size={14} /> },
    { name: 'Earphones', icon: <Headphones size={14} /> },
    { name: 'Ear buds', icon: <Headphones size={14} /> },
    { name: 'Wired earphones', icon: <Smartphone size={14} /> },
    { name: 'Mouse', icon: <Mouse size={14} /> },
    { name: 'Mouse pad', icon: <Square size={14} /> }
  ];

  const brands = ['All', 'Logitech', 'Razer', 'Corsair', 'Sony', 'Bose', 'Apple', 'Samsung', 'JBL', 'Boat', 'Zebronics', 'Sennheiser', 'SteelSeries'];

  const products = [
    { id: 1, name: "Logitech MX Master 3S", category: "Mouse", brand: "Logitech", price: 9999, rating: 5, img: "https://picsum.photos/seed/tech-1/400/400" },
    { id: 2, name: "Razer BlackWidow V4 Pro", category: "Keyboards", brand: "Razer", price: 15999, rating: 5, img: "https://picsum.photos/seed/tech-2/400/400" },
    { id: 3, name: "Sony WH-1000XM5", category: "Headphones", brand: "Sony", price: 29999, rating: 5, img: "https://picsum.photos/seed/tech-3/400/400" },
    { id: 4, name: "Apple AirPods Pro (2nd Gen)", category: "Ear buds", brand: "Apple", price: 24900, rating: 5, img: "https://picsum.photos/seed/tech-4/400/400" },
    { id: 5, name: "Bose QuietComfort Earbuds II", category: "Ear buds", brand: "Bose", price: 25900, rating: 5, img: "https://picsum.photos/seed/tech-5/400/400" },
    { id: 6, name: "Sennheiser IE 200", category: "Wired earphones", brand: "Sennheiser", price: 14999, rating: 4, img: "https://picsum.photos/seed/tech-6/400/400" },
    { id: 7, name: "SteelSeries QcK Heavy", category: "Mouse pad", brand: "SteelSeries", price: 1999, rating: 5, img: "https://picsum.photos/seed/tech-7/400/400" },
    { id: 8, name: "JBL Tune 760NC", category: "Headphones", brand: "JBL", price: 5999, rating: 4, img: "https://picsum.photos/seed/tech-8/400/400" },
    { id: 9, name: "Boat Rockerz 450", category: "Headphones", brand: "Boat", price: 1499, rating: 4, img: "https://picsum.photos/seed/tech-9/400/400" },
    { id: 10, name: "Zebronics Zeb-Transformer", category: "Keyboards", brand: "Zebronics", price: 1299, rating: 4, img: "https://picsum.photos/seed/tech-10/400/400" },
    { id: 11, name: "Logitech G Pro X Superlight", category: "Mouse", brand: "Logitech", price: 12999, rating: 5, img: "https://picsum.photos/seed/tech-11/400/400" },
    { id: 12, name: "Razer DeathAdder V3 Pro", category: "Mouse", brand: "Razer", price: 13999, rating: 5, img: "https://picsum.photos/seed/tech-12/400/400" },
    { id: 13, name: "Corsair K70 RGB TKL", category: "Keyboards", brand: "Corsair", price: 11999, rating: 5, img: "https://picsum.photos/seed/tech-13/400/400" },
    { id: 14, name: "Samsung Galaxy Buds2 Pro", category: "Ear buds", brand: "Samsung", price: 17999, rating: 5, img: "https://picsum.photos/seed/tech-14/400/400" },
    { id: 15, name: "Boat Bassheads 225", category: "Wired earphones", brand: "Boat", price: 599, rating: 4, img: "https://picsum.photos/seed/tech-15/400/400" },
    { id: 16, name: "Razer Gigantus V2", category: "Mouse pad", brand: "Razer", price: 1499, rating: 5, img: "https://picsum.photos/seed/tech-16/400/400" },
  ];

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const brandMatch = selectedBrand === 'All' || p.brand === selectedBrand;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && brandMatch && searchMatch;
  });

  return (
    <div className="bg-warm-bg min-h-screen">
      <section className="bg-delta-secondary py-16 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-delta-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic tracking-tighter">Tech Products</h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">Premium peripherals and audio gear for the modern setup.</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto py-12 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-8">
              {/* Search */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-delta-primary/20 outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat.name ? 'bg-delta-primary text-white shadow-lg shadow-delta-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {cat.icon}
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brands</h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button 
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${selectedBrand === brand ? 'bg-delta-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Showing {filteredProducts.length} Products</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort:</span>
                <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none text-delta-primary cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={product.id} 
                    className="bg-white rounded-3xl border border-slate-100 soft-shadow overflow-hidden group hover-lift"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-50">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest text-delta-primary shadow-sm">
                          {product.brand}
                        </span>
                      </div>
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category}</p>
                          <h3 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-1">{product.name}</h3>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < product.rating ? "currentColor" : "none"} className={i < product.rating ? "" : "text-slate-200"} />)}
                      </div>
                      <p className="text-xl font-black text-delta-primary">₹{product.price.toLocaleString()}</p>
                      <div className="pt-2">
                        <button 
                          onClick={() => onAddToCart({ name: product.name, price: product.price })}
                          className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-delta-primary transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                        >
                          <ShoppingCart size={14} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Search size={32} className="text-slate-200" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">No products found</h3>
                  <p className="text-sm text-slate-400">Try adjusting your filters or search query</p>
                </div>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setSearchQuery(''); }}
                  className="text-xs font-black uppercase tracking-widest text-delta-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tech Support Banner */}
        <div className="mt-24 bg-delta-primary rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Need Tech Support?</h2>
            <p className="text-white/80 text-lg">From hardware repairs to software installation, our experts are here to help you with all your tech needs.</p>
          </div>
          <button className="relative z-10 px-12 py-5 bg-white text-delta-primary font-black rounded-full hover:bg-slate-50 transition-all uppercase tracking-widest text-xs shadow-2xl">
            Book Repair Service
          </button>
        </div>
      </section>
    </div>
  );
}

function PrintingPage() {
  const services = [
    {
      title: "Paper Printing (A4/A3)",
      price: "From ₹2",
      desc: "High-quality laser printing on A4 and A3 paper. Available in both Black & White and vibrant Color options.",
      icon: <FileText />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Photocopy Service",
      price: "₹1 per page",
      desc: "Fast and clear photocopying for documents, study materials, and books. Bulk discounts available.",
      icon: <Layers />,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Photograph Printing",
      price: "From ₹10",
      desc: "Professional photo printing on high-gloss paper. Available in passport size, 4x6, 5x7, and custom sizes.",
      icon: <ImageIcon />,
      color: "bg-rose-50 text-rose-600"
    },
    {
      title: "Lamination Service",
      price: "From ₹15",
      desc: "Protect your important documents, certificates, and photos with our high-quality thermal lamination.",
      icon: <Shield />,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Aadhaar Card Print",
      price: "₹50",
      desc: "High-quality PVC Aadhaar card printing. Durable, waterproof, and fits perfectly in your wallet.",
      icon: <CreditCard />,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "PAN Card Print",
      price: "₹50",
      desc: "Get your PAN card printed on high-grade PVC material with clear details and long-lasting finish.",
      icon: <CreditCard />,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Gift Card Printing",
      price: "From ₹30",
      desc: "Customized gift cards for birthdays, anniversaries, or corporate gifting. High-quality finish.",
      icon: <Gift />,
      color: "bg-pink-50 text-pink-600"
    },
    {
      title: "Voter ID & Other Cards",
      price: "₹50",
      desc: "PVC printing for Voter IDs, Health Cards, and any other government or private identification cards.",
      icon: <CreditCard />,
      color: "bg-slate-50 text-slate-600"
    }
  ];

  return (
    <div className="bg-warm-bg min-h-screen">
      <section className="bg-delta-secondary py-20 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-delta-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-delta-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic tracking-tighter">Printing Solutions</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">From everyday document printing to specialized PVC card services, we provide professional quality with quick turnaround.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-delta-primary leading-tight">{service.title}</h3>
                  </div>
                  <p className="text-sm text-delta-secondary/70 leading-relaxed line-clamp-3">{service.desc}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-center">
                <span className="text-lg font-black text-delta-primary">{service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bulk Order Banner */}
        <div className="mt-24 bg-delta-primary rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Need Bulk Printing?</h2>
            <p className="text-white/80 text-lg">We offer special rates for schools, offices, and large events. Contact us for a custom quote on bulk orders.</p>
          </div>
          <button className="relative z-10 px-12 py-5 bg-white text-delta-primary font-black rounded-full hover:bg-slate-50 transition-all uppercase tracking-widest text-xs shadow-2xl">
            Get Custom Quote
          </button>
        </div>
      </section>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="bg-warm-bg min-h-screen">
      <section className="bg-delta-secondary py-16 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-delta-primary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif italic">Our Services</h1>
          <p className="text-white/70 max-w-xl mx-auto">From high-quality printing to expert tech support, we've got you covered.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-4 md:px-8 space-y-24">
        {[
          { title: "Bulk Printing & Photocopy", desc: "High-speed laser printing and high-quality color photocopying for all your academic and business needs.", icon: <Printer /> },
          { title: "Tech Support & Repair", desc: "Expert computer repair, software installation, and hardware upgrades by certified technicians.", icon: <Settings /> },
          { title: "Gift Customization", desc: "Personalized gifts, mug printing, and custom stationery for special occasions and corporate branding.", icon: <Gift /> },
        ].map((service, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-delta-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-delta-primary/20">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
              <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">{service.title}</h2>
              <p className="text-delta-secondary text-lg leading-relaxed">{service.desc}</p>
              <button className="px-10 py-4 bg-delta-primary text-white font-black rounded-full hover:bg-delta-primary/90 transition-all uppercase tracking-widest text-[10px]">
                Inquire Now
              </button>
            </div>
            <div className="flex-1 w-full aspect-video bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 flex items-center justify-center group">
              <Package size={64} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-delta-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">Δ</div>
            <span className="font-bold text-xl tracking-tight">DELTA</span>
          </div>
          <p className="text-slate-400 leading-relaxed">Leading the way in quality education and premium stationery supplies since 2010.</p>
          <div className="flex gap-4">
            {['fb', 'tw', 'ig', 'li'].map(social => (
              <div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-delta-primary transition-colors cursor-pointer">
                <span className="text-xs font-bold uppercase">{social}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-delta-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Our Faculty</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Shop Stationery</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Library Membership</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Support</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-delta-primary transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-slate-400 mb-4 text-sm">Get updates on new batches and stationery arrivals.</p>
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-delta-primary transition-colors" />
            <button className="bg-delta-primary text-white py-3 rounded-xl font-bold hover:bg-delta-primary/90 transition-all">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        <p>© 2026 DELTA Institute & Stationery. All rights reserved.</p>
        <p>Clean Modern Design</p>
      </div>
    </footer>
  );
}

// --- CART DRAWER COMPONENT ---
function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQty, onViewCart }: { 
  isOpen: boolean, 
  onClose: () => void,
  items: any[],
  onRemove: (id: number) => void,
  onUpdateQty: (id: number, delta: number) => void,
  onViewCart: () => void
}) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 z-[100]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white/70 backdrop-blur-2xl border-l border-white/40 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-slate-500 hover:text-delta-primary hover:bg-delta-primary/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl bg-white/50 overflow-hidden flex-shrink-0 border border-white/50 shadow-sm">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-delta-primary transition-colors">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-delta-primary">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center bg-white/50 rounded-lg border border-white/50">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-8 text-center">{item.qty}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center text-slate-300">
                    <ShoppingCart size={40} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">Your cart is empty</p>
                    <p className="text-sm text-slate-500">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-6 py-3 bg-delta-primary text-white rounded-xl font-bold text-sm hover:bg-delta-primary/90 transition-all shadow-lg shadow-delta-primary/20"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Section */}
            {items.length > 0 && (
              <div className="p-6 bg-white/30 backdrop-blur-md border-t border-white/20 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>GST (18%)</span>
                    <span className="font-bold text-slate-900">₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-black/10">
                    <span>Total</span>
                    <span className="text-delta-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-2 space-y-3">
                  <button 
                    onClick={onViewCart}
                    className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    View Cart
                  </button>
                  <button className="w-full py-4 bg-delta-secondary text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2 group">
                    Payment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
