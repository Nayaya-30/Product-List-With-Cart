/*******************    💫 Codegeex Inline Diff    *******************/
import { useState, useEffect } from 'react';

// Import all images dynamically using Vite's import.meta.glob
const imageModules = import.meta.glob('../assets/images/*.jpg', { eager: true });

const getImagePath = (imagePath) => {
    // Create the key for import.meta.glob
    /****************  08a93e35d4b840f7b2dfb2e0119ac72a  ****************/
    const imageKey = `../assets/images/${imagePath.split('/').pop()}`;
    const imageModule = imageModules[imageKey];
    return imageModule ? imageModule.default : null;
};

const Card = ({ product, onAddToCart, inCart }) => {
    const [quantity, setQuantity] = useState(0);
    
    // Synchronize local quantity with the actual cart quantity
    useEffect(() => {
        if (inCart && inCart.quantity > 0) {
            setQuantity(inCart.quantity);
        } else {
            setQuantity(0);
        }
    }, [inCart]);
    
    const handleAddToCart = () => {
        const productWithQuantity = { ...product, quantity: 1 };
        onAddToCart(productWithQuantity);
        setQuantity(1);
    };
    
    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onAddToCart({ ...product, quantity: newQuantity });
    };
    
    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onAddToCart({ ...product, quantity: newQuantity });
        } else if (quantity === 1) {
            // When quantity reaches 0, we need to remove the item from cart
            setQuantity(0);
            onAddToCart({ ...product, quantity: 0 });
        }
    };
    
    const imageSrc = getImagePath(product.image.desktop);
    
    return (
        <article className="bg-white p-4 rounded-lg overflow-hidden">
            <div className="relative ">
                {imageSrc ?
                    (<img src={imageSrc} alt={product.name} className={`w-full rounded-xl
                    ${quantity > 0 ? 'border-2 border-rose-700' : ''} h-50 object-cover`}/>)
                    : (<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Image not found</span>
                    </div>)
                }
                
                {quantity > 0 ? (
                    <div className="quantity-controls">
                        <button onClick={decrementQuantity} className="quantity-btn decrement">
                            -
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button onClick={incrementQuantity} className="quantity-btn increment">
                            +
                        </button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart} className="add-to-cart-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                            <g fill="#C73B0F" clip-path="url(#a)">
                                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                            </g>
                            <defs>
                                <clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="text-xs font-semibold">Add to Cart</span>
                    </button>
                )}
            </div>
            
            <div className="pt-8">
                <p className="font-bold mb-2 text-rose-300 text-sm">{product.category}</p>
                <h2 className="font-semibold text-sm text-rose-900">{product.name}</h2>
                <p className="text-red-700 text-lg font-semibold">${product.price.toFixed(2)}</p>
            </div>
        </article>
    );
};

export default Card;