// pages/index.js หรือ app/page.js
"use client";
import { useState } from "react";
import AccurateThailandMap from "../components/AccurateThailandMap";
import TravelItinerary from "../components/TravelItinerary";

const Page = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleLocationSelect = (location) => {
    // ตรวจสอบว่ามีสถานที่นี้อยู่แล้วหรือไม่
    const isAlreadySelected = selectedLocations.some(
      (loc) => loc.id === location.id
    );
    if (!isAlreadySelected) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleRemoveLocation = (locationId) => {
    setSelectedLocations(
      selectedLocations.filter((loc) => loc.id !== locationId)
    );
  };

  const handleClearAll = () => {
    setSelectedLocations([]);
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      <TravelItinerary
        selectedLocations={selectedLocations}
        onRemoveLocation={handleRemoveLocation}
        onClearAll={handleClearAll}
      />
      <div className="col-span-2">
        <AccurateThailandMap onLocationSelect={handleLocationSelect} />
      </div>
    </div>
  );
};

export default Page;
