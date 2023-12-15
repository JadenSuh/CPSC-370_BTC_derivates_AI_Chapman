import React, { useState } from 'react';
import { Header } from './Header.tsx';
import { Navigation } from './Navigation.tsx';
import { Portfolio } from './Portfolio.tsx';
import { SwapForm } from './SwapForm.tsx';
import { addLiquidity, removeLiquidity, swap } from './amm.tsx';
import { placeOrder, cancelOrder, matchOrders } from './clob.tsx';

const App: React.FC = () => {
  const [reserve, setReserve] = useState({ tokenA: 1000, tokenB: 1000 });
  const [orderBook, setOrderBook] = useState([]);

  const handleAddLiquidity = (amountA, amountB) => {
    const newReserve = addLiquidity(amountA, amountB, reserve);
    setReserve(newReserve);
  };

  const handleRemoveLiquidity = (liquidity) => {
    const { newReserve } = removeLiquidity(liquidity, reserve);
    setReserve(newReserve);
  };

  const handleSwap = (isTokenA, amount) => {
    const { newReserve } = swap(isTokenA, amount, reserve);
    setReserve(newReserve);
  };

  const handlePlaceOrder = (order) => {
    const newOrderBook = placeOrder(order, orderBook);
    setOrderBook(newOrderBook);
  };

  const handleCancelOrder = (id) => {
    const newOrderBook = cancelOrder(id, orderBook);
    setOrderBook(newOrderBook);
  };

  const handleMatchOrders = () => {
    const { newOrderBook } = matchOrders(orderBook);
    setOrderBook(newOrderBook);
  };

  return (
    <div className="App">
      <Header />
      <Navigation />
      <SwapForm onAddLiquidity={handleAddLiquidity} onRemoveLiquidity={handleRemoveLiquidity} onSwap={handleSwap} onPlaceOrder={handlePlaceOrder} onCancelOrder={handleCancelOrder} onMatchOrders={handleMatchOrders} />
      <Portfolio />
    </div>
  );
};

export default App;
