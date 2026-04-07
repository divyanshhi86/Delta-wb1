/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Upload,
  Check,
  Sparkles,
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
  Monitor,
  Pen,
  FileEdit,
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
  Copy,
  MessageCircle,
  Megaphone,
  Shield,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShoppingBag,
  Share2,
  PackageOpen,
  ThumbsUp,
  Zap,
  LayoutGrid,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Layers,
  GraduationCap,
  Keyboard,
  Headphones,
  Smartphone,
  Speaker,
  Square,
  Briefcase,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AVATARS = [
  "https://picsum.photos/seed/skull/200",
  "https://picsum.photos/seed/croc/200",
  "https://picsum.photos/seed/ant/200",
  "https://picsum.photos/seed/ghost/200",
  "https://picsum.photos/seed/bunny/200",
  "https://picsum.photos/seed/bear/200",
  "https://picsum.photos/seed/flower/200",
  "https://picsum.photos/seed/monkey/200",
  "https://picsum.photos/seed/frog/200",
  "https://picsum.photos/seed/octopus/200",
  "https://picsum.photos/seed/mickey/200",
  "https://picsum.photos/seed/wolf/200",
  "https://picsum.photos/seed/rabbit/200",
  "https://picsum.photos/seed/bird/200",
  "https://picsum.photos/seed/cat/200",
  "https://picsum.photos/seed/bug/200"
];

