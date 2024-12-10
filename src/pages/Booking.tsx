import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTab } from "./TabContext";
import toast, { Toaster } from 'react-hot-toast';
import "./custom-datepicker.css"; // Import custom styles

interface BookingProps {
    onComplete: () => void;
}

const Booking: React.FC<BookingProps> = ({ onComplete }): React.ReactElement => {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { setActiveTab } = useTab();

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
  ];

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = () => {
    if (startDate && selectedSlot) {
      localStorage.setItem("demoDate", startDate.toISOString());
      localStorage.setItem("demoSlot", selectedSlot);
      toast.success("Demo session scheduled successfully!");
      onComplete();
      setActiveTab(4); // Move to the next tab
    } else {
      toast.error("Please select a date and time slot.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Book Your Demo Session</h1>
        <p className="mb-6 text-gray-500 dark:text-gray-400">Select a date and time slot for your demo session.</p>
        {/* Calendar */}
        <div className="mb-4">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 5))}
            inline
            calendarClassName="custom-datepicker"
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Time Slots */}
        <div className="mb-4">
          <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Select a Time Slot</h4>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`p-2 border rounded ${selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} ${!startDate ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}`}
                onClick={() => handleSlotSelection(slot)}
                disabled={!startDate}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default Booking;