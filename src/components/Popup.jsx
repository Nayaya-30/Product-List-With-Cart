const Popup = ({ cart, onClose, totalPrice }) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center mb-6">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
                            <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
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
                    className="w-full cursor-pointer bg-rose-700 border-2 text-white py-2 rounded-full
                    font-semibold hover:bg-rose-100 hover:text-rose-700 hover:border-2 hover:border-rose-700
                    active:scale-95 transition-all duration-200 flex items-center justify-center"
                >
                    Start New Order
                </button>
            </div>
        </div>
    );
};

export default Popup;