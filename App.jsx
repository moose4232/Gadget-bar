import React, { useState, useEffect } from 'react';

// --- Mock Database ---
// In a real application, this data would come from a server (e.g., Shopify, Magento, or your own database).
const allProducts = [
    // Smartphones
    { id: 1, category: 'Smartphones', name: 'Samsung Galaxy S24 Ultra', price: 105000, image: 'Images/samsung-s24-ultra.webp', description: 'The ultimate AI phone with a stunning 200MP camera and built-in S Pen.', specs: { display: '6.8" Dynamic LTPO AMOLED 2X', processor: 'Snapdragon 8 Gen 3 for Galaxy', ram: '12GB', camera: '200MP Quad Camera' }, status: 'In Stock' },
    { id: 2, category: 'Smartphones', name: 'Xiaomi 15 Ultra', price: 160000, image: 'Images/xiaomi-15-ultra.jpg', description: 'Next-gen Snapdragon 8 Elite power with an advanced Leica quad-camera system.', specs: { display: '6.73" LTPO AMOLED', processor: 'Snapdragon 8 Elite', ram: '16GB', camera: '200MP Quad Camera' }, status: 'Coming Soon' },
    { id: 3, category: 'Smartphones', name: 'OnePlus 13', price: 118000, image: 'Images/oneplus-13.png', description: 'Flagship performance with Hasselblad cameras and a massive 6000mAh battery.', specs: { display: '6.82" LTPO AMOLED', processor: 'Snapdragon 8 Elite', ram: '16GB', camera: '50MP Triple Camera' }, status: 'Coming Soon' },
    { id: 4, category: 'Smartphones', name: 'Google Pixel 9 Pro', price: 91500, image: 'Images/pixel-9-pro.jpg', description: 'The pinnacle of AI-powered photography with the new Tensor G4 chip.', specs: { display: '6.3" LTPO OLED', processor: 'Google Tensor G4', ram: '16GB', camera: '50MP Triple Camera' }, status: 'Coming Soon' },
    // Audio
    { id: 5, category: 'Audio', name: 'Sony WH-1000XM5', price: 38000, image: 'https://placehold.co/400x400/f1f5f9/475569?text=Sony+XM5', description: 'Industry-leading noise cancellation and premium sound quality.', status: 'In Stock' },
    { id: 6, category: 'Audio', name: 'Apple AirPods Pro (2nd Gen)', price: 25500, image: 'https://placehold.co/400x400/f1f5f9/475569?text=AirPods+Pro', description: 'Adaptive Audio, richer sound, and a personalized spatial experience.', status: 'In Stock' },
    // Smartwatches
    { id: 7, category: 'Smartwatches', name: 'Apple Watch Series 10', price: 55000, image: 'https://placehold.co/400x400/f1f5f9/475569?text=Apple+Watch+10', description: 'Smarter, brighter, and more powerful for a healthier life.', status: 'In Stock' },
    { id: 8, category: 'Smartwatches', name: 'Samsung Galaxy Watch 7', price: 45000, image: 'https://placehold.co/400x400/f1f5f9/475569?text=Galaxy+Watch+7', description: 'Advanced health monitoring on your wrist with a sleek design.', status: 'In Stock' },
    // Accessories
    { id: 9, category: 'Accessories', name: 'Anker 735 Charger (GaNPrime 65W)', price: 5500, image: 'https://placehold.co/400x400/f1f5f9/475569?text=Anker+Charger', description: 'Charge 3 devices at once with this powerful and compact charger.', status: 'In Stock' },
    // Best Deals
    { id: 10, category: 'Smartphones', name: 'Xiaomi Redmi Note 14', price: 28000, image: 'Images/xiaomi-redmi-note-14-8gb-256gb_(1)54.jpeg', description: 'Amazing value with a high-resolution camera and long-lasting battery.', status: 'In Stock' },
    { id: 11, category: 'Smartphones', name: 'Redmi Turbo 4 Pro', price: 40000, image: 'Images/redmi-turbo-4-pro-black.jpg', description: 'Performance-focused device for gaming and multitasking.', status: 'In Stock' },
    { id: 12, category: 'Smartphones', name: 'OnePlus 13T', price: 75000, image: 'Images/oneplus_13t.jpg', description: 'A perfect balance of flagship features and affordability.', status: 'In Stock' },
];

// --- Helper Components ---

const Header = ({ onNavigate, cartItemCount }) => (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex-shrink-0">
                    <button onClick={() => onNavigate('home')}>
                        <img src="https://i.imgur.com/k2Oh2tY.png" alt="Gadgetbar Logo" className="h-16 w-auto" />
                    </button>
                </div>
                <nav className="hidden md:flex space-x-6 items-center">
                    <button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Home</button>
                    {/* These would eventually link to category pages */}
                    <button className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Smartphones</button>
                    <button className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Smartwatches</button>
                    <button className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Audio</button>
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={() => onNavigate('cart')} className="text-gray-300 hover:text-white relative">
                        <i className="fas fa-shopping-cart text-xl"></i>
                        {cartItemCount > 0 && (
                           <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </header>
);

const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <p>&copy; 2025 Gadgetbar. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

const ProductCard = ({ product, onNavigate, onAddToCart }) => (
    <div className="bg-white rounded-lg overflow-hidden border flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
        <button onClick={() => onNavigate('product', product.id)} className="block">
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/f1f5f9/475569?text=Image+Not+Found'; }} />
        </button>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 flex-grow">
                <button onClick={() => onNavigate('product', product.id)} className="hover:text-orange-500 text-left">{product.name}</button>
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.description.substring(0, 70)}...</p>
            <p className="text-xl font-bold text-teal-600 mb-4">৳{product.price.toLocaleString()}</p>
            {product.status === 'In Stock' ? (
                <button onClick={() => onAddToCart(product)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg mt-auto">Add to Cart</button>
            ) : (
                <button className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg mt-auto cursor-not-allowed">Coming Soon</button>
            )}
        </div>
    </div>
);


// --- Pages ---

const HomePage = ({ onNavigate, onAddToCart }) => {
    const featuredProducts = allProducts.slice(0, 4);
    const bestDeals = allProducts.filter(p => [10, 11, 12].includes(p.id));

    return (
        <>
            <section className="text-center py-12 bg-white">
                <h1 className="text-3xl font-bold text-gray-800">WELCOME TO GADGETBAR!</h1>
                <p className="mt-2 text-gray-600">"Trusted Gadgets. Happy customers."</p>
            </section>
            
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">This Week's Top Picks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAddToCart={onAddToCart} />
                        ))}
                    </div>
                </div>
            </section>

             <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-orange-500 rounded-lg overflow-hidden relative h-full flex items-center justify-center p-2">
                           <img src="Images/Best Deal.jpg" alt="CMF Phone 2 Pro" className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/F97316/FFFFFF?text=Top+Deal'; }}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">BEST DEALS</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {bestDeals.map(product => (
                                     <div key={product.id} className="bg-white p-4 rounded-lg border flex items-center space-x-4">
                                         <img src={product.image} alt={product.name} className="w-20 h-20 object-contain"/>
                                         <div>
                                            <h4 className="font-semibold text-sm">{product.name}</h4>
                                            <p className="text-teal-600 font-bold">৳{product.price.toLocaleString()}</p>
                                         </div>
                                     </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const ProductDetailPage = ({ productId, onAddToCart }) => {
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        return <div className="text-center py-20">Product not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="bg-white rounded-lg border p-4 mb-4">
                        <img src={product.image} alt={product.name} className="w-full h-auto object-contain" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/f1f5f9/475569?text=Image+Not+Found'; }}/>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 my-4">{product.description}</p>
                    <p className="text-3xl font-extrabold text-teal-600 mb-6">৳{product.price.toLocaleString()}</p>
                    
                    {product.specs && (
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-2">Key Specifications:</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <li key={key}><span className="font-semibold capitalize">{key}:</span> {value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {product.status === 'In Stock' ? (
                        <button onClick={() => onAddToCart(product)} className="w-full cta-button font-bold py-3 rounded-lg flex-grow">Add to Cart</button>
                     ) : (
                        <button className="w-full bg-gray-400 text-white font-bold py-3 rounded-lg cursor-not-allowed">Coming Soon</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ cartItems, onUpdateCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleQuantityChange = (product, quantity) => {
        if (quantity < 1) {
            // Remove item if quantity is less than 1
            onUpdateCart(cartItems.filter(item => item.id !== product.id));
        } else {
            onUpdateCart(cartItems.map(item => item.id === product.id ? { ...item, quantity } : item));
        }
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="bg-white rounded-lg border p-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg" />
                                <div>
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-gray-500">৳{item.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded-lg">
                                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className="px-3 py-1 text-lg font-bold">-</button>
                                    <input type="text" value={item.quantity} readOnly className="w-12 text-center font-bold" />
                                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="px-3 py-1 text-lg font-bold">+</button>
                                </div>
                                <p className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end items-center mt-6">
                        <span className="text-xl font-bold">Total:</span>
                        <span className="text-xl font-bold text-teal-600 ml-4">৳{total.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-end mt-6">
                         <button className="cta-button font-bold py-3 px-8 rounded-lg">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Main App Component ---

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [currentProductId, setCurrentProductId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    
    const navigateTo = (page, productId = null) => {
        setCurrentPage(page);
        setCurrentProductId(productId);
    };

    const handleAddToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...productToAdd, quantity: 1 }];
        });
        alert(`${productToAdd.name} has been added to your cart!`);
    };

    const handleUpdateCart = (updatedCart) => {
        setCartItems(updatedCart);
    };

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    let pageContent;
    switch (currentPage) {
        case 'product':
            pageContent = <ProductDetailPage productId={currentProductId} onAddToCart={handleAddToCart} />;
            break;
        case 'cart':
            pageContent = <CartPage cartItems={cartItems} onUpdateCart={handleUpdateCart} />;
            break;
        default:
            pageContent = <HomePage onNavigate={navigateTo} onAddToCart={handleAddToCart} />;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header onNavigate={navigateTo} cartItemCount={cartItemCount} />
            <main>
                {pageContent}
            </main>
            <Footer />
        </div>
    );
}
