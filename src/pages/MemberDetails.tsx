import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useTab } from "./TabContext";

interface MemberDetailsProps {
  onComplete: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ onComplete }): React.ReactElement => {
  const [location, setLocation] = useState("2670");
  const [storeId, setStoreId] = useState("2670");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { setActiveTab } = useTab();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve data from local storage
    const storedLocation = localStorage.getItem("location");
    const storedStoreId = localStorage.getItem("storeId");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");

    if (storedLocation) setLocation(storedLocation);
    if (storedStoreId) setStoreId(storedStoreId);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail) setEmail(storedEmail);
    if (storedPhone) setPhone(storedPhone);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save data to local storage
    localStorage.setItem("location", location);
    localStorage.setItem("storeId", storeId);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    toast.success("Information saved successfully!");

    // Mark step as completed and navigate to the next tab
    onComplete();
    setActiveTab(1);
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center w-full">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        <div
          className="w-full md:w-1/2 h-[100vh] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
        >
          
        </div>
        <div className="w-full md:w-1/2 h-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
              Location and Details
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="2670">2670</option>
                </select>
              </div>
              <div>
                <label htmlFor="storeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Store ID</label>
                <input
                  type="text"
                  id="storeId"
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberDetails;