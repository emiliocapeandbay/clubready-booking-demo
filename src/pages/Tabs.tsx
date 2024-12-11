import React, { useState } from "react";
import BundleSelection from "./BundleSelection";
import Complete from "./Complete";
import { useTab } from "./TabContext";
import Locations from "./Locations";
import Booking from "./Booking";
import MemberDetails from "./MemberDetails"

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
        return <Locations onComplete={() => markStepAsCompleted(0)} />;
      case 1:
        return <MemberDetails onComplete={() => markStepAsCompleted(1)} />;
      case 2:
        return <BundleSelection onComplete={() => markStepAsCompleted(2)} />;
      case 3:
        return <Booking onComplete={() => markStepAsCompleted(3)} />;
      case 4:
        return <Complete />;
      default:
        return <MemberDetails onComplete={() => markStepAsCompleted(0)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <div className="w-1/4 bg-[#0a5685] dark:bg-gray-800 p-4">
        {["Location", "Your Information", "Select Service",  "Date & Time", "Payment"].map((label, index) => (
          <button
            key={index}
            className={`relative w-full text-left px-4 py-2 rounded-full mb-2 ${activeTab === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} ${completedSteps.includes(index) ? "border-2 border-[#00cffe]" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <span className="absolute left-0 top-0 ml-2 mt-2 w-6 px-1 h-6 rounded-full bg-white text-[#0a5685] flex items-center justify-center">
              {index + 1}
            </span>
            <h2 className="px-5">{label}</h2>
          </button>
        ))}
      </div>
      <div className="w-3/4 p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;