const Avatar = ({ index, size = 32, className = "" }: { index: number, size?: number, className?: string }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div 
      className={`rounded-full overflow-hidden bg-slate-200 border border-black/10 flex items-center justify-center relative ${className}`}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      {!hasError ? (
        <img 
          src={AVATARS[index % AVATARS.length]} 
          alt="Avatar" 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        <User size={size * 0.6} className="text-slate-400" />
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = React.useState<'home' | 'shop' | 'courses' | 'services' | 'cart' | 'printing' | 'tech' | 'gifts' | 'liked' | 'dashboard' | 'profile' | 'contact' | 'coming-soon'>('home');
  const [lang, setLang] = React.useState<'ENG' | 'HIN'>('ENG');
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  
  const [user, setUser] = React.useState({
    name: "Dyvanshhi SN",
    email: "dyvanshhi.sn@gmail.com",
    phone: "+91 98765 43210",
    address: {
      houseNo: "123",
      street: "Delta Street",
      locality: "Stationery Hub",
      city: "New Delhi",
      state: "Delhi"
    },
    avatarIndex: 0
  });
  
  // UI-only cart state for demonstration purposes
  const [cartItems, setCartItems] = React.useState([
    { id: 1, name: "Premium Fountain Pen", price: 1299, qty: 1, img: "https://picsum.photos/seed/cart-0/100/100" },
    { id: 2, name: "Leather Bound Journal", price: 850, qty: 2, img: "https://picsum.photos/seed/cart-1/100/100" },
    { id: 3, name: "Artist Sketch Set", price: 2100, qty: 1, img: "https://picsum.photos/seed/delta-art-1/100/100" },
    { id: 4, name: "Mechanical Pencil Set", price: 450, qty: 3, img: "https://picsum.photos/seed/delta-pencil-1/100/100" }
  ]);

  const [likedItems, setLikedItems] = React.useState<any[]>([]);

  const addToCart = (product: any) => {
    // Simple UI-only logic to add item or increment quantity
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: Date.now(), ...product, qty: 1, img: product.img || `https://picsum.photos/seed/cart-${prev.length}/100/100` }];
    });
    setIsCartOpen(true);
  };

  const toggleLike = (product: any) => {
    setLikedItems(prev => {
      const isLiked = prev.find(item => item.id === product.id);
      if (isLiked) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
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
      <Sidebar setView={setView} lang={lang} setLang={setLang} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentView={view} 
          setView={setView} 
          lang={lang} 
          setLang={setLang} 
          onCartClick={() => setView('cart')} 
          cartCount={cartCount}
          likedCount={likedItems.length}
          user={user}
          Avatar={Avatar}
        />
        
        <CategoriesDrawer 
          isOpen={isCategoriesOpen} 
          onClose={() => setIsCategoriesOpen(false)} 
          setView={setView} 
          lang={lang}
          setLang={setLang}
        />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems} 
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onViewCart={() => { setView('cart'); setIsCartOpen(false); }}
          likedItems={likedItems}
          onToggleLike={toggleLike}
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
          {view === 'home' && <HomePage setView={setView} onAddToCart={addToCart} isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} />}
          {view === 'shop' && <ShopPage onAddToCart={addToCart} likedItems={likedItems} onToggleLike={toggleLike} />}
          {view === 'courses' && <CoursesPage />}
          {view === 'services' && <ServicesPage />}
          {view === 'contact' && <ContactPage />}
          {view === 'printing' && <PrintingPage />}
          {view === 'tech' && <TechPage onAddToCart={addToCart} likedItems={likedItems} onToggleLike={toggleLike} />}
          {view === 'gifts' && <GiftsPage onAddToCart={addToCart} likedItems={likedItems} onToggleLike={toggleLike} />}
          {view === 'cart' && <CartPage items={cartItems} onRemove={removeFromCart} onUpdateQty={updateQty} setView={setView} likedItems={likedItems} onAddToCart={addToCart} onToggleLike={toggleLike} />}
          {view === 'liked' && <LikedPage items={likedItems} onAddToCart={addToCart} onToggleLike={toggleLike} />}
          {view === 'dashboard' && <DashboardPage user={user} setView={setView} Avatar={Avatar} />}
          {view === 'profile' && <ProfilePage user={user} setUser={setUser} setView={setView} Avatar={Avatar} />}
          {view === 'coming-soon' && <ComingSoonPage />}
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

function Sidebar({ setView, lang, setLang }: { 
  setView: (v: any) => void,
  lang: 'ENG' | 'HIN',
  setLang: (l: 'ENG' | 'HIN') => void
}) {
  const [activeCategory, setActiveCategory] = React.useState('All Products');

  const categories = [
    { 
      name: 'All Products', 
      icon: <ShoppingBag size={22} />, 
      sub: [
        { name: 'Stationery', view: 'shop', icon: <Pencil size={18} /> },
        { name: 'Printing', view: 'printing', icon: <Printer size={18} /> },
        { name: 'Gifts', view: 'gifts', icon: <Gift size={18} /> },
        { name: 'Tech Products', view: 'tech', icon: <Mouse size={18} /> }
      ] 
    },
    { 
      name: 'Education', 
      icon: <BookOpen size={22} />, 
      sub: [
        { name: 'Courses', view: 'courses', icon: <GraduationCap size={18} /> },
        { name: 'Blogs', view: 'coming-soon', icon: <FileText size={18} /> }
      ] 
    },
    { 
      name: 'Coming Soon', 
      icon: <ShoppingBag size={22} />, 
      view: 'coming-soon'
    },
    { 
      name: 'Services', 
      icon: <Settings size={22} />,
      view: 'services'
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] border-r border-black/5 bg-white h-screen sticky top-0 z-50 p-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 cursor-pointer mb-12" onClick={() => setView('home')}>
        <div className="w-10 h-10 bg-delta-primary rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src="https://picsum.photos/seed/delta-logo-cat/200/200" 
            alt="Delta Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
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
                    const view = (cat as any).view;
                    if (view) {
                      setView(view);
                      setActiveCategory(cat.name);
                    } else {
                      setActiveCategory(activeCategory === cat.name ? '' : cat.name);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${activeCategory === cat.name ? 'bg-slate-50 text-delta-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-delta-primary'}`}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon}
                    <span className="text-base font-bold">{cat.name}</span>
                  </div>
                  {cat.sub && <ChevronDown size={18} className={activeCategory === cat.name ? '' : '-rotate-90'} />}
                </button>
                {activeCategory === cat.name && cat.sub && (
                  <div className="ml-6 space-y-1 py-2">
                    {cat.sub.map((s, j) => (
                      <button 
                        key={j} 
                        onClick={() => setView(s.view)}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-left group hover:bg-slate-50 transition-all"
                      >
                        <div className="text-slate-900 group-hover:text-delta-primary transition-colors">
                          {s.icon}
                        </div>
                        <span className={`text-sm font-bold group-hover:text-delta-primary transition-colors ${(s as any).isComingSoon ? 'text-slate-300 italic' : 'text-slate-900'}`}>
                          {s.name}
                          {(s as any).isComingSoon && <span className="ml-2 text-[8px] bg-slate-100 px-1.5 py-0.5 rounded-full uppercase tracking-widest font-black">Soon</span>}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-black/5">
        <div className="flex items-center gap-6 px-4 mb-4">
          <a href="#" className="text-black hover:text-delta-primary transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-black hover:text-delta-primary transition-all">
            <MessageCircle size={20} />
          </a>
          <a href="#" className="text-black hover:text-delta-primary transition-all">
            <Youtube size={20} />
          </a>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 px-4">Delta Institute © 2026</p>
      </div>
    </aside>
  );
}

function ComingSoonPage() {
  const blogs = [
    { 
      title: "Viverra Tellus Habitasse Platea Dictumst Vestibulum", 
      date: "DECEMBER 21, 2023", 
      img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop" 
    },
    { 
      title: "Rutrum Quisque Non Tellus Orciac Auctor Pellentesque", 
      date: "DECEMBER 21, 2023", 
      img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Pellentesque Massa Placerat Duis Ultricies Lacus", 
      date: "DECEMBER 21, 2023", 
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
    },
    { 
      title: "Lorem Ipsum Dolor Sitamet Consectetur Adipiscing", 
      date: "DECEMBER 21, 2023", 
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content - Job Card (Vertical/Long Square) */}
        <div className="lg:col-span-8 flex flex-col justify-start pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-lg shadow-black/5 flex flex-col items-center text-center space-y-6 relative overflow-hidden group max-w-[283px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-delta-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-16 h-16 bg-delta-primary/10 rounded-2xl flex items-center justify-center text-delta-primary relative z-10">
              <Briefcase size={32} strokeWidth={1.5} />
            </div>

            <div className="space-y-3 relative z-10">
              <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                Job <br /> Application
              </h2>
              <div className="inline-block px-3 py-1 bg-delta-primary/10 text-delta-primary rounded-full text-[9px] font-black uppercase tracking-widest">
                Soon
              </div>
              <p className="text-slate-500 text-[11px] font-bold leading-relaxed">
                Stay tuned for exciting opportunities in retail, education, and tech services.
              </p>
            </div>

            <button className="relative z-10 w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary transition-all duration-300">
              Apply
            </button>
          </motion.div>
        </div>

        {/* Sidebar - Blogs (No Internal Scroll) */}
        <div className="lg:col-span-4">
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Blogs</h3>
            
            <div className="space-y-8">
              {blogs.map((blog, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4 group cursor-pointer"
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm">
                    <img 
                      src={blog.img} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-delta-primary transition-colors leading-tight">
                      {blog.title}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {blog.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-black/5">
              <button className="text-[11px] font-black text-delta-primary uppercase tracking-[0.3em] hover:text-slate-900 transition-colors flex items-center gap-2 group">
                View All Posts <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ currentView, setView, lang, setLang, onCartClick, cartCount, likedCount, user, Avatar }: { 
  currentView: string, 
  setView: (v: 'home' | 'shop' | 'courses' | 'services' | 'cart' | 'printing' | 'tech' | 'gifts' | 'liked' | 'dashboard' | 'profile' | 'contact' | 'coming-soon') => void,
  lang: 'ENG' | 'HIN',
  setLang: (l: 'ENG' | 'HIN') => void,
  onCartClick: () => void,
  cartCount: number,
  likedCount: number,
  user: any,
  Avatar: any
}) {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[280px] z-50 glass-header px-4 md:px-8 py-4 flex items-center justify-between border-b border-black/5">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:block w-48 lg:w-72">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-delta-primary/20 transition-all">
            <Search size={14} className="text-slate-400" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-xs w-full" />
          </div>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-8 font-bold text-base uppercase tracking-widest text-slate-600 absolute left-1/2 -translate-x-1/2">
        <button onClick={() => setView('home')} className={`${currentView === 'home' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Home</button>
        <button onClick={() => setView('shop')} className={`${currentView === 'shop' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Shop</button>
        <button onClick={() => setView('courses')} className={`${currentView === 'courses' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Courses</button>
        <button onClick={() => setView('services')} className={`${currentView === 'services' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Services</button>
        <button onClick={() => setView('contact')} className={`${currentView === 'contact' ? 'text-delta-primary border-b-2 border-delta-primary pb-1' : 'hover:text-delta-primary'} transition-colors`}>Contact</button>
      </nav>

      <div className="flex items-center gap-3 md:gap-6 text-slate-600">
        <div className="flex items-center gap-3 text-sm font-black text-slate-500 mr-2">
          <button 
            onClick={() => setLang('ENG')}
            className={`${lang === 'ENG' ? 'text-black' : 'text-gray-400 hover:text-black'} transition-colors`}
          >
            ENG
          </button>
          <span className="text-gray-300">/</span>
          <button 
            onClick={() => setLang('HIN')}
            className={`${lang === 'HIN' ? 'text-black font-hindi' : 'text-gray-400 hover:text-black font-hindi'} transition-colors`}
          >
            हिन्दी
          </button>
        </div>

        <div 
          className="relative cursor-pointer hover:text-delta-primary transition-colors"
          onClick={() => setView('liked')}
        >
          <Heart size={20} className={currentView === 'liked' ? 'text-delta-primary fill-delta-primary' : ''} />
          {likedCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {likedCount}
            </span>
          )}
        </div>
        <div 
          className="relative cursor-pointer hover:text-delta-primary transition-colors"
          onClick={onCartClick}
        >
          <ShoppingCart size={20} className={currentView === 'cart' ? 'text-delta-primary fill-delta-primary' : ''} />
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
            <Avatar index={user.avatarIndex} size={32} />
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
                  <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => { setView('dashboard'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-delta-primary/10 hover:text-delta-primary transition-all flex items-center gap-2"
                  >
                    <Settings size={14} /> Dashboard
                  </button>
                  <button 
                    onClick={() => { setView('profile'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-delta-primary/10 hover:text-delta-primary transition-all flex items-center gap-2"
                  >
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

function CartPage({ items, onRemove, onUpdateQty, setView, likedItems, onAddToCart, onToggleLike }: { 
  items: any[], 
  onRemove: (id: number) => void, 
  onUpdateQty: (id: number, delta: number) => void, 
  setView: (v: any) => void, 
  likedItems: any[], 
  onAddToCart: (p: any) => void,
  onToggleLike: (p: any) => void
}) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

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
            <button 
              onClick={() => setView('liked')}
              className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all"
            >
              <Heart size={16} /> SAVED ITEMS
            </button>
            <button className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all">
              <Clock size={16} /> ORDER HISTORY
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Side - Main Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-6 group hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 relative group/img">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 right-2 translate-x-10 group-hover/img:translate-x-0 transition-transform duration-300">
                      <button 
                        onClick={() => onToggleLike(item)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm bg-white ${
                          likedItems.find(l => l.id === item.id) 
                            ? 'text-red-500' 
                            : 'text-slate-400 hover:text-red-500'
                        }`}
                      >
                        <Heart size={14} fill={likedItems.find(l => l.id === item.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-delta-primary transition-colors">{item.name}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PREMIUM SERIES / LIMITED EDITION</p>
                        </div>
                        <p className="text-lg font-black text-slate-900">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-100 p-0.5">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black w-8 text-center text-slate-900">{item.qty}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 px-3 py-1.5 rounded-full transition-all"
                      >
                        <Trash2 size={12} /> REMOVE
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
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">SAVED ITEMS ({likedItems.length})</h3>
              <div className="space-y-6">
                {likedItems.length > 0 ? (
                  likedItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-20 h-20 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="text-[11px] font-black text-slate-900 leading-tight tracking-wide uppercase">{item.name}</h4>
                        <button 
                          onClick={() => onAddToCart({ name: item.name, price: item.price, img: item.img })}
                          className="text-[10px] font-black text-delta-primary uppercase tracking-widest hover:underline"
                        >
                          MOVE TO CART
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-bold">No saved items yet.</p>
                )}
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setView('liked')}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-delta-primary transition-colors"
                >
                  VIEW ALL SAVED <ChevronRight size={14} />
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

function HomePage({ setView, onAddToCart, isCategoriesOpen, setIsCategoriesOpen }: { 
  setView: (v: 'home' | 'shop' | 'courses' | 'services' | 'cart' | 'printing' | 'contact' | 'coming-soon') => void,
  onAddToCart: (p: any) => void,
  isCategoriesOpen: boolean,
  setIsCategoriesOpen: (v: boolean) => void
}) {
  const [activeBanner, setActiveBanner] = React.useState(0);

  const banners = [
    {
      title: <>Learning <br />& Store</>,
      subtitle: "Expert computer services, quality stationery, and professional institute courses all under one roof.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
      primaryButton: "Explore Courses",
      secondaryButton: "Shop Now",
      primaryAction: () => setView('courses'),
      secondaryAction: () => setView('shop')
    },
    {
      title: <>Tech <br />& Support</>,
      subtitle: "Expert computer repair, hardware upgrades, and software solutions to keep your business running smoothly.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop",
      primaryButton: "Our Services",
      secondaryButton: "Book Repair",
      primaryAction: () => setView('services'),
      secondaryAction: () => setView('services')
    }
  ];

  const nextBanner = () => setActiveBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setActiveBanner((prev) => (prev - 1 + banners.length) % banners.length);

  React.useEffect(() => {
    const timer = setInterval(nextBanner, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative px-4 md:px-8 pt-4">
        {/* Categories Drawer Trigger - Fixed to the left edge */}
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCategoriesOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 w-14 h-16 bg-white/80 backdrop-blur-md border-r border-y border-white/50 rounded-r-2xl shadow-[10px_0_30px_-10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center group transition-all duration-300"
        >
          <div className="relative">
            <LayoutGrid size={24} className="text-delta-primary group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-slate-400 group-hover:text-delta-primary transition-colors">Menu</span>
        </motion.button>

        <div className="relative min-h-[70vh] flex items-center px-8 md:px-16 overflow-hidden rounded-[3rem] border border-black/5 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeBanner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={banners[activeBanner].image} 
                alt="Banner Background" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeBanner}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-8xl font-bold text-delta-primary tracking-tighter leading-[0.9]">
                    {banners[activeBanner].title}
                  </h1>
                  <p className="text-lg text-delta-secondary max-w-lg leading-relaxed font-medium">
                    {banners[activeBanner].subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={banners[activeBanner].primaryAction} className="px-10 py-4 bg-white text-delta-primary border-2 border-delta-primary rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary hover:text-white transition-all">
                    {banners[activeBanner].primaryButton}
                  </button>
                  <button onClick={banners[activeBanner].secondaryAction} className="px-10 py-4 bg-delta-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary/90 transition-all shadow-xl shadow-delta-primary/20">
                    {banners[activeBanner].secondaryButton}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicator */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prevBanner} className="text-slate-300 hover:text-slate-900 transition-colors">
            <ChevronLeft size={12} strokeWidth={4} />
          </button>
          <div className="flex items-center gap-1.5">
            {banners.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setActiveBanner(i)}
                className={`h-1 rounded-full transition-all cursor-pointer ${activeBanner === i ? 'w-4 bg-slate-900' : 'w-1 bg-slate-200'}`} 
              />
            ))}
          </div>
          <button onClick={nextBanner} className="text-slate-300 hover:text-slate-900 transition-colors">
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
      <div className="px-4 md:px-8 max-w-7xl mx-auto -mt-6 relative z-20">
        <div className="bg-white/80 backdrop-blur-md py-4 px-6 rounded-2xl border border-black/5 shadow-lg flex flex-col sm:flex-row items-center gap-4 mb-12 group">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-black flex-shrink-0">
              <Megaphone size={20} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-delta-primary uppercase tracking-widest">Important Notices</span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              </div>
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Live form open till Oct 31st. Visit our service desk for assisted filling.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">Core Services</h2>
          <button onClick={() => setView('services')} className="text-[10px] font-black uppercase tracking-widest text-delta-secondary flex items-center gap-2 hover:text-delta-primary transition-colors">VIEW ALL <ChevronRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: <Copy size={24} />, title: "PHOTOCOPY", desc: "B&W and Color duplication", view: 'printing' },
            { icon: <Printer size={24} />, title: "PRINTING", desc: "High-speed industrial quality", view: 'printing' },
            { icon: <FileEdit size={24} />, title: "FORM FILLING", desc: "Assisted government portals", view: 'services' },
            { icon: <Monitor size={24} />, title: "COMPUTER SERVICES", desc: "Software & hardware repair", view: 'services' },
            { icon: <Pen size={24} />, title: "STATIONERY", desc: "Premium office supplies", view: 'shop' },
            { icon: <Gift size={24} />, title: "GIFTS", desc: "Custom corporate branding", view: 'shop' }
          ].map((service, idx) => (
            <div key={idx} onClick={() => setView(service.view as any)} className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6 group cursor-pointer hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className={`w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-delta-primary group-hover:text-white transition-all`}>
                {service.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-delta-primary">{service.title}</h3>
                <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">Top Picks</h2>
          <button onClick={() => setView('shop')} className="text-[10px] font-black uppercase tracking-widest text-delta-secondary flex items-center gap-2 hover:text-delta-primary transition-colors">VIEW ALL <ChevronRight size={14} /></button>
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
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Cinematic Video Card */}
            <div className="relative group cursor-pointer rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5">
              <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Featured Video</p>
                    <h4 className="text-xl font-bold text-white">Inside Delta Workspace</h4>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                    02:45
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

          {/* Right Column */}
          <div className="space-y-8">
            {/* Ratings Card */}
            <div className="bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden relative">
              <div className="p-10 space-y-8">
                {/* Title & Rating Summary */}
                <div className="flex items-start justify-between">
                  <h3 className="text-4xl font-bold text-slate-800 tracking-tight">Ratings</h3>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                      ))}
                      <span className="text-2xl font-bold text-slate-800 ml-2">4.8</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400">44% Reviews</p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 text-slate-400 text-sm font-medium border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={16} className="text-delta-primary" />
                    <span>Good</span>
                  </div>
                  <div className="w-px h-4 bg-slate-200" />
                  <span>240 verified</span>
                </div>

                {/* Reviews */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { name: "Anuj P.", date: "1 week ago", text: "Great service and friendly staff!", avatar: "https://i.pravatar.cc/150?u=anuj" },
                    { name: "Neha R.", date: "3 days ago", text: "High-quality products and fast delivery!", avatar: "https://i.pravatar.cc/150?u=neha" },
                    { name: "Vikram S.", date: "2 weeks ago", text: "The stationery collection is top-notch. Highly recommended!", avatar: "https://i.pravatar.cc/150?u=vikram" },
                    { name: "Priya M.", date: "5 days ago", text: "Best place for all my office needs. Very reliable.", avatar: "https://i.pravatar.cc/150?u=priya" },
                    { name: "Rahul K.", date: "1 month ago", text: "Excellent customer support and genuine products.", avatar: "https://i.pravatar.cc/150?u=rahul" }
                  ].map((review, i) => (
                    <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src={review.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
                            <p className="text-[10px] text-slate-300 font-medium">Verified Customer</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{review.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <button className="w-full text-sm font-bold text-slate-400 flex items-center justify-center gap-2 hover:text-delta-primary transition-colors">
                  View All <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Coming Soon Banner */}
            <div 
              onClick={() => setView('coming-soon')}
              className="bg-black rounded-[2.5rem] p-10 flex items-center gap-8 text-white relative overflow-hidden group cursor-pointer"
            >
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10">
                <ShoppingBag size={40} />
              </div>
              <div className="space-y-3 relative z-10">
                <div className="inline-block px-2 py-1 bg-white text-black text-[8px] font-black uppercase tracking-widest rounded">New Drop</div>
                <h3 className="text-3xl font-bold tracking-tighter">COMING SOON</h3>
                <p className="text-xs text-white/50 font-medium leading-relaxed max-w-[280px]">
                  The Delta Limited Edition collection. Exclusive workspace tools designed for peak efficiency.
                </p>
              </div>
              <ShoppingBag size={180} className="absolute -right-12 -bottom-12 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </section>
    </>
  );
}

function ShopPage({ onAddToCart, likedItems, onToggleLike }: { 
  onAddToCart: (p: any) => void,
  likedItems: any[],
  onToggleLike: (p: any) => void
}) {
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
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-10 min-w-[288px]">
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
                        <button 
                          onClick={() => onToggleLike(product)}
                          className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transition-colors ${likedItems.find(item => item.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                        >
                          <Heart size={18} fill={likedItems.find(item => item.id === product.id) ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={() => setQuickViewProduct(product)}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-delta-primary shadow-xl transition-colors"
                        >
                          <Search size={18} />
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

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tighter">New Arrivals</h2>
            <div className="h-1 w-12 bg-delta-primary rounded-full" />
          </div>
          <button 
            onClick={() => { setSelectedPromotions(['New Arrivals']); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
            className="text-[10px] font-black text-delta-primary uppercase tracking-[0.2em] hover:underline"
          >
            Explore All
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-10">
          {products.slice(-5).map((product) => (
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
                {/* New Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    New
                  </span>
                </div>
                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                  <button 
                    onClick={() => onToggleLike(product)}
                    className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transition-colors ${likedItems.find(item => item.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                  >
                    <Heart size={18} fill={likedItems.find(item => item.id === product.id) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => setQuickViewProduct(product)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-delta-primary shadow-xl transition-colors"
                  >
                    <Search size={18} />
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
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                  )}
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

function TechPage({ onAddToCart, likedItems, onToggleLike }: { 
  onAddToCart: (p: any) => void,
  likedItems: any[],
  onToggleLike: (p: any) => void
}) {
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
                      <button 
                        onClick={() => onToggleLike(product)}
                        className={`absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition-colors ${likedItems.find(item => item.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart size={18} fill={likedItems.find(item => item.id === product.id) ? "currentColor" : "none"} />
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

function GiftsPage({ onAddToCart, likedItems, onToggleLike }: { 
  onAddToCart: (p: any) => void,
  likedItems: any[],
  onToggleLike: (p: any) => void
}) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedGender, setSelectedGender] = React.useState('All');
  const [selectedRecipient, setSelectedRecipient] = React.useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [personalizingProduct, setPersonalizingProduct] = React.useState<any>(null);

  const categories = ['All', 'Normal Gifts', 'Stationery Gifts'];
  const genders = ['All', 'Male', 'Female', 'Unisex'];
  const recipients = ['All', 'Teacher', 'Senior', 'Friend', 'Family', 'Partner'];
  const ageGroups = [
    { label: 'All', range: '' },
    { label: 'Kids', range: '(0-12)' },
    { label: 'Teens', range: '(13-19)' },
    { label: 'Adults', range: '(20-50)' },
    { label: 'Seniors', range: '(50+)' }
  ];

  const products = [
    { id: 1, name: "Customized Photo Mug", category: "Normal Gifts", gender: "Unisex", recipient: "Friend", ageGroup: "Adults", price: 499, rating: 4.8, img: "https://picsum.photos/seed/gift-1/600/800", desc: "A classic ceramic mug personalized with your favorite memories." },
    { id: 2, name: "Premium Leather Wallet", category: "Normal Gifts", gender: "Male", recipient: "Senior", ageGroup: "Seniors", price: 1899, rating: 4.9, img: "https://picsum.photos/seed/gift-2/600/800", desc: "Handcrafted genuine leather wallet with RFID protection." },
    { id: 3, name: "Personalized Desk Organizer", category: "Stationery Gifts", gender: "Unisex", recipient: "Teacher", ageGroup: "Adults", price: 1200, rating: 4.7, img: "https://picsum.photos/seed/gift-3/600/800", desc: "Keep your workspace tidy with this custom engraved wooden organizer." },
    { id: 4, name: "Elegant Silk Scarf", category: "Normal Gifts", gender: "Female", recipient: "Family", ageGroup: "Adults", price: 950, rating: 4.6, img: "https://picsum.photos/seed/gift-4/600/800", desc: "Soft, luxurious silk scarf with intricate floral patterns." },
    { id: 5, name: "Engraved Fountain Pen Set", category: "Stationery Gifts", gender: "Unisex", recipient: "Senior", ageGroup: "Seniors", price: 2500, rating: 5.0, img: "https://picsum.photos/seed/gift-5/600/800", desc: "A timeless writing instrument set for the distinguished professional." },
    { id: 6, name: "Handmade Scented Candles", category: "Normal Gifts", gender: "Female", recipient: "Friend", ageGroup: "Teens", price: 650, rating: 4.5, img: "https://picsum.photos/seed/gift-6/600/800", desc: "Soy-based candles with calming lavender and vanilla scents." },
    { id: 7, name: "Custom Name Diary", category: "Stationery Gifts", gender: "Unisex", recipient: "Teacher", ageGroup: "Teens", price: 450, rating: 4.8, img: "https://picsum.photos/seed/gift-7/600/800", desc: "A high-quality notebook with your name embossed on the cover." },
    { id: 8, name: "Digital Photo Frame", category: "Normal Gifts", gender: "Unisex", recipient: "Family", ageGroup: "Seniors", price: 4500, rating: 4.9, img: "https://picsum.photos/seed/gift-8/600/800", desc: "Display thousands of photos in a beautiful high-resolution frame." },
    { id: 9, name: "Artistic Table Clock", category: "Normal Gifts", gender: "Unisex", recipient: "Senior", ageGroup: "Seniors", price: 1500, rating: 4.7, img: "https://picsum.photos/seed/gift-9/600/800", desc: "A unique, modern clock design that doubles as a piece of art." },
    { id: 10, name: "Luxury Stationery Box", category: "Stationery Gifts", gender: "Unisex", recipient: "Teacher", ageGroup: "Adults", price: 3200, rating: 5.0, img: "https://picsum.photos/seed/gift-10/600/800", desc: "The ultimate collection for stationery lovers, presented in a premium box." },
  ];

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const genderMatch = selectedGender === 'All' || p.gender === selectedGender;
    const recipientMatch = selectedRecipient === 'All' || p.recipient === selectedRecipient;
    const ageMatch = selectedAgeGroup === 'All' || p.ageGroup === selectedAgeGroup;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && genderMatch && recipientMatch && ageMatch && searchMatch;
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-slate-900 overflow-x-hidden">
      {/* Unique Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/gift-hero/1920/1080?blur=5" 
            className="w-full h-full object-cover opacity-20" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F6]/50 to-[#FAF9F6]" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 bg-delta-primary/10 text-delta-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
              The Art of Gifting
            </span>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-slate-900 leading-none">
              Curated <span className="text-delta-primary">&</span> Personalized
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Discover a world where every gift tells a story. Handpicked, customized, and wrapped with love.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-delta-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-white border border-slate-100 rounded-full text-sm shadow-2xl shadow-slate-200/50 focus:ring-4 focus:ring-delta-primary/5 outline-none transition-all"
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 hidden xl:block"
        >
          <div className="w-24 h-24 bg-rose-100 rounded-[2rem] rotate-12 flex items-center justify-center text-rose-400 shadow-xl">
            <Gift size={40} />
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 hidden xl:block"
        >
          <div className="w-32 h-32 bg-amber-50 rounded-[3rem] -rotate-12 flex items-center justify-center text-amber-400 shadow-xl">
            <Sparkles size={48} />
          </div>
        </motion.div>
      </section>

      {/* Boutique Filter Bar */}
      <section className="sticky top-16 z-40 bg-[#FAF9F6]/80 backdrop-blur-xl border-y border-slate-100 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-6">
            {/* Gift Type Toggle */}
            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="h-8 w-px bg-slate-200 hidden md:block" />

            {/* Recipient Dropdown Style */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">For:</span>
              <div className="flex flex-wrap gap-2">
                {recipients.map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRecipient(r)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all ${selectedRecipient === r ? 'bg-delta-primary border-delta-primary text-white shadow-lg shadow-delta-primary/20' : 'bg-white border-slate-100 text-slate-600 hover:border-delta-primary/30'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={() => { setSelectedCategory('All'); setSelectedGender('All'); setSelectedRecipient('All'); setSelectedAgeGroup('All'); setSearchQuery(''); }}
              className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto py-20 px-4 md:px-8">
        <div className="flex flex-col xl:flex-row gap-16">
          {/* Left Side: Boutique Sidebar */}
          <aside className="w-full xl:w-80 space-y-12">
            <div className="space-y-10">
              {/* Age Group Redesign */}
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <div className="w-6 h-px bg-delta-primary" /> Age Group
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {ageGroups.map((a) => (
                    <button 
                      key={a.label}
                      onClick={() => setSelectedAgeGroup(a.label)}
                      className={`group flex items-center justify-between p-4 rounded-3xl border-2 transition-all ${selectedAgeGroup === a.label ? 'border-delta-primary bg-delta-primary/5' : 'border-white bg-white hover:border-slate-100 shadow-sm'}`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`text-sm font-bold ${selectedAgeGroup === a.label ? 'text-delta-primary' : 'text-slate-700'}`}>{a.label}</span>
                        <span className="text-[10px] font-medium text-slate-400">{a.range}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedAgeGroup === a.label ? 'bg-delta-primary text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100'}`}>
                        <ChevronRight size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Redesign */}
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <div className="w-6 h-px bg-delta-primary" /> Gender
                </h3>
                <div className="flex flex-wrap gap-3">
                  {genders.map((g) => (
                    <button 
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border-2 ${selectedGender === g ? 'border-delta-primary bg-delta-primary text-white shadow-xl shadow-delta-primary/20' : 'border-white bg-white text-slate-600 hover:border-slate-100 shadow-sm'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalization Banner */}
              <div className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-6 relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                  <h4 className="text-2xl font-serif italic leading-tight">Make it truly <span className="text-delta-primary">yours.</span></h4>
                  <p className="text-xs text-white/50 leading-relaxed font-medium">Every gift can be personalized with custom messages, wrapping, and boxing.</p>
                  <button className="w-full py-4 bg-delta-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-delta-primary/20">
                    Learn More
                  </button>
                </div>
                <Sparkles size={120} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </aside>

          {/* Right Side: Artistic Product Grid */}
          <div className="flex-1 space-y-12">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={product.id} 
                    className="group"
                  >
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-slate-200/50 mb-6">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        referrerPolicy="no-referrer" 
                      />
                      
                      {/* Artistic Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Floating Badges */}
                      <div className="absolute top-8 left-8 flex flex-col gap-3">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-xl">
                          {product.category}
                        </span>
                      </div>

                      <button 
                        onClick={() => onToggleLike(product)}
                        className={`absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 ${likedItems.find(item => item.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart size={20} fill={likedItems.find(item => item.id === product.id) ? "currentColor" : "none"} />
                      </button>

                      {/* Quick Action Bar */}
                      <div className="absolute bottom-8 left-8 right-8 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 flex gap-3">
                        <button 
                          onClick={() => onAddToCart({ name: product.name, price: product.price })}
                          className="flex-1 py-3 bg-white text-slate-900 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-delta-primary hover:text-white transition-all shadow-2xl"
                        >
                          Quick Add
                        </button>
                        <button 
                          onClick={() => setPersonalizingProduct(product)}
                          className="w-12 h-12 bg-delta-primary text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
                        >
                          <Sparkles size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 px-6">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-delta-primary">For {product.recipient}</p>
                          <h3 className="text-xl font-serif italic text-slate-900 tracking-tight group-hover:text-delta-primary transition-colors">{product.name}</h3>
                        </div>
                        <p className="text-xl font-black text-slate-900">₹{product.price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-2">
                        {product.desc}
                      </p>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-slate-200"} />)}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.rating} Rating</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-40 text-center space-y-8">
                <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center mx-auto text-slate-200">
                  <Search size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif italic text-slate-900">No treasures found</h3>
                  <p className="text-slate-400 font-medium">Try adjusting your filters to find the perfect gift.</p>
                </div>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSelectedGender('All'); setSelectedRecipient('All'); setSelectedAgeGroup('All'); setSearchQuery(''); }}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all shadow-xl"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Boutique Footer Banner */}
      <section className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-slate-900">Can't decide?</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Let our experts help you curate the perfect gift box for any occasion.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-delta-primary transition-all shadow-2xl shadow-slate-900/20">
              Chat with a Stylist
            </button>
            <button className="px-12 py-6 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:border-delta-primary transition-all shadow-xl">
              Gift Guide 2024
            </button>
          </div>
        </div>
      </section>

      {/* Personalization Modal */}
      <AnimatePresence>
        {personalizingProduct && (
          <PersonalizationModal 
            product={personalizingProduct} 
            onClose={() => setPersonalizingProduct(null)} 
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PersonalizationModal({ product, onClose, onAddToCart }: { product: any, onClose: () => void, onAddToCart: (p: any) => void }) {
  const [wrapping, setWrapping] = React.useState('Classic');
  const [boxing, setBoxing] = React.useState('Standard');
  const [extra, setExtra] = React.useState('None');
  const [customImage, setCustomImage] = React.useState<string | null>(null);
  const [customMessage, setCustomMessage] = React.useState('');
  const [step, setStep] = React.useState(1);

  const wrappingOptions = [
    { name: 'Classic', price: 50, img: "https://picsum.photos/seed/wrap-1/400/400", desc: "Elegant paper with a silk ribbon." },
    { name: 'Premium', price: 150, img: "https://picsum.photos/seed/wrap-2/400/400", desc: "Textured velvet wrap with gold accents." },
    { name: 'Luxury', price: 300, img: "https://picsum.photos/seed/wrap-3/400/400", desc: "Hand-painted artisanal paper and dried flowers." }
  ];

  const boxingOptions = [
    { name: 'Standard', price: 0, img: "https://picsum.photos/seed/box-1/400/400", desc: "Sturdy matte white box." },
    { name: 'Eco-friendly', price: 40, img: "https://picsum.photos/seed/box-2/400/400", desc: "Recycled kraft paper box with hemp twine." },
    { name: 'Wooden Crate', price: 250, img: "https://picsum.photos/seed/box-3/400/400", desc: "Hand-crafted pine wood crate for a rustic feel." }
  ];

  const extraOptions = [
    { name: 'None', price: 0 },
    { name: 'Greeting Card', price: 30 },
    { name: 'Photo Album', price: 500 }
  ];

  const totalPrice = product.price + 
    (wrappingOptions.find(o => o.name === wrapping)?.price || 0) + 
    (boxingOptions.find(o => o.name === boxing)?.price || 0) + 
    (extraOptions.find(o => o.name === extra)?.price || 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl h-full md:h-[90vh] bg-[#FAF9F6] md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-xl"
        >
          <X size={24} />
        </button>

        {/* Left Side: Immersive Preview */}
        <div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-delta-primary">Personalization Studio</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 leading-tight">Crafting your <br/> perfect gift.</h2>
          </div>

          <div className="relative aspect-square max-w-md mx-auto group">
            <motion.div 
              layoutId={`product-img-${product.id}`}
              className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative z-10 bg-slate-50"
            >
              <img src={product.img} alt="Product" className="w-full h-full object-cover" />
              {customImage && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-40 h-40 rounded-3xl border-4 border-white/50 border-dashed overflow-hidden shadow-2xl"
                  >
                    <img src={customImage} alt="Custom" className="w-full h-full object-cover opacity-90" />
                  </motion.div>
                </div>
              )}
            </motion.div>
            
            {/* Decorative Rings */}
            <div className="absolute -inset-8 border border-delta-primary/10 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-16 border border-delta-primary/5 rounded-full animate-spin-slow-reverse pointer-events-none" />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Investment</p>
                <p className="text-4xl font-black text-slate-900">₹{totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`w-2 h-2 rounded-full transition-all duration-500 ${step === s ? 'w-8 bg-delta-primary' : 'bg-slate-200'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Background Text */}
          <span className="absolute -bottom-10 -left-10 text-[15rem] font-serif italic text-slate-50 select-none pointer-events-none leading-none">Gift</span>
        </div>

        {/* Right Side: Studio Controls */}
        <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-[#FAF9F6] space-y-12">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-slate-900">Choose the Wrap</h3>
                <p className="text-sm text-slate-400 font-medium">Select a wrapping style that matches the occasion.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {wrappingOptions.map((opt) => (
                  <button 
                    key={opt.name}
                    onClick={() => setWrapping(opt.name)}
                    className={`group flex items-center gap-6 p-6 rounded-[2.5rem] border-2 transition-all text-left ${wrapping === opt.name ? 'border-delta-primary bg-white shadow-2xl shadow-delta-primary/5' : 'border-transparent bg-white hover:border-slate-100 shadow-sm'}`}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <img src={opt.img} alt={opt.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-slate-900">{opt.name}</p>
                        <p className="text-sm font-black text-delta-primary">₹{opt.price}</p>
                      </div>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{opt.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${wrapping === opt.name ? 'border-delta-primary bg-delta-primary text-white' : 'border-slate-200'}`}>
                      {wrapping === opt.name && <Check size={12} />}
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-delta-primary transition-all shadow-xl"
              >
                Next: Packaging & Design
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-slate-900">Packaging & Custom Design</h3>
                <p className="text-sm text-slate-400 font-medium">The final touch to your curated gift.</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Box Style</h4>
                <div className="grid grid-cols-3 gap-4">
                  {boxingOptions.map((opt) => (
                    <button 
                      key={opt.name}
                      onClick={() => setBoxing(opt.name)}
                      className={`p-4 rounded-3xl border-2 transition-all text-center space-y-3 ${boxing === opt.name ? 'border-delta-primary bg-white shadow-xl' : 'border-transparent bg-white hover:border-slate-100'}`}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
                        <img src={opt.img} alt={opt.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase">{opt.name}</p>
                        <p className="text-[10px] font-bold text-delta-primary">₹{opt.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Custom Design</h4>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full py-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white flex flex-col items-center justify-center gap-4 group-hover:border-delta-primary transition-all">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-delta-primary group-hover:bg-delta-primary/5 transition-all">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">Upload your own wrap design</p>
                      <p className="text-[10px] text-slate-400 font-medium">High resolution PNG or JPG preferred</p>
                    </div>
                  </div>
                </div>
                {customImage && (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img src={customImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-900">custom_design.jpg</p>
                      <p className="text-[10px] text-green-500 font-bold">Ready to print</p>
                    </div>
                    <button onClick={() => setCustomImage(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-6 bg-white border border-slate-100 text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="flex-[2] py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-delta-primary transition-all shadow-xl"
                >
                  Next: Add a Message
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-slate-900">The Final Message</h3>
                <p className="text-sm text-slate-400 font-medium">Add a personal note to make it unforgettable.</p>
              </div>

              <div className="space-y-8">
                <div className="flex flex-wrap gap-4">
                  {extraOptions.map((opt) => (
                    <button 
                      key={opt.name}
                      onClick={() => setExtra(opt.name)}
                      className={`px-8 py-4 rounded-2xl border-2 text-xs font-bold transition-all ${extra === opt.name ? 'border-delta-primary bg-white text-delta-primary shadow-xl shadow-delta-primary/5' : 'border-transparent bg-white text-slate-500 hover:border-slate-100 shadow-sm'}`}
                    >
                      {opt.name} {opt.price > 0 && `(+₹${opt.price})`}
                    </button>
                  ))}
                </div>

                {extra !== 'None' && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Message</h4>
                    <textarea 
                      placeholder={`Write your heart out for the ${extra}...`}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] text-sm font-medium focus:ring-4 focus:ring-delta-primary/5 outline-none min-h-[200px] resize-none shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 py-6 bg-white border border-slate-100 text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                  Back
                </button>
                <button 
                  onClick={() => {
                    onAddToCart({ 
                      name: `${product.name} (Customized)`, 
                      price: totalPrice,
                      personalization: { wrapping, boxing, extra, customMessage }
                    });
                    onClose();
                  }}
                  className="flex-[2] py-6 bg-delta-primary text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-delta-primary/90 transition-all shadow-2xl shadow-delta-primary/30 flex items-center justify-center gap-3"
                >
                  Complete & Add to Cart <ShoppingCart size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
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

function DashboardPage({ user, setView, Avatar }: { user: any, setView: (v: any) => void, Avatar: any }) {
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Saved Items', value: '8', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Courses Enrolled', value: '3', icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Reward Points', value: '450', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const recentOrders = [
    { id: '#ORD-7721', date: 'Oct 12, 2023', status: 'Delivered', total: '₹2,450', items: 3 },
    { id: '#ORD-7690', date: 'Sep 28, 2023', status: 'Processing', total: '₹1,299', items: 1 },
    { id: '#ORD-7655', date: 'Sep 15, 2023', status: 'Delivered', total: '₹850', items: 2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Dashboard</h1>
            <p className="text-slate-500 font-medium">Welcome back, <span className="text-delta-primary font-bold">{user.name}</span>! Here's what's happening.</p>
          </div>
          <button 
            onClick={() => setView('profile')}
            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:text-delta-primary hover:border-delta-primary transition-all shadow-sm flex items-center gap-2"
          >
            <User size={14} /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm space-y-4"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Orders</h2>
              <button className="text-xs font-bold text-delta-primary hover:underline">View All</button>
            </div>
            <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-900">{order.id}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{order.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-black text-slate-900">{order.total}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-delta-primary transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Account Overview</h2>
            <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
              <Avatar index={user.avatarIndex} size={64} className="rounded-2xl" />
              <div>
                <p className="text-lg font-black text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
              </div>
            </div>
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin size={16} className="text-slate-400" />
                  <p className="text-xs font-medium leading-relaxed">
                    {user.address.houseNo}, {user.address.street}, {user.address.locality}, {user.address.city}, {user.address.state}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Smartphone size={16} className="text-slate-400" />
                  <p className="text-xs font-medium">{user.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setView('profile')}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary transition-all shadow-lg shadow-slate-900/10"
              >
                Update Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ user, setUser, setView, Avatar }: { user: any, setUser: (u: any) => void, setView: (v: any) => void, Avatar: any }) {
  const [formData, setFormData] = React.useState(user);
  const [isSaving, setIsSaving] = React.useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setUser(formData);
      setIsSaving(false);
      setView('dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('dashboard')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-delta-primary hover:border-delta-primary transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Profile</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">MANAGE YOUR ACCOUNT SETTINGS</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-slate-100">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-300 overflow-hidden border-4 border-white shadow-xl cursor-pointer" onClick={() => setShowAvatarPicker(true)}>
                  <Avatar index={formData.avatarIndex} size={128} className="rounded-[2rem]" />
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowAvatarPicker(true)}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-delta-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-delta-primary/30 hover:scale-110 transition-all"
                >
                  <ImageIcon size={18} />
                </button>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-black text-slate-900">Profile Avatar</h3>
                <p className="text-xs text-slate-400 font-medium max-w-[240px]">Choose your favorite character from our exclusive collection.</p>
                <button 
                  type="button"
                  onClick={() => setShowAvatarPicker(true)}
                  className="text-[10px] font-black text-delta-primary uppercase tracking-widest hover:underline"
                >
                  Change Avatar
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showAvatarPicker && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Select Avatar</h4>
                      <button type="button" onClick={() => setShowAvatarPicker(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {AVATARS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, avatarIndex: i });
                            setShowAvatarPicker(false);
                          }}
                          className={`p-1 rounded-xl transition-all ${formData.avatarIndex === i ? 'bg-delta-primary ring-2 ring-delta-primary/20' : 'bg-white hover:bg-slate-100'}`}
                        >
                          <Avatar index={i} size={48} className="rounded-lg" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address Details</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">House No.</label>
                    <input 
                      type="text" 
                      value={formData.address.houseNo}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, houseNo: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                      placeholder="House No."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Street</label>
                    <input 
                      type="text" 
                      value={formData.address.street}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                      placeholder="Street"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Locality</label>
                    <input 
                      type="text" 
                      value={formData.address.locality}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, locality: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                      placeholder="Locality"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
                    <input 
                      type="text" 
                      value={formData.address.city}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">State</label>
                    <input 
                      type="text" 
                      value={formData.address.state}
                      onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all"
                      placeholder="State"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Payment Methods</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">MANAGE YOUR SAVED CARDS</p>
                </div>
                <button type="button" className="px-4 py-2 bg-slate-50 text-delta-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary/10 transition-all flex items-center gap-2">
                  <Plus size={14} /> Add New Card
                </button>
              </div>

              <div className="grid gap-4">
                {[
                  { type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
                  { type: 'Mastercard', last4: '8812', expiry: '09/25', isDefault: false }
                ].map((card, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-[10px]">
                        {card.type}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">•••• •••• •••• {card.last4}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expires {card.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {card.isDefault && (
                        <span className="px-2 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded">Default</span>
                      )}
                      <button type="button" className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-10 py-4 bg-delta-secondary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSaving ? 'Saving Changes...' : 'Save Profile'}
                {!isSaving && <ArrowRight size={16} />}
              </button>
              <button 
                type="button"
                onClick={() => setView('dashboard')}
                className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 hover:text-slate-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(0);

  const faqs = [
    { q: "What are your working hours?", a: "We are open from 9:00 AM to 10:00 PM, seven days a week." },
    { q: "Where is Delta Institute located?", a: "We are located at Shop no. 9, Vikas Nagar Kusmunda, Korba, Chhattisgarh." },
    { q: "Do you offer computer repair services?", a: "Yes, we offer comprehensive computer repair, hardware upgrades, and software troubleshooting." },
    { q: "Can I order stationery in bulk?", a: "Absolutely! We specialize in bulk orders for offices and schools. Contact us for special pricing." },
    { q: "Do you provide online courses?", a: "We currently focus on in-person professional training at our institute to ensure hands-on learning." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-warm-bg pb-24"
    >
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-bg/0 via-warm-bg/50 to-warm-bg" />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-delta-primary tracking-tighter uppercase">Get In Touch</h1>
          <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">We're here to help you grow</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {/* Contact Cards */}
          {[
            { icon: <MapPin size={24} />, title: "Visit Us", content: "Shop no.9 Vikas Nagar Kusmunda, Korba, CG", sub: "Delta Institute" },
            { icon: <Clock size={24} />, title: "Working Hours", content: "9:00 AM - 10:00 PM", sub: "Open All Week" },
            { icon: <Mail size={24} />, title: "Email Us", content: "contact@deltainstitute.com", sub: "support@deltainstitute.com" },
            { icon: <Smartphone size={24} />, title: "Call Us", content: "+91 98765 43210", sub: "+91 07759 123456" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-delta-primary group-hover:text-white transition-all mb-6">
                {item.icon}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{item.title}</h3>
              <p className="text-lg font-bold text-slate-900 leading-tight mb-1">{item.content}</p>
              <p className="text-xs font-bold text-slate-400">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-sm space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">Send a Message</h2>
              <p className="text-slate-400 font-medium">Have a question or need a quote? Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Name</label>
                  <input type="text" required className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-delta-primary focus:bg-white outline-none transition-all text-sm font-bold" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email</label>
                  <input type="email" required className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-delta-primary focus:bg-white outline-none transition-all text-sm font-bold" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
                <input type="text" required className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-delta-primary focus:bg-white outline-none transition-all text-sm font-bold" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                <textarea required rows={5} className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-delta-primary focus:bg-white outline-none transition-all text-sm font-bold resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button type="submit" className="w-full py-6 bg-delta-primary text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-delta-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Send Message
              </button>
            </form>

            <div className="pt-12 border-t border-black/5 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Follow Our Socials</span>
              <div className="flex items-center gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-delta-primary/10 hover:text-delta-primary transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map and FAQ */}
          <div className="space-y-12">
            {/* Map */}
            <div className="bg-white p-4 rounded-[3rem] border border-black/5 shadow-sm overflow-hidden h-[400px] relative group">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=82.6800%2C22.3000%2C82.7200%2C22.3400&amp;layer=mapnik&amp;marker=22.3200%2C82.7000" 
                className="w-full h-full rounded-[2.5rem] border-none grayscale-[0.5] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                title="Delta Institute Location"
              ></iframe>
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-delta-primary rounded-xl flex items-center justify-center text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Delta Institute</h4>
                    <p className="text-[10px] font-bold text-slate-400">Vikas Nagar, Kusmunda, Korba</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-sm space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-delta-primary tracking-tighter uppercase">Common Questions</h2>
                <p className="text-slate-400 font-medium">Quick answers to frequently asked questions about our services and store.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-black/5 last:border-none pb-4">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span className={`text-sm font-black uppercase tracking-widest transition-colors ${activeFaq === i ? 'text-delta-primary' : 'text-slate-600 group-hover:text-delta-primary'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-delta-primary' : 'text-slate-300'}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm font-bold text-slate-400 leading-relaxed pb-4">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">DELTA</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Crafting Excellence Since 2000</p>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm max-w-xs">Your trusted partner for quality stationery, expert computer services, and professional education.</p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-delta-primary transition-colors">
              <Facebook size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-delta-primary transition-colors">
              <Twitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-delta-primary transition-colors">
              <Instagram size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-delta-primary transition-colors">
              <Youtube size={14} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-200 mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-delta-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Our Faculty</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Shop Stationery</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Library Membership</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-200 mb-6">Support</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-delta-primary transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-200 mb-6">Stay Updated</h4>
          <p className="text-slate-400 mb-4 text-sm">Subscribe to get the latest news and offers.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-delta-primary transition-colors flex-1" />
            <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-slate-200 transition-all">Join</button>
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

function LikedPage({ items, onAddToCart, onToggleLike }: { 
  items: any[], 
  onAddToCart: (p: any) => void,
  onToggleLike: (p: any) => void
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Saved Items</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{items.length} ITEMS IN YOUR WISHLIST</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <button 
                    onClick={() => onToggleLike(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-sm"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category || product.brand}</p>
                    <h3 className="font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                  </div>
                  <p className="text-xl font-black text-delta-primary">₹{product.price.toLocaleString()}</p>
                  <div className="pt-2 flex gap-2">
                    <button 
                      onClick={() => onAddToCart({ name: product.name, price: product.price, img: product.img })}
                      className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-delta-primary transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button 
                      onClick={() => onToggleLike(product)}
                      className="w-12 py-3 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] border border-black/5 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
              <Heart size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Save items you like to see them here and buy them later.</p>
            </div>
            <button 
              onClick={() => window.location.reload()} // Simple way to go back to home if no router
              className="px-10 py-4 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- CART DRAWER COMPONENT ---
function CategoriesDrawer({ isOpen, onClose, setView, lang, setLang }: { 
  isOpen: boolean, 
  onClose: () => void,
  setView: (v: any) => void,
  lang: 'ENG' | 'HIN',
  setLang: (l: 'ENG' | 'HIN') => void
}) {
  const categories = [
    { 
      name: 'Stationery Store', 
      icon: <Pencil size={22} />, 
      view: 'shop',
      items: ['Pens & Pencils', 'Notebooks', 'Art Supplies', 'Office Supplies']
    },
    { 
      name: 'Printing Services', 
      icon: <Printer size={22} />, 
      view: 'printing',
      items: ['Photocopy', 'Color Printing', 'Bulk Printing', 'Binding']
    },
    { 
      name: 'Education & Courses', 
      icon: <GraduationCap size={22} />, 
      view: 'courses',
      items: ['Computer Basics', 'Advanced Excel', 'Tally Prime', 'Web Design', 'Latest Blogs']
    },
    { 
      name: 'Tech & Repair', 
      icon: <Monitor size={22} />, 
      view: 'services',
      items: ['PC Repair', 'Software Install', 'Networking', 'Data Recovery']
    },
    { 
      name: 'Custom Gifts', 
      icon: <Gift size={22} />, 
      view: 'gifts',
      items: ['Mug Printing', 'T-Shirt Print', 'Keychains', 'Corporate Gifts']
    },
    { 
      name: 'Coming Soon', 
      icon: <ShoppingBag size={22} />, 
      view: 'coming-soon',
      items: ['Limited Edition', 'New Arrivals', 'Exclusive Drops']
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-[350px] bg-white z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-delta-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-delta-primary/20">Δ</div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Categories</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore Delta Services</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-delta-primary hover:border-delta-primary/20 transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <button 
                    onClick={() => { setView(cat.view as any); onClose(); }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-delta-primary group transition-all duration-300 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform shadow-sm">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-white transition-colors">{cat.name}</h3>
                      <p className="text-[10px] font-medium text-slate-400 group-hover:text-white/70 transition-colors uppercase tracking-widest">View Section</p>
                    </div>
                  </button>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {cat.items.map((item, i) => (
                      <button 
                        key={i}
                        onClick={() => { setView(cat.view as any); onClose(); }}
                        className="text-left text-sm font-bold text-slate-400 hover:text-delta-primary transition-colors py-1 flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-6">
              <div className="flex items-center gap-3 text-xs font-black text-slate-400 px-2">
                <button 
                  onClick={() => setLang('ENG')}
                  className={`${lang === 'ENG' ? 'text-black' : 'hover:text-black'} transition-colors`}
                >
                  ENG
                </button>
                <span className="text-slate-200">/</span>
                <button 
                  onClick={() => setLang('HIN')}
                  className={`${lang === 'HIN' ? 'text-black font-hindi' : 'hover:text-black font-hindi'} transition-colors`}
                >
                  हिन्दी
                </button>
              </div>
              <button 
                onClick={() => { setView('services'); onClose(); }}
                className="w-full py-4 bg-delta-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-delta-primary/20 hover:bg-delta-primary/90 transition-all"
              >
                All Services & Products
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQty, onViewCart, likedItems, onToggleLike }: { 
  isOpen: boolean, 
  onClose: () => void,
  items: any[],
  onRemove: (id: number) => void,
  onUpdateQty: (id: number, delta: number) => void,
  onViewCart: () => void,
  likedItems: any[],
  onToggleLike: (p: any) => void
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
                    <div className="w-20 h-20 rounded-2xl bg-white/50 overflow-hidden flex-shrink-0 border border-white/50 shadow-sm relative group/img">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-1 right-1 translate-x-10 group-hover/img:translate-x-0 transition-transform duration-300">
                        <button 
                          onClick={() => onToggleLike(item)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm bg-white ${
                            likedItems.find(l => l.id === item.id) 
                              ? 'text-red-500' 
                              : 'text-slate-400 hover:text-red-500'
                          }`}
                        >
                          <Heart size={10} fill={likedItems.find(l => l.id === item.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
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
