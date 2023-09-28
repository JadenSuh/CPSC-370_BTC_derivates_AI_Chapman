import React from 'react';
import { Header } from './Header.tsx';
import { Navigation } from './Navigation.tsx';
import { Portfolio } from './Portfolio.tsx';
import { SwapForm } from './SwapForm.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <span></span>
      <Navigation />
      <Navigation />
      <SwapForm />
      <span></span>
      <SwapForm />
      <Portfolio />
      <span></span>
      <Portfolio />
    </div>
  );
};

export default App;
