import React, { useState, useEffect } from "react";

const Complete: React.FC = (): React.ReactElement => {
  const [storedInfo, setStoredInfo] = useState<any>(null);

  useEffect(() => {
    const selectedClassSchedule = localStorage.getItem("selectedClassSchedule");
    const cardNumber = localStorage.getItem("cardNumber");
    const expiryDate = localStorage.getItem("expiryDate");
    const cvv = localStorage.getItem("cvv");
    const memberDetails = {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
    };
    const selectedBundle = localStorage.getItem("selectedBundle");

    setStoredInfo({
      selectedClassSchedule: selectedClassSchedule ? JSON.parse(selectedClassSchedule) : null,
      cardNumber,
      expiryDate,
      cvv,
      memberDetails,
      selectedBundle: selectedBundle ? JSON.parse(selectedBundle) : null,
    });
  }, []);

  const handleSubmit = () => {
    // Mock API call
    console.log("Submitting info:", storedInfo);
    alert("Info submitted successfully!");
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        {storedInfo && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stored Information</h2>
            <p className="text-gray-500 dark:text-gray-400">Member Details:</p>
            <p className="text-gray-500 dark:text-gray-400">First Name: {storedInfo.memberDetails.firstName}</p>
            <p className="text-gray-500 dark:text-gray-400">Last Name: {storedInfo.memberDetails.lastName}</p>
            <p className="text-gray-500 dark:text-gray-400">Email: {storedInfo.memberDetails.email}</p>
            <p className="text-gray-500 dark:text-gray-400">Phone: {storedInfo.memberDetails.phone}</p>
            <p className="text-gray-500 dark:text-gray-400">Class Schedule: {JSON.stringify(storedInfo.selectedClassSchedule)}</p>
            <p className="text-gray-500 dark:text-gray-400">Bundle: {JSON.stringify(storedInfo.selectedBundle)}</p>
            <p className="text-gray-500 dark:text-gray-400">Card Number: {storedInfo.cardNumber}</p>
            <p className="text-gray-500 dark:text-gray-400">Expiry Date: {storedInfo.expiryDate}</p>
            <p className="text-gray-500 dark:text-gray-400">CVV: {storedInfo.cvv}</p>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Submit Info
        </button>
      </div>
    </div>
  );
};

export default Complete;