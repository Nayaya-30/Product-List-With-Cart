const Popup = ({ cart, onClose, totalPrice }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Order Confirmed</h2>
          <p className="text-gray-500 mb-6">We hope you enjoy your food!</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-orange-500 font-semibold mr-4">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-500 mr-2">
                      @${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4 pt-4 border-t">
            <p className="text-gray-500">Order Total</p>
            <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Popup;