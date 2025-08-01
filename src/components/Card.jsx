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
    <article className="bg-white rounded-lg overflow-hidden">
      <div className="relative">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image not found</span>
          </div>
        )}
        
        {quantity > 0 ? (
          <div className="quantity-controls">
            <button 
              onClick={decrementQuantity}
              className="quantity-btn decrement"
            >
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button 
              onClick={incrementQuantity}
              className="quantity-btn increment"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span className="ml-2 font-semibold">Add to Cart</span>
          </button>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-rose-400 text-sm">{product.category}</p>
        <h2 className="font-semibold text-rose-900">{product.name}</h2>
        <p className="text-red font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
};

export default Card;