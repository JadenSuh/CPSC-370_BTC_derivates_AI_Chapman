import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import './SwapComponent.css';

// Define your GraphQL mutation
const SWAP_MUTATION = gql`
  mutation Swap($from: String!, $to: String!, $amount: Float!) {
    swap(from: $from, to: $to, amount: $amount) {
      id
      status
    }
  }
`;

function SwapComponent() {
  // State for form inputs and success message
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Apollo's useMutation hook for the swap operation
  const [swap, { data, loading }] = useMutation(SWAP_MUTATION, {
    onCompleted: () => {
      setSuccessMessage('Swap operation was successful!');
    },
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form inputs
    if (!from || !to || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    // Validate amount
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert('Please enter a valid amount greater than zero.');
      return;
    }
    try {
      const response = await swap({ variables: { from, to, amount: amountNumber } });
      // Handle response
      console.log(response);
    } catch (error) {
      // Handle error
      alert(`Swap operation failed: ${error.message}`);
    }
  };

  // Render form with basic styling and success message
  return (
    <div className="form-container">
      <h1>Swap Component</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit} className="form">
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="input">
          <option value="">Select From</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="LTC">LTC</option>
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="input">
          <option value="">Select To</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="LTC">LTC</option>
        </select>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="input" />
        <button type="submit" className="button" disabled={loading}>{loading ? 'Loading...' : 'Swap'}</button>
      </form>
    </div>
  );
}

export default SwapComponent;
