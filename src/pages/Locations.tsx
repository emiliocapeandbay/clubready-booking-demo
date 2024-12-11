import React, { useState, useEffect, useRef } from "react";
import { useTab } from "./TabContext";
import toast, { Toaster } from 'react-hot-toast';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW9ydGVnYWEiLCJhIjoiY200azQ2aGF2MGt3ejJscG50cmJ6amN4YyJ9.GTSb2Q0AnTpfXswyiMFiSQ';

interface LocationsProps {
  onComplete: () => void;
}

const Locations: React.FC<LocationsProps> = ({ onComplete }): React.ReactElement => {
  const [location, setLocation] = useState("2670");
  const [storeId, setStoreId] = useState("2670");
  const { setActiveTab } = useTab();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    const storedStoreId = localStorage.getItem("storeId");

    if (storedLocation) setLocation(storedLocation);
    if (storedStoreId) setStoreId(storedStoreId);
  }, []);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-95.45993454320488, 29.748353701159573], // Coordinates for 713 Post Oak Blvd, Houston, TX 77056, United States
        zoom: 15,
      });

      new mapboxgl.Marker({
        element: document.createElement('div'),
        anchor: 'bottom',
      })
        .setLngLat([-95.45993454320488, 29.748353701159573])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Gym Location'))
        .addTo(map);

      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.style.backgroundImage = 'url(https://img.icons8.com/ios-filled/50/000000/dumbbell.png)';
      markerElement.style.width = '50px';
      markerElement.style.height = '50px';
      markerElement.style.backgroundSize = '100%';

      new mapboxgl.Marker(markerElement)
        .setLngLat([-95.45993454320488, 29.748353701159573])
        .addTo(map);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("location", location);
    localStorage.setItem("storeId", storeId);

    toast.success("Information saved successfully!");

    onComplete();
    setActiveTab(1);
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center w-full">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        <div className="w-full md:w-1/2 h-[100vh] bg-cover bg-center">
          <div ref={mapContainerRef} className="w-full h-full"></div>
        </div>
        <div className="w-full md:w-1/2 h-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
              Location and Store ID
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
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Continue
              </button>
            </form>
            <div className="mt-6 text-gray-900 dark:text-white">
              <p><strong>Located in:</strong> Post Oak Plaza</p>
              <p><strong>Address:</strong> 1713 Post Oak Blvd, Houston, TX 77056, United States</p>
              <p><strong>Hours:</strong> Open ⋅ Closes 8 PM</p>
              <p><strong>Phone:</strong> +1 713-324-9241</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;