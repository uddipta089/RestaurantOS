import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/slices/cartSlice';

const POS = () => {
  const dispatch = useDispatch();
  const { items, subtotal, tax, total } = useSelector(state => state.cart);

  // Mock Menu Items
  const menuItems = [
    { _id: '1', name: 'Classic Burger', price: 12.99, category: 'Mains' },
    { _id: '2', name: 'Margherita Pizza', price: 15.50, category: 'Mains' },
    { _id: '3', name: 'Caesar Salad', price: 9.00, category: 'Starters' },
    { _id: '4', name: 'French Fries', price: 4.50, category: 'Sides' },
    { _id: '5', name: 'Coke', price: 2.00, category: 'Beverages' },
    { _id: '6', name: 'Cheesecake', price: 6.50, category: 'Desserts' }
  ];

  const handleAddToCart = (menuItem) => {
    dispatch(addItem({ menuItem, price: menuItem.price }));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Menu Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        {/* Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Mains', 'Starters', 'Sides', 'Beverages', 'Desserts'].map(cat => (
            <button key={cat} className="px-4 py-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pr-2">
          {menuItems.map(item => (
            <div 
              key={item._id}
              onClick={() => handleAddToCart(item)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all flex flex-col justify-between aspect-square"
            >
              <div className="w-full h-1/2 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">Image</div>
              <div>
                <h4 className="font-semibold text-gray-800 line-clamp-2 leading-tight">{item.name}</h4>
                <p className="text-orange-600 font-bold mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Area */}
      <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Current Order</h3>
          <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">Table 12</span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <p>Cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.menuItem._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{item.menuItem.name}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-3 ml-2">
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => dispatch(removeItem(item.menuItem._id))} className="text-red-500 hover:text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Summary */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={() => dispatch(clearCart())} className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-sm transition-colors">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
