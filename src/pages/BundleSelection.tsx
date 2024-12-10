import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useTab } from "./TabContext";
import toast, { Toaster } from 'react-hot-toast';

interface BundleSelectionProps {
  onComplete: () => void;
}

const BundleSelection: React.FC<BundleSelectionProps> = ({ onComplete }): React.ReactElement => {

  const { setActiveTab } = useTab();

  const handleSubmit = () => {

      onComplete();
      setActiveTab(2); // Move to the next tab

  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <Toaster />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Join Our Gym Demo Session
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Experience the best workout sessions with our professional trainers. Sign up for a demo session and explore our state-of-the-art facilities.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Demo Session Card */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">Demo Session</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Best option to get a feel of our gym and the services we offer.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$20</span>
            </div>
            
            <button
              onClick={handleSubmit}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
            >
              Go to Card Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleSelection;