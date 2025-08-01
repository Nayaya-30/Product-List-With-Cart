import { useState } from 'react';

const Checkout = ({ 
  cart, 
  onRemoveItem, 
  onClearCart,
  onConfirmOrder,
  totalItems,
  totalPrice 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-red mb-4">
        Your Cart ({totalItems})
      </h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <img 
            src="/assets/images/illustration-empty-cart.svg" 
            alt="Empty cart" 
            className="mx-auto mb-4"
          />
          <p className="text-rose-400">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-rose-100 pb-4">
                <div>
                  <h3 className="font-semibold text-rose-900">{item.name}</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-red font-semibold mr-4">
                      {item.quantity}x
                    </span>
                    <span className="text-rose-400 mr-4">
                      @${item.price.toFixed(2)}
                    </span>
                    <span className="font-semibold text-rose-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveItem(item.name)}
                  className="w-6 h-6 rounded-full border border-rose-300 flex items-center justify-center text-rose-300 hover:border-rose-900 hover:text-rose-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mb-6">
            <p className="text-rose-900">Order Total</p>
            <p className="font-bold text-2xl text-rose-900">${totalPrice.toFixed(2)}</p>
          </div>
          
          <div className="bg-rose-50 rounded-lg p-4 mb-6">
            <p className="text-center text-sm text-rose-500">
              This is a <span className="font-semibold">carbon-neutral</span> delivery
            </p>
          </div>
          
          <button
            onClick={onConfirmOrder}
            className="w-full bg-red text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;