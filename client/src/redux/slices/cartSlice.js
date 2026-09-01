import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { menuItem, quantity, price, notes }
  subtotal: 0,
  tax: 0,
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(i => i.menuItem._id === action.payload.menuItem._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.menuItem._id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
    },
    calculateTotals: (state) => {
      state.subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      state.tax = state.subtotal * 0.1; // 10% tax example
      state.total = state.subtotal + state.tax;
    }
  }
});

export const { addItem, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
