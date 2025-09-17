// components/AccurateThailandMap.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AccurateThailandMap = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const airplaneMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (mapInstanceRef.current) {
      return;
    }

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
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "วัดพระแก้ว",
            afternoon: "พระบรมมหาราชวัง",
            evening: "เจ้าพระยาริเวอร์ครุยส์",
          },
          {
            day: "วันที่ 2",
            morning: "วัดอรุณ",
            afternoon: "ตลาดน้ำดำเนินสะดวก",
            evening: "สยามพารากอน",
          },
          {
            day: "วันที่ 3",
            morning: "ตลาดจตุจักร",
            afternoon: "ศูนย์การค้าเซ็นทรัลเวิลด์",
            evening: "ถนนข้าวสาร",
          },
        ],
      },
      {
        id: 2,
        name: "เชียงใหม่",
        type: "cultural",
        coordinates: [18.7883, 98.9853],
        description: "ศูนย์กลางวัฒนธรรมล้านนา",
        color: "#ff7800",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "วัดพระธาตุดอยสุเทพ",
            afternoon: "เมืองเก่าเชียงใหม่",
            evening: "ถนนคนเดินวันเสาร์",
          },
          {
            day: "วันที่ 2",
            morning: "ตลาดวโรรส",
            afternoon: "วัดเจดีย์หลวง",
            evening: "ไนท์บาซาร์",
          },
          {
            day: "วันที่ 3",
            morning: "ดอยสุเทพ-ปุย",
            afternoon: "หมู่บ้านหม้ง",
            evening: "ถนนนิมมานเหมินท์",
          },
        ],
      },
      {
        id: 3,
        name: "ภูเก็ต",
        type: "tourism",
        coordinates: [7.8804, 98.3923],
        description: "จังหวัดท่องเที่ยวชื่อดัง",
        color: "#0080ff",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "หาดป่าตอง",
            afternoon: "วิวพอยต์กะตะ",
            evening: "บังลาโร๊ด",
          },
          {
            day: "วันที่ 2",
            morning: "เกาะพีพี",
            afternoon: "มายาเบย์",
            evening: "ผีผีไอส์แลนด์",
          },
          {
            day: "วันที่ 3",
            morning: "หาดกะรน",
            afternoon: "ราไวย์",
            evening: "ตลาดน้ำภูเก็ต",
          },
        ],
      },
      {
        id: 4,
        name: "พัทยา",
        type: "tourism",
        coordinates: [12.9236, 100.8825],
        description: "เมืองท่องเที่ยวระดับโลก",
        color: "#0080ff",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "เกาะล้าน",
            afternoon: "หาดแสมสาร",
            evening: "วอล์กกิ้งสตรีท",
          },
          {
            day: "วันที่ 2",
            morning: "สวนนงนุช",
            afternoon: "ตลาดน้ำสี่ภาค",
            evening: "ช้อปปิ้งเซ็นทรัลเฟสติวัล",
          },
          {
            day: "วันที่ 3",
            morning: "วัดใหญ่ชัยมงคล",
            afternoon: "เขาพระตำหนัก",
            evening: "ถนนคนเดินพัทยา",
          },
        ],
      },
      {
        id: 5,
        name: "อยุธยา",
        type: "historical",
        coordinates: [14.3692, 100.5877],
        description: "อดีตราชธานีสยาม",
        color: "#8B4513",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "วัดมหาธาตุ",
            afternoon: "วัดพระศรีสรรเพชญ์",
            evening: "ตลาดน้ำอยุธยา",
          },
          {
            day: "วันที่ 2",
            morning: "พระราชวังบางปะอิน",
            afternoon: "วัดไชยวัฒนาราม",
            evening: "ล่องเรือเจ้าพระยา",
          },
        ],
      },
      {
        id: 6,
        name: "เกาะสมุย",
        type: "tourism",
        coordinates: [9.5018, 100.0218],
        description: "เกาะแห่งมะพร้าว",
        color: "#0080ff",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "หาดเฉวง",
            afternoon: "วัดพระใหญ่",
            evening: "ฟิชเชอร์แมนส์วิลเลจ",
          },
          {
            day: "วันที่ 2",
            morning: "เกาะเต่า",
            afternoon: "เกาะนางยวน",
            evening: "หาดละไม",
          },
          {
            day: "วันที่ 3",
            morning: "น้ำตกนาเมือง",
            afternoon: "ชุมชนมุสลิม",
            evening: "ถนนคนเดินหาดเฉวง",
          },
        ],
      },
      {
        id: 7,
        name: "กระบี่",
        type: "tourism",
        coordinates: [8.0863, 98.9063],
        description: "หาดทรายขาวและหน้าผาหินปูน",
        color: "#0080ff",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "หาดไร่เลย์",
            afternoon: "ถ้ำพระนาง",
            evening: "หาดอ่าวนาง",
          },
          {
            day: "วันที่ 2",
            morning: "เกาะพีพี",
            afternoon: "ไวกิ้งเคฟ",
            evening: "หาดลองบีช",
          },
          {
            day: "วันที่ 3",
            morning: "ถ้ำมรกต",
            afternoon: "เกาะห้อง",
            evening: "ตลาดเย็นกระบี่",
          },
        ],
      },
      {
        id: 8,
        name: "ขอนแก่น",
        type: "regional",
        coordinates: [16.4419, 102.8359],
        description: "ศูนย์กลางภาคอีสาน",
        color: "#32CD32",
        itinerary: [
          {
            day: "วันที่ 1",
            morning: "บึงแก่นนคร",
            afternoon: "ศิลาแลง",
            evening: "ตลาดต้นตาล",
          },
          {
            day: "วันที่ 2",
            morning: "วัดเทพ",
            afternoon: "พิพิธภัณฑ์ขอนแก่น",
            evening: "ถนนคนเดินขอนแก่น",
          },
        ],
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

      const airplane = L.marker(startCoords, { icon: airplaneIcon }).addTo(map);
      airplaneMarkerRef.current = airplane;

      const angle =
        (Math.atan2(
          targetCoords[0] - startCoords[0],
          targetCoords[1] - startCoords[1]
        ) *
          180) /
        Math.PI;

      let progress = 0;
      const duration = 3000;
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

        // หมุนเครื่องบิน
        const airplaneElement = airplane.getElement();
        if (airplaneElement) {
          airplaneElement.style.transform = `translate(-50%, -50%) rotate(${
            angle + progress * 360
          }deg)`;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
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

    window.selectLocation = (locationId) => {
      const selectedArea = importantAreas.find(
        (area) => area.id === locationId
      );
      if (selectedArea && onLocationSelect) {
        onLocationSelect(selectedArea);
        startAirplaneAnimation(selectedArea.coordinates);
      }
    };

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
      if (window.selectLocation) {
        delete window.selectLocation;
      }
    };
  }, [onLocationSelect, isAnimating]);

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

export default AccurateThailandMap;
