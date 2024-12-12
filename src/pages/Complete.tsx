import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Complete: React.FC = (): React.ReactElement => {
  const [storedInfo, setStoredInfo] = useState<any>(null);

  useEffect(() => {
    const selectedClassSchedule = localStorage.getItem("selectedClassSchedule");
    const memberDetails = {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
    };
    const selectedBundle = localStorage.getItem("selectedBundle");

    setStoredInfo({
      selectedClassSchedule: selectedClassSchedule ? JSON.parse(selectedClassSchedule) : null,
      memberDetails,
      selectedBundle: selectedBundle ? JSON.parse(selectedBundle) : null,
    });
  }, []);

  const handleSubmit = async () => {
    if (!storedInfo || !storedInfo.selectedClassSchedule || !storedInfo.memberDetails || !storedInfo.selectedBundle) {
      toast.error("Please select all data previous to submit");
      return;
    }

    try {
      // Create prospect
      const prospectResponse = await fetch(`https://clubready.com/api/current/users/prospect?ApiKey=a16bc485-5b21-4277-9564-7bf4474dfc92&StoreId=2670&FirstName=${storedInfo.memberDetails.firstName}&LastName=${storedInfo.memberDetails.lastName}&Email=${storedInfo.memberDetails.email}&SendEmail=false`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({})
      });

      const prospectData = await prospectResponse.json();

      if (prospectData.Success) {
        const userId = prospectData.UserId;

        // Book class
        const bookingResponse = await fetch(`https://clubready.com/api/current/scheduling/class-booking?ApiKey=a16bc485-5b21-4277-9564-7bf4474dfc92&UserId=${userId}&StoreId=2670&ScheduleId=${storedInfo.selectedClassSchedule.ScheduleId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({})
        });

        const bookingData = await bookingResponse.json();

        if (bookingData.BookingId && bookingData.BookingId !== -1) {
          toast.success(`Booking successful! Booking ID: ${bookingData.BookingId}`);
        } else if (bookingData.BookingId === -1) {
          toast.error(`Booking failed: ${bookingData.Message}`);
        } else {
          toast.error(`Booking failed: ${bookingData.Message}`);
        }
      } else {
        toast.error(`Prospect creation failed: ${prospectData.Message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        {storedInfo && storedInfo.selectedClassSchedule  && storedInfo.memberDetails && storedInfo.selectedBundle ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stored Information</h2>
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Member Details</h3>
              <p className="text-gray-500 dark:text-gray-400">First Name: {storedInfo.memberDetails.firstName}</p>
              <p className="text-gray-500 dark:text-gray-400">Last Name: {storedInfo.memberDetails.lastName}</p>
              <p className="text-gray-500 dark:text-gray-400">Email: {storedInfo.memberDetails.email}</p>
              <p className="text-gray-500 dark:text-gray-400">Phone: {storedInfo.memberDetails.phone}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Class Schedule</h3>
              <p className="text-gray-500 dark:text-gray-400">Date: {storedInfo.selectedClassSchedule.Date}</p>
              <p className="text-gray-500 dark:text-gray-400">Time: {storedInfo.selectedClassSchedule.StartTime} - {storedInfo.selectedClassSchedule.EndTime}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Bundle</h3>
              <p className="text-gray-500 dark:text-gray-400">Name: {storedInfo.selectedBundle.Name}</p>
              <p className="text-gray-500 dark:text-gray-400">Price: ${parseFloat(storedInfo.selectedBundle.Price).toFixed(2)}</p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit Info
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Go Back and Choose your options</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complete;