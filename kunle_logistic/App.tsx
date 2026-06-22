import { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  MessageCircle, 
  X, 
  Send, 
  Truck, 
  Shield, 
  Clock, 
  Star, 
  CheckCircle,
  CreditCard,
  Lock,
  ChevronRight,
  Menu,
  Phone,
  MapPin,
  Mail,
  Search,
  Heart,
  Minus,
  Plus,
  Package,
  Zap,
  Award,
  Headphones
} from 'lucide-react';
import { cn } from './utils/cn';

// Product data
const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 45000,
    originalPrice: 60000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 128,
    badge: 'Best Seller',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch Pro',
    price: 38000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 94,
    badge: 'New Arrival',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Organic Shea Butter Set',
    price: 8500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 256,
    badge: 'Popular',
    category: 'Beauty'
  },
  {
    id: 4,
    name: 'Premium Ankara Fabric',
    price: 15000,
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 89,
    badge: null,
    category: 'Fashion'
  },
  {
    id: 5,
    name: 'Portable Power Bank 20000mAh',
    price: 12000,
    originalPrice: 16000,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 167,
    badge: 'Hot Deal',
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Artisan Leather Bag',
    price: 28000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 73,
    badge: null,
    category: 'Fashion'
  },
  {
    id: 7,
    name: 'Natural Hair Care Bundle',
    price: 18500,
    originalPrice: 24000,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 312,
    badge: 'Best Value',
    category: 'Beauty'
  },
  {
    id: 8,
    name: 'Smart Home Security Camera',
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 56,
    badge: 'New',
    category: 'Electronics'
  }
];

// Customer reviews
const reviews = [
  {
    id: 1,
    name: 'Adaobi Nwankwo',
    location: 'Lagos',
    rating: 5,
    text: 'Fastest delivery ever! Got my package in just 2 hours. The customer service was excellent and the product quality exceeded my expectations.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    verified: true
  },
  {
    id: 2,
    name: 'Chidi Okonkwo',
    location: 'Abuja',
    rating: 5,
    text: 'The chat-to-order feature is a game changer. Placed my order while commuting and it was delivered the same day. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    verified: true
  },
  {
    id: 3,
    name: 'Fatima Abdullahi',
    location: 'Kano',
    rating: 5,
    text: 'I love the secure payment options. The packaging was professional and my items arrived in perfect condition. Will definitely shop again!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    verified: true
  },
  {
    id: 4,
    name: 'Emmanuel Adeyemi',
    location: 'Ibadan',
    rating: 5,
    text: 'Best prices I have found online. The WhatsApp chat feature made ordering so easy. Delivery was prompt and tracking was accurate.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    verified: true
  }
];

// Chat messages type
interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

