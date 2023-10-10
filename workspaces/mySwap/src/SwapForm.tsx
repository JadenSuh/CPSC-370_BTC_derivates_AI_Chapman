import React, { useState } from "react";

interface SwapFormProps {
  // Props for the swap form
}

const SwapForm: React.FC<SwapFormProps> = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <form className="uniswap-swap-form">
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="">Select From Currency</option>
        <option value="ETH">ETH</option>
        <option value="DAI">DAI</option>
        <option value="USDC">USDC</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="">Select To Currency</option>
        <option value="ETH">ETH</option>
        <option value="DAI">DAI</option>
        <option value="USDC">USDC</option>
      </select>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
      <button type="submit">Swap</button>
    </form>
  );
};

export { SwapForm };
