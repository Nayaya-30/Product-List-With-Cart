const Popup = ({ cart, onClose, totalPrice }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-rose-900 mb-2">Order Confirmed</h2>
                    <p className="text-rose-400 mb-6">We hope you enjoy your food!</p>
                </div>

                <div className="bg-rose-50 rounded-lg p-6 mb-6">
                    <div className="space-y-4 mb-4">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-rose-900">{item.name}</h3>
                                    <div className="flex items-center text-sm my-1">
                    <span className="text-red font-semibold mr-4">
                      {item.quantity}x
                    </span>
                                        <span className="text-rose-400 mr-4">
                      @${item.price.toFixed(2)}
                    </span>
                                    </div>
                                </div>
                                <p className="font-semibold text-rose-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 pt-4 border-t border-rose-300">
                        <p className="text-rose-900">Order Total</p>
                        <p className="font-bold text-lg text-rose-900">${totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-red text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
                >
                    Start New Order
                </button>
            </div>
        </div>
    );
};

export default Popup;