import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/slices/cartSlice';
import apiClient from '../utils/apiClient';

const POS = () => {
  const dispatch = useDispatch();
  const { items, subtotal, tax, total } = useSelector(state => state.cart);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');

  useEffect(() => {
    fetchMenu();
    fetchTables();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await apiClient.get('/menu');
      setMenuItems(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await apiClient.get('/tables');
      setTables(res.data.data || []);
      if(res.data.data && res.data.data.length > 0) {
        setSelectedTable(res.data.data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    }
  };

  const handleAddToCart = (menuItem) => {
    dispatch(addItem({ menuItem, price: menuItem.price }));
  };

  const handleCheckout = async () => {
    if (items.length === 0) return alert("Cart is empty!");
    if (!selectedTable) return alert("Please select a table");
    
    try {
      const orderData = {
        tableId: selectedTable,
        orderType: 'Dine-in',
        items: items.map(i => ({
          menuItemId: i.menuItem._id,
          quantity: i.quantity,
          price: i.price
        })),
        totalAmount: total
      };

      await apiClient.post('/orders', orderData);
      alert("Order successfully sent to kitchen!");
      dispatch(clearCart());
    } catch (error) {
      alert("Failed to submit order.");
    }
  };

  const filteredMenu = activeCategory === 'All' ? menuItems : menuItems.filter(i => i.category === activeCategory);
  const categories = ['All', ...new Set(menuItems.map(i => i.category))];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 p-6 pt-0">
      {/* Menu Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        {/* Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-orange-100 hover:text-orange-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pr-2">
          {filteredMenu.map(item => (
            <div 
              key={item._id}
              onClick={() => handleAddToCart(item)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all flex flex-col justify-between aspect-square"
            >
              <div className="w-full h-1/2 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">Image</div>
              <div>
                <h4 className="font-semibold text-gray-800 line-clamp-2 leading-tight">{item.itemName || item.name}</h4>
                <p className="text-orange-600 font-bold mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          {filteredMenu.length === 0 && <p className="text-gray-500 col-span-full">No items found.</p>}
        </div>
      </div>

      {/* Cart Area */}
      <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Current Order</h3>
          <select 
            className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded outline-none cursor-pointer"
            value={selectedTable}
            onChange={e => setSelectedTable(e.target.value)}
          >
            {tables.map(t => <option key={t._id} value={t._id}>{t.tableNumber}</option>)}
          </select>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
              <p>Cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.menuItem._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{item.menuItem.itemName || item.menuItem.name}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-3 ml-2">
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => dispatch(removeItem(item.menuItem._id))} className="text-red-500 hover:text-red-700">X</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Summary */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (10%)</span><span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={() => dispatch(clearCart())} className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleCheckout} className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-sm transition-colors">Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
