// components/TravelItinerary.jsx
"use client";

const TravelItinerary = ({
  selectedLocations = [],
  onRemoveLocation,
  onClearAll,
}) => {
  const getLocationIcon = (type) => {
    const icons = {
      capital: "👑",
      cultural: "🏛️",
      tourism: "🏖️",
      historical: "🏯",
      regional: "🏙️",
    };
    return icons[type] || "📍";
  };

  if (selectedLocations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            สร้างแผนการเดินทาง
          </h2>
          <p className="text-gray-500">
            คลิกที่จุดหมายในแผนที่เพื่อเพิ่มเข้าในรายการ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">รายการสถานที่</h1>
            <p className="text-sm text-gray-500">
              {selectedLocations.length} สถานที่
            </p>
          </div>
          {selectedLocations.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              ลบทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* Location List */}
      <div className="p-4 space-y-3">
        {selectedLocations.map((location, index) => (
          <div
            key={location.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <span className="text-2xl">
                  {getLocationIcon(location.type)}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-500">{location.description}</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveLocation(location.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      {selectedLocations.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <div className="flex justify-between">
                <span>จำนวนสถานที่:</span>
                <span className="font-medium">
                  {selectedLocations.length} แห่ง
                </span>
              </div>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium">
              📱 แชร์รายการ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelItinerary;
