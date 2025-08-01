import { useState, useEffect } from 'react';
import data from './data/data.json';
import Card from './components/Card';
import Checkout from './components/Checkout';
import Popup from './components/Popup';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setProducts(data);
    }, []);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.name === product.name);
            if (existingItem) {
                // If quantity is 0, remove the item from cart
                if (product.quantity === 0) {
                    return prevCart.filter(item => item.name !== product.name);
                }
                // Otherwise, update the quantity
                return prevCart.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: product.quantity }
                        : item
                );
            } else {
                // Add new item to cart if quantity > 0
                if (product.quantity > 0) {
                    return [...prevCart, { ...product }];
                }
                return prevCart;
            }
        });
    };

    const removeFromCart = (productName) => {
        setCart(prevCart => prevCart.filter(item => item.name !== productName));
    };

    const updateQuantity = (productName, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productName);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.name === productName ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleConfirmOrder = () => {
        if (cart.length > 0) {
            setShowPopup(true);
        }
    };

    const handleNewOrder = () => {
        setShowPopup(false);
        clearCart();
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-rose-900">Desserts</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.map((product, index) => {
                            const cartItem = cart.find(item => item.name === product.name);
                            return (
                                <Card
                                    key={index}
                                    product={product}
                                    onAddToCart={addToCart}
                                    inCart={cartItem}
                                />
                            );
                        })}
                    </div>
                </div>

                <div>
                    <Checkout
                        cart={cart}
                        onRemoveItem={removeFromCart}
                        onUpdateQuantity={updateQuantity}
                        onClearCart={clearCart}
                        onConfirmOrder={handleConfirmOrder}
                        totalItems={getTotalItems()}
                        totalPrice={getTotalPrice()}
                    />
                </div>
            </div>

            {showPopup && (
                <Popup 
                    cart={cart} 
                    onClose={handleNewOrder} 
                    totalPrice={getTotalPrice()} 
                />
            )}
        </div>
    );
};

export default App;