import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTab } from "./TabContext";
import toast, { Toaster } from 'react-hot-toast';
import "./custom-datepicker.css"; // Import custom styles

interface BookingProps {
  onComplete: () => void;
}

interface ClassSchedule {
  ClassId: number;
  ScheduleId: number;
  ClubId: number;
  Date: string;
  Title: string;
  StartTime: string;
  EndTime: string;
  CanDirectlyBookPublic: boolean;
  FreeSpots: number;
  MaxSpots: number;
}

const Booking: React.FC<BookingProps> = ({ onComplete }) => {
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(Date.UTC(2019, 11, 31)));
  const [selectedClassSchedule, setSelectedClassSchedule] = useState<{ ClassId: number, ScheduleId: number } | null>(null);
  const { setActiveTab } = useTab();

  useEffect(() => {
    if (selectedDate) {
      const fetchClassSchedules = async () => {
        try {
          const fromDate = new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          const toDate = new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          const response = await fetch(`https://clubready.com/api/current/scheduling/class-schedule?ApiKey=a16bc485-5b21-4277-9564-7bf4474dfc92&StoreID=2670&FromDate=${fromDate}&ToDate=${toDate}`, {
            headers: {
              'Accept': 'application/json'
            }
          });
          const data = await response.json();
          setClassSchedules(data);
        } catch (error) {
          toast.error("Failed to fetch class schedules.");
        }
      };

      fetchClassSchedules();
    }
  }, [selectedDate]);

  const handleSelectBundle = (classId: number, scheduleId: number) => {
    const selectedSchedule = { ClassId: classId, ScheduleId: scheduleId };
    localStorage.setItem("selectedClassSchedule", JSON.stringify(selectedSchedule));
    setSelectedClassSchedule(selectedSchedule);
    toast.success("Bundle selected successfully!");
    onComplete();
    setActiveTab(4);
  };

  const handleRemoveSelection = () => {
    localStorage.removeItem("selectedClassSchedule");
    setSelectedClassSchedule(null);
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Book Your Demo Session</h1>
        <p className="mb-6 text-gray-500 dark:text-gray-400">Select a date and time slot for your demo session.</p>
        {selectedClassSchedule ? (
          classSchedules
            .filter(schedule => schedule.ClassId === selectedClassSchedule.ClassId && schedule.ScheduleId === selectedClassSchedule.ScheduleId)
            .map(schedule => (
              <div key={`${schedule.ClassId}-${schedule.ScheduleId}`} className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">{schedule.Title}</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {schedule.Date} from {schedule.StartTime} to {schedule.EndTime}
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">{schedule.FreeSpots}</span>
                  <span className="text-gray-500 dark:text-gray-400">spots available</span>
                </div>
                <button
                  onClick={handleRemoveSelection}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-red-900"
                >
                  Clear Selection
                </button>
              </div>
            ))
        ) : (
          <>
            <div className="mb-4 w-full">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                openToDate={new Date(Date.UTC(2019, 11, 31))}
                inline
                calendarClassName="custom-datepicker"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
              {classSchedules.map(schedule => (
                <div key={`${schedule.ClassId}-${schedule.ScheduleId}`} className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                  <h3 className="mb-4 text-2xl h-[90px] font-semibold">{schedule.Title}</h3>
                  <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    {schedule.Date} from {schedule.StartTime} to {schedule.EndTime}
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">{schedule.FreeSpots}</span>
                    <span className="text-gray-500 dark:text-gray-400">spots available</span>
                  </div>
                  <button
                    onClick={() => handleSelectBundle(schedule.ClassId, schedule.ScheduleId)}
                    className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
                  >
                    Select Bundle
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Booking;