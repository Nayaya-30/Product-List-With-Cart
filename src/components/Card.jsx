import { useState, useEffect } from 'react';

// Import all images dynamically using Vite's import.meta.glob
const imageModules = import.meta.glob('../assets/images/*.jpg', { eager: true });

const getImagePath = (imagePath) => {
  // Create the key for import.meta.glob
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
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
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
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full flex items-center">
            <button 
              onClick={decrementQuantity}
              className="w-8 h-8 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button 
              onClick={incrementQuantity}
              className="w-8 h-8 rounded-full border-2 border-orange-500 bg-orange-500 text-white flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full border-2 border-orange-500 py-2 px-6 flex items-center hover:bg-orange-500 hover:text-white transition-colors"
          >
            <span className="mr-2">+</span> Add to Cart
          </button>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-gray-500 text-sm">{product.category}</p>
        <h2 className="font-semibold">{product.name}</h2>
        <p className="text-orange-500 font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
};

export default Card;