function App() {
  const [cart, setCart] = useState<{ product: typeof products[0]; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', text: 'Hello! Welcome to Kunle Venture Logistics. How can I help you today?', timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Electronics', 'Fashion', 'Beauty'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg: ChatMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      text: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        'I can help you place an order! Which product are you interested in?',
        'Great choice! Would you like to add this to your cart?',
        'We offer same-day delivery in Lagos and 1-2 day delivery nationwide.',
        'You can pay securely via card, bank transfer, or cash on delivery.',
        'Is there anything else you would like to know about our products?'
      ];
      const botMsg: ChatMessage = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Kunle Venture</h1>
                <p className="text-xs text-gray-500">Logistics</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {['Home', 'Products', 'Delivery', 'Reviews', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              
              <button 
                onClick={() => setIsChatOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat to Order</span>
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Products', 'Delivery', 'Reviews', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-orange-600 font-medium"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { setIsChatOpen(true); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat to Order</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 lg:pt-0">
        <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-700">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Same-Day Delivery Available</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Shop Smarter,
                <span className="text-orange-300"> Deliver Faster</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                Discover premium products with lightning-fast delivery. Order via WhatsApp chat and get your items delivered to your doorstep today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat to Order
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-white/70">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold">2hrs</div>
              <div className="text-sm text-white/70">Avg. Delivery</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold">4.9</div>
              <div className="text-sm text-white/70">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Same-day in Lagos' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: Award, title: 'Quality Guarantee', desc: 'Premium products' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Top Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our best-selling items, carefully selected for quality and value. All products come with fast delivery guarantee.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all",
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  {/* Quick add overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-orange-600 font-medium mb-1">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all">
              View All Products
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Delivery Info Section */}
      <section id="delivery" className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Lightning-Fast Delivery</h2>
              <p className="text-gray-300 text-lg mb-8">
                We understand that time is valuable. That is why we have optimized our logistics network to get your orders to you as quickly as possible.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Zap, title: 'Express Delivery', desc: 'Get your order within 2-4 hours in Lagos', color: 'bg-yellow-500' },
                  { icon: Package, title: 'Nationwide Shipping', desc: '1-2 day delivery to all 36 states', color: 'bg-blue-500' },
                  { icon: MapPin, title: 'Real-time Tracking', desc: 'Track your package every step of the way', color: 'bg-green-500' },
                  { icon: CheckCircle, title: 'Secure Handling', desc: 'Your items are handled with utmost care', color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", item.color)}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop" 
                  alt="Delivery"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">50,000+</p>
                    <p className="text-sm text-gray-500">Deliveries Made</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-orange-500 text-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">2hrs</p>
                    <p className="text-sm text-white/80">Average Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 lg:py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied customers who trust Kunle Venture Logistics for their shopping needs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">"{review.text}"</p>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Stats */}
          <div className="mt-16 bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '50,000+', label: 'Orders Delivered' },
                { value: '4.9/5', label: 'Average Rating' },
                { value: '98%', label: 'Satisfaction Rate' },
                { value: '24/7', label: 'Customer Support' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Security Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop with Confidence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Your security is our priority. We use industry-standard encryption and offer multiple secure payment options.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Lock, 
                title: 'Secure Payments', 
                desc: '256-bit SSL encryption protects all your transactions. Your payment information is never stored on our servers.',
                color: 'bg-blue-100 text-blue-600'
              },
              { 
                icon: CreditCard, 
                title: 'Multiple Options', 
                desc: 'Pay with card, bank transfer, USSD, or cash on delivery. Choose what works best for you.',
                color: 'bg-green-100 text-green-600'
              },
              { 
                icon: Shield, 
                title: 'Buyer Protection', 
                desc: 'Full refund guarantee if your order is not delivered or does not match the description.',
                color: 'bg-purple-100 text-purple-600'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6", item.color)}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Visa', 'Mastercard', 'Verve', 'Paystack', 'Flutterwave'].map((method) => (
              <div key={method} className="px-6 py-3 bg-gray-100 rounded-lg font-semibold text-gray-600">
                {method}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Shop?</h2>
              <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Experience the fastest delivery service in Nigeria. Chat with us now and get your order delivered today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat to Order Now
                </button>
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-sm"
                >
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Kunle Venture</h3>
                  <p className="text-xs text-gray-400">Logistics</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted partner for fast, reliable delivery and quality products across Nigeria.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram'].map((social, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-sm font-bold">
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Products', 'Delivery Info', 'Track Order', 'FAQs'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-lg mb-6">Categories</h4>
              <ul className="space-y-3">
                {['Electronics', 'Fashion', 'Beauty', 'Home & Living', 'Sports'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">{cat}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">123 Delivery Street, Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400">+234 800 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400">hello@kunleventure.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Kunle Venture Logistics. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="bg-green-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">Chat to Order</h4>
                <p className="text-xs text-white/80">We reply instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={cn(
                  "flex",
                  msg.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                    msg.type === 'user' 
                      ? "bg-green-500 text-white rounded-br-md"
                      : "bg-white text-gray-700 shadow-sm rounded-bl-md"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                onClick={sendChatMessage}
                className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Powered by WhatsApp Business API
            </p>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Your Cart ({cartCount})</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 280px)' }}>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-orange-600 font-medium hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.product.name}</h4>
                        <p className="text-orange-600 font-bold mt-1">{formatPrice(item.product.price)}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-medium w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">{formatPrice(cartTotal)}</span>
                </div>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat to Complete Order
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Secure checkout via WhatsApp
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
