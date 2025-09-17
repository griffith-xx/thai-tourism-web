// components/MapComponentInternal.jsx
"use client";
import { useEffect, useRef, useState } from "react";

const MapComponentInternal = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const airplaneMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || mapInstanceRef.current) {
      return;
    }

    // Dynamic import Leaflet เฉพาะเมื่ออยู่ใน client
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current).setView([13.7563, 100.5018], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const importantAreas = [
        {
          id: 1,
          name: "กรุงเทพมหานคร",
          type: "capital",
          coordinates: [13.7563, 100.5018],
          description: "เมืองหลวงและศูนย์กลางเศรษฐกิจ",
          color: "#ff0000",
        },
        {
          id: 2,
          name: "เชียงใหม่",
          type: "cultural",
          coordinates: [18.7883, 98.9853],
          description: "ศูนย์กลางวัฒนธรรมล้านนา",
          color: "#ff7800",
        },
        {
          id: 3,
          name: "ภูเก็ต",
          type: "tourism",
          coordinates: [7.8804, 98.3923],
          description: "จังหวัดท่องเที่ยวชื่อดัง",
          color: "#0080ff",
        },
        {
          id: 4,
          name: "พัทยา",
          type: "tourism",
          coordinates: [12.9236, 100.8825],
          description: "เมืองท่องเที่ยวระดับโลก",
          color: "#0080ff",
        },
        {
          id: 5,
          name: "อยุธยา",
          type: "historical",
          coordinates: [14.3692, 100.5877],
          description: "อดีตราชธานีสยาม",
          color: "#8B4513",
        },
        {
          id: 6,
          name: "เกาะสมุย",
          type: "tourism",
          coordinates: [9.5018, 100.0218],
          description: "เกาะแห่งมะพร้าว",
          color: "#0080ff",
        },
        {
          id: 7,
          name: "กระบี่",
          type: "tourism",
          coordinates: [8.0863, 98.9063],
          description: "หาดทรายขาวและหน้าผาหินปูน",
          color: "#0080ff",
        },
        {
          id: 8,
          name: "ขอนแก่น",
          type: "regional",
          coordinates: [16.4419, 102.8359],
          description: "ศูนย์กลางภาคอีสาน",
          color: "#32CD32",
        },
      ];

      // สร้าง markers สำหรับสถานที่ต่างๆ
      importantAreas.forEach((area) => {
        const iconHtml = getIconHtml(area.type, area.color);

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-marker",
          iconSize: [35, 35],
          iconAnchor: [17.5, 17.5],
        });

        const marker = L.marker(area.coordinates, { icon: customIcon }).addTo(
          map
        );

        marker.on("click", () => {
          if (onLocationSelect) {
            onLocationSelect(area);
          }
          // เริ่ม animation เครื่องบิน
          startAirplaneAnimation(area.coordinates);
        });

        marker.bindPopup(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-lg text-blue-800 mb-1">${area.name}</h3>
            <p class="text-sm text-gray-600 mb-3">${area.description}</p>
            <button 
              onclick="window.selectLocation && window.selectLocation(${area.id})"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded transition-colors"
            >
              ✈️ บินไป
            </button>
          </div>
        `);
      });

      // ฟังก์ชั่น animation เครื่องบิน
      const startAirplaneAnimation = (targetCoords) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // ลบเครื่องบินและเส้นทางเก่า
        if (airplaneMarkerRef.current) {
          map.removeLayer(airplaneMarkerRef.current);
        }
        if (routeLineRef.current) {
          map.removeLayer(routeLineRef.current);
        }

        // จุดเริ่มต้น (กรุงเทพ)
        const startCoords = [13.7563, 100.5018];

        // สร้างเส้นทางบิน
        const routeLine = L.polyline([startCoords, targetCoords], {
          color: "#FF6B6B",
          weight: 3,
          opacity: 0.7,
          dashArray: "10, 10",
        }).addTo(map);
        routeLineRef.current = routeLine;

        // สร้างเครื่องบิน
        const airplaneIcon = L.divIcon({
          html: `
            <div class="airplane-container">
              <div class="airplane">✈️</div>
              <div class="airplane-trail"></div>
            </div>
          `,
          className: "airplane-marker",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const airplane = L.marker(startCoords, { icon: airplaneIcon }).addTo(
          map
        );
        airplaneMarkerRef.current = airplane;

        // คำนวณมุมการบิน
        const angle =
          (Math.atan2(
            targetCoords[0] - startCoords[0],
            targetCoords[1] - startCoords[1]
          ) *
            180) /
          Math.PI;

        // Animation
        let progress = 0;
        const duration = 3000; // 3 วินาที
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          progress = Math.min(elapsed / duration, 1);

          // เส้นทางโค้ง (parabola)
          const lat =
            startCoords[0] + (targetCoords[0] - startCoords[0]) * progress;
          const lng =
            startCoords[1] + (targetCoords[1] - startCoords[1]) * progress;

          // เพิ่มความสูง (curve effect)
          const heightOffset = Math.sin(progress * Math.PI) * 0.5; // ความสูงสูงสุด 0.5 degrees

          airplane.setLatLng([lat + heightOffset, lng]);

          // หมุนเครื่องบิน
          const currentAngle = angle + Math.sin(progress * Math.PI * 2) * 10; // โยกเล็กน้อย
          const element = airplane.getElement();
          if (element) {
            element.style.transform = `rotate(${currentAngle}deg)`;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // เสร็จสิ้น animation
            setTimeout(() => {
              if (airplaneMarkerRef.current) {
                map.removeLayer(airplaneMarkerRef.current);
                airplaneMarkerRef.current = null;
              }
              if (routeLineRef.current) {
                map.removeLayer(routeLineRef.current);
                routeLineRef.current = null;
              }
              setIsAnimating(false);
            }, 1000);
          }
        };

        animate();
      };

      // เริ่ม demo animation ทุก 8 วินาที
      const startDemoAnimation = () => {
        if (isAnimating) return;

        const randomIndex = Math.floor(Math.random() * importantAreas.length);
        const randomLocation = importantAreas[randomIndex];
        startAirplaneAnimation(randomLocation.coordinates);
      };

      // Demo animation interval
      const demoInterval = setInterval(startDemoAnimation, 8000);

      // เริ่ม demo แรกหลังจาก 2 วินาที
      setTimeout(startDemoAnimation, 2000);

      // Global function สำหรับ popup
      if (typeof window !== "undefined") {
        window.selectLocation = (locationId) => {
          const selectedArea = importantAreas.find(
            (area) => area.id === locationId
          );
          if (selectedArea && onLocationSelect) {
            onLocationSelect(selectedArea);
            startAirplaneAnimation(selectedArea.coordinates);
          }
        };
      }

      const legend = L.control({ position: "bottomright" });
      legend.onAdd = function () {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = `
          <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 12px;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold;">✈️ คลิกเพื่อบินไป</h4>
            <div style="margin: 3px 0;"><span style="color: #ff0000;">●</span> เมืองหลวง</div>
            <div style="margin: 3px 0;"><span style="color: #ff7800;">●</span> ศูนย์วัฒนธรรม</div>
            <div style="margin: 3px 0;"><span style="color: #0080ff;">●</span> แหล่งท่องเที่ยว</div>
            <div style="margin: 3px 0;"><span style="color: #8B4513;">●</span> โบราณสถาน</div>
            <div style="margin: 3px 0;"><span style="color: #32CD32;">●</span> ศูนย์ภูมิภาค</div>
          </div>
        `;
        return div;
      };
      legend.addTo(map);

      mapInstanceRef.current = map;

      return () => {
        clearInterval(demoInterval);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        if (typeof window !== "undefined" && window.selectLocation) {
          delete window.selectLocation;
        }
      };
    };

    initMap();
  }, [isClient, onLocationSelect, isAnimating]);

  const getIconHtml = (type, color) => {
    const icons = {
      capital: "👑",
      cultural: "🏛️",
      tourism: "🏖️",
      historical: "🏯",
      regional: "🏙️",
    };

    return `
      <div style="
        background-color: ${color}; 
        color: white; 
        border-radius: 50%; 
        width: 35px; 
        height: 35px; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        font-size: 18px;
        border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        cursor: pointer;
        transition: all 0.2s;
      ">
        ${icons[type] || "📍"}
      </div>
    `;
  };

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดแผนที่...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      <style jsx>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        .custom-marker:hover div {
          transform: scale(1.1);
          box-shadow: 0 5px 12px rgba(0, 0, 0, 0.5) !important;
        }

        .airplane-marker {
          background: none !important;
          border: none !important;
          z-index: 1000;
        }

        .airplane-container {
          position: relative;
          width: 30px;
          height: 30px;
        }

        .airplane {
          font-size: 24px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
          animation: fly 0.5s ease-in-out infinite alternate;
        }

        .airplane-trail {
          position: absolute;
          top: 50%;
          left: -20px;
          width: 20px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 107, 107, 0.8),
            transparent
          );
          transform: translateY(-50%);
          animation: trail 0.3s ease-in-out infinite;
        }

        @keyframes fly {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes trail {
          0% {
            opacity: 0.8;
            width: 15px;
          }
          100% {
            opacity: 0.4;
            width: 25px;
          }
        }

        .leaflet-interactive {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MapComponentInternal;
