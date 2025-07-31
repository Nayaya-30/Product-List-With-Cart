const Checkout = ({ 
  cart, 
  onRemoveItem, 
  onClearCart,
  totalItems,
  totalPrice 
}) => {
  const handleConfirmOrder = () => {
    if (cart.length > 0) {
      // In a real app, this would proceed to checkout
      alert('Order confirmed! In a real application, this would proceed to payment.');
      onClearCart();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        Your Cart ({totalItems})
      </h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <img 
            src="/assets/images/illustration-empty-cart.svg" 
            alt="Empty cart" 
            className="mx-auto mb-4"
          />
          <p className="text-gray-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-orange-500 font-semibold mr-4">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-500 mr-4">
                      @${item.price.toFixed(2)}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveItem(item.name)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <span>X</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mb-6">
            <p className="text-gray-500">Order Total</p>
            <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <p className="text-center text-sm text-gray-600">
              This is a <span className="font-semibold">carbon-neutral</span> delivery
            </p>
          </div>
          
          <button
            onClick={handleConfirmOrder}
            className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;