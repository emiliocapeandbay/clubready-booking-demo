import React, { useState } from "react";
import { useTab } from "./TabContext";
import toast, { Toaster } from 'react-hot-toast';

interface PaymentProps {
  onComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onComplete }): React.ReactElement => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { setActiveTab } = useTab();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save payment details to local storage or process payment
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("expiryDate", expiryDate);
    localStorage.setItem("cvv", cvv);

    toast.success("Payment details saved successfully!");

    onComplete();
    // Navigate to the thank you page
    setActiveTab(3);

  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Payment</h1>
        <p className="mb-6 text-gray-500 dark:text-gray-400">Enter your payment details and submit the process.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;