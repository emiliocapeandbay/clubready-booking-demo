import React, { useState, useEffect } from "react";
import { useTab } from "./TabContext";
import toast, { Toaster } from 'react-hot-toast';

interface BundleSelectionProps {
  onComplete: () => void;
}

interface Bundle {
  Id: number;
  Name: string;
  CreatedDate: string;
  Price: string;
  IsAutomRenew: boolean;
  ModifedDate: string;
  ModifiedBy: number;
  IsAddon: boolean;
  MustBeMember: boolean;
  MustBeNonMember: boolean;
  AmenitiesOptional: boolean;
}

const BundleSelection: React.FC<BundleSelectionProps> = ({ onComplete }): React.ReactElement => {
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const { setActiveTab } = useTab();

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        const response = await fetch('https://clubready.com/api/current/sales/package/276004?ApiKey=a16bc485-5b21-4277-9564-7bf4474dfc92&StoreId=2670', {
          headers: {
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        setBundle(data);
      } catch (error) {
        toast.error("Failed to fetch bundle.");
      }
    };

    fetchBundle();

    const storedBundle = localStorage.getItem("selectedBundle");
    if (storedBundle) {
      setBundle(JSON.parse(storedBundle));
    }
  }, []);

  const handleSelectBundle = (bundle: Bundle) => {
    localStorage.setItem("selectedBundle", JSON.stringify(bundle));
    setBundle(bundle);
    toast.success("Bundle selected successfully!");
    onComplete();
    setActiveTab(3);
  };

  const handleRemoveSelection = () => {
    localStorage.removeItem("selectedBundle");
    setBundle(null);
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
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

            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">{bundle?.Name}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Price: ${parseFloat(bundle?.Price || "0").toFixed(2)}
              </p>
              <button
                onClick={() => handleSelectBundle(bundle!)}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
              >
                Select Bundle
              </button>
            </div>
       
        </div>
      </div>
    </section>
  );
};

export default BundleSelection;