import React, { useState } from "react";
import BundleSelection from "./BundleSelection";
import Payment from "./Payment";
import Complete from "./Complete";
import { useTab } from "./TabContext";
import MemberDetails from "./MemberDetails";
import Booking from "./Booking";

const Tabs: React.FC = (): React.ReactElement => {
  const { activeTab, setActiveTab } = useTab();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markStepAsCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <MemberDetails onComplete={() => markStepAsCompleted(0)} />;
      case 1:
        return <BundleSelection onComplete={() => markStepAsCompleted(1)} />;
      case 2:
        return <Payment onComplete={() => markStepAsCompleted(2)} />;
      case 3:
        return <Booking onComplete={() => markStepAsCompleted(3)} />;
      case 4:
        return <Complete />;
      default:
        return <MemberDetails onComplete={() => markStepAsCompleted(0)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-center space-x-4 p-4 bg-white dark:bg-gray-800">
        {["Home", "Bundle Selection", "Credit Card Details", "Booking", "Complete"].map((label, index) => (
          <button
            key={index}
            className={`relative px-4 py-2 rounded-full ${activeTab === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} ${completedSteps.includes(index) ? "border-2 border-green-500" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <span className="absolute left-0 top-0 ml-2 mt-2 w-6 px-1 h-6 rounded-full bg-white text-gray-700 flex items-center justify-center">
              {index + 1}
            </span>
            <h2 className="px-5">{label}</h2>
          </button>
        ))}
      </div>
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;