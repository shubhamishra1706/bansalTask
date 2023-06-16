import React from 'react';
import Produts from './Produts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import Checkout from './Checkout';
import NavBar from './NavBar';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Produts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
