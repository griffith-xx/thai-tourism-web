'use client';

import { useState } from 'react';
import { Search, MapPin, Clock, Star, Heart, Filter, User, Calendar, DollarSign, Camera, Navigation, Waves, Mountain, Building, TreePine, Users, Baby, Accessibility } from 'lucide-react';

// Mock Data
const mockDestinations = [
  {
    id: 1,
    name: "หาดไร่เลย์",
    nameEn: "Railay Beach",
    province: "กระบี่",
    category: "ชายหาด",
    rating: 4.8,
    price: "฿฿",
    image: "https://s359.kapook.com/pagebuilder/9d8242cd-e5d3-473a-a4ce-a340f3207675.jpg",
    tags: ["ทะเล", "ปีนผา", "โรงแรมหรู"],
    distance: "2.5 กม.",
    openTime: "24 ชั่วโมง",
    description: "หาดทรายขาวที่สวยที่สุดในกระบี่ เหมาะสำหรับการพักผ่อนและกีฬาทางน้ำ"
  },
  {
    id: 2,
    name: "วัดพระแก้ว",
    nameEn: "Wat Phra Kaew",
    province: "กรุงเทพฯ",
    category: "วัด",
    rating: 4.9,
    price: "฿",
    image: "https://cms.dmpcdn.com/travel/2021/08/06/f6bee040-f690-11eb-8d2d-519418dcfda4_original.jpg",
    tags: ["วัด", "พระราชวัง", "ประวัติศาสตร์"],
    distance: "15 กม.",
    openTime: "08:30 - 15:30",
    description: "วัดที่สำคัญที่สุดของประเทศไทย ตั้งอยู่ในพระบรมมหาราชวัง"
  },
  {
    id: 3,
    name: "อุทยานแห่งชาติเขาใหญ่",
    nameEn: "Khao Yai National Park",
    province: "นครราชสีมา",
    category: "ธรรมชาติ",
    rating: 4.7,
    price: "฿฿",
    image: "https://mpics.mgronline.com/pics/Images/564000010482201.JPEG",
    tags: ["ป่า", "น้ำตก", "สัตว์ป่า"],
    distance: "180 กม.",
    openTime: "06:00 - 18:00",
    description: "อุทยานแห่งชาติที่ใหญ่ที่สุดในประเทศไทย มีธรรมชาติที่อุดมสมบูรณ์"
  },
  {
    id: 4,
    name: "ตลาดน้ำดำเนินสะดวก",
    nameEn: "Damnoen Saduak Floating Market",
    province: "ราชบุรี",
    category: "ตลาด",
    rating: 4.3,
    price: "฿฿",
    image: "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsbKFfTBhbnJ29nvkMh0CXoaBPslAHkkUd52iMrv8vGxA6mo2vAsX0Y.webp",
    tags: ["ตลาดน้ำ", "อาหาร", "ผลไม้"],
    distance: "100 กม.",
    openTime: "07:00 - 17:00",
    description: "ตลาดน้ำที่มีชื่อเสียงระดับโลก เต็มไปด้วยอาหารและผลไม้สด"
  }, {
    id: 5,
    name: "หาดป่าตอง",
    nameEn: "Patong Beach",
    province: "ภูเก็ต",
    category: "ชายหาด",
    rating: 4.5,
    price: "฿฿฿",
    image: "https://cms.dmpcdn.com/travel/2021/03/17/b2b4a750-86d2-11eb-a403-33d334b99f04_original.jpg",
    tags: ["ทะเล", "ไนท์ไลฟ์", "ช็อปปิ้ง", "สปา"],
    distance: "12 กม.",
    openTime: "24 ชั่วโมง",
    description: "ชายหาดที่มีชีวิตชีวาที่สุดในภูเก็ต มีกิจกรรมหลากหลายทั้งกลางวันและกลางคืน"
  },
  {
    id: 6,
    name: "วัดพระศรีสรรเพชญ์",
    nameEn: "Wat Phra Si Sanphet",
    province: "อยุธยา",
    category: "วัด",
    rating: 4.6,
    price: "฿",
    image: "https://cbtthailand.dasta.or.th/upload-file-api/Resources/RelateAttraction/Images/RAT140093/1.jpeg",
    tags: ["วัด", "อยุธยา", "ประวัติศาสตร์", "มรดกโลก"],
    distance: "80 กม.",
    openTime: "08:00 - 18:00",
    description: "วัดที่สำคัญของกรุงศรีอยุธยา มีพระปรางค์โบราณที่งดงาม"
  },
  {
    id: 7,
    name: "ดอยสุเทพ",
    nameEn: "Doi Suthep",
    province: "เชียงใหม่",
    category: "ภูเขา",
    rating: 4.8,
    price: "฿",
    image: "https://www.silpa-mag.com/wp-content/uploads/2024/03/Cover-14.jpg",
    tags: ["ภูเขา", "วัด", "วิวเมือง", "ศักดิ์สิทธิ์"],
    distance: "15 กม.",
    openTime: "06:00 - 20:00",
    description: "ภูเขาศักดิ์สิทธิ์ของเชียงใหม่ มีวิวเมืองที่สวยงามและวัดพระธาตุดอยสุเทพ"
  },
  {
    id: 8,
    name: "ตลาดจตุจักร",
    nameEn: "Chatuchak Weekend Market",
    province: "กรุงเทพฯ",
    category: "ตลาด",
    rating: 4.4,
    price: "฿",
    image: "https://www.mixtchatuchak.com/manage/images/ImageEditorBlog/02062020103432EditorBlog.jpg",
    tags: ["ช็อปปิ้ง", "อาหาร", "ของฝาก", "วีคเอนด์"],
    distance: "25 กม.",
    openTime: "09:00 - 18:00",
    description: "ตลาดนัดขนาดใหญ่ที่สุดในเอเชีย มีสินค้าหลากหลายมากมาย"
  },
  {
    id: 9,
    name: "เกาะพีพี",
    nameEn: "Phi Phi Islands",
    province: "กระบี่",
    category: "ชายหาด",
    rating: 4.9,
    price: "฿฿฿",
    image: "https://cms.dmpcdn.com/travel/2023/04/24/78401d80-e28c-11ed-93fb-db9db47017f6_webp_original.jpg",
    tags: ["เกาะ", "ดำน้ำ", "ทะเลใส", "รีสอร์ท"],
    distance: "45 กม.",
    openTime: "24 ชั่วโมง",
    description: "เกาะในฝันที่มีทะเลใสและชายหาดขาวสวยงาม เหมาะสำหรับดำน้ำ"
  },
  {
    id: 10,
    name: "น้ำตกเอราวัณ",
    nameEn: "Erawan Falls",
    province: "กาญจนบุรี",
    category: "ธรรมชาติ",
    rating: 4.7,
    price: "฿",
    image: "https://www.tripgether.com/wp-content/uploads/tripgetter/900.1-2.jpg",
    tags: ["น้ำตก", "ป่า", "ว่ายน้ำ", "ธรรมชาติ"],
    distance: "130 กม.",
    openTime: "08:00 - 16:30",
    description: "น้ำตก 7 ชั้นที่สวยงาม มีน้ำสีฟ้าใสและสามารถว่ายน้ำได้"
  },
  {
    id: 11,
    name: "วอคกิ้งสตรีท",
    nameEn: "Walking Street Pattaya",
    province: "พัทยา",
    category: "เมือง",
    rating: 4.2,
    price: "฿฿",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/43/44/db/photo0jpg.jpg?w=900&h=500&s=1",
    tags: ["ไนท์ไลฟ์", "บาร์", "ร้านอาหาร", "บันเทิง"],
    distance: "8 กม.",
    openTime: "18:00 - 02:00",
    description: "ถนนคนเดินที่มีชื่อเสียงของพัทยา เต็มไปด้วยร้านอาหารและสถานบันเทิง"
  },
  {
    id: 12,
    name: "วัดร่องขุ่น",
    nameEn: "Wat Rong Khun",
    province: "เชียงราย",
    category: "วัด",
    rating: 4.8,
    price: "฿",
    image: "https://cms.dmpcdn.com/travel/2023/02/08/e8434100-a774-11ed-921b-b74716496218_webp_original.jpg",
    tags: ["วัดขาว", "ศิลปะ", "สถาปัตยกรรม", "ร่วมสมัย"],
    distance: "200 กม.",
    openTime: "08:00 - 17:00",
    description: "วัดสีขาวที่มีสถาปัตยกรรมแปลกตาและงดงาม ผลงานของอาจารย์เฉลิมชัย"
  },
  {
    id: 13,
    name: "ทะเลสาบสงขลา",
    nameEn: "Songkhla Lake",
    province: "สงขลา",
    category: "ธรรมชาติ",
    rating: 4.3,
    price: "฿",
    image: "https://www.ecocar.co.th/upload/2074712244.jpg",
    tags: ["ทะเลสาบ", "ตกปลา", "ชมพระอาทิตย์", "เรือยาว"],
    distance: "950 กม.",
    openTime: "24 ชั่วโมง",
    description: "ทะเลสาบจืดที่ใหญ่ที่สุดในประเทศไทย มีวิถีชีวิตชาวประมงแบบดั้งเดิม"
  },
  {
    id: 14,
    name: "ปราสาทหินพิมาย",
    nameEn: "Phimai Historical Park",
    province: "นครราชสีมา",
    category: "วัด",
    rating: 4.5,
    price: "฿",
    image: "https://cms.dmpcdn.com/travel/2020/10/28/48226de0-18e7-11eb-ab84-d705c02e81b2_original.jpg",
    tags: ["ขอม", "ประวัติศาสตร์", "โบราณคดี", "มรดกโลก"],
    distance: "210 กม.",
    openTime: "08:30 - 18:00",
    description: "ปราสาทหินขอมโบราณที่สวยงาม เป็นแหล่งเรียนรู้ประวัติศาสตร์"
  },
  {
    id: 15,
    name: "หาดหัวหิน",
    nameEn: "Hua Hin Beach",
    province: "ประจวบคีรีขันธ์",
    category: "ชายหาด",
    rating: 4.4,
    price: "฿฿",
    image: "https://cms.dmpcdn.com/travel/2023/04/18/90180920-ddca-11ed-b584-35f62a59690c_webp_original.jpg",
    tags: ["ทะเล", "พระราชวัง", "ม้า", "กอล์ฟ"],
    distance: "200 กม.",
    openTime: "24 ชั่วโมง",
    description: "ชายหาดที่เป็นที่พักผ่อนของพระราชวงศ์ มีชายหาดยาวและกิจกรรมหลากหลาย"
  },
  {
    id: 16,
    name: "อุทยานแห่งชาติดอยอินทนนท์",
    nameEn: "Doi Inthanon National Park",
    province: "เชียงใหม่",
    category: "ภูเขา",
    rating: 4.6,
    price: "฿฿",
    image: "https://cms.dmpcdn.com/travel/2021/11/05/ea0ab760-3e1c-11ec-9f41-f5429bd5d430_original.jpg",
    tags: ["ภูเขา", "หมอก", "น้ำตก", "ยอดสูงสุด"],
    distance: "60 กม.",
    openTime: "05:30 - 18:30",
    description: "ยอดเขาสูงสุดในประเทศไทย มีอากาศหนาวและทิวทัศน์ที่สวยงาม"
  },
  {
    id: 17,
    name: "เกาะล้าน",
    nameEn: "Koh Larn",
    province: "พัทยา",
    category: "ชายหาด",
    rating: 4.5,
    price: "฿฿",
    image: "https://cms.dmpcdn.com/travel/2025/02/14/a4b89d80-ea8f-11ef-9f12-4d183de11f96_webp_original.webp",
    tags: ["เกาะ", "ทะเลใส", "กีฬาทางน้ำ", "วันเดียว"],
    distance: "7 กม.",
    openTime: "24 ชั่วโมง",
    description: "เกาะสวยงามใกล้พัทยา เหมาะสำหรับทริปวันเดียวและกีฬาทางน้ำ"
  },
  {
    id: 18,
    name: "ตลาดอัมพวา",
    nameEn: "Amphawa Floating Market",
    province: "สมุทรสงคราม",
    category: "ตลาด",
    rating: 4.4,
    price: "฿",
    image: "https://cms.dmpcdn.com/travel/2022/02/28/06c10d40-9855-11ec-9037-bf7933f54c79_webp_original.jpg",
    tags: ["ตลาดน้ำ", "อาหารทะเล", "โรงแรมริมน้ำ", "หิ่งห้อย"],
    distance: "70 กม.",
    openTime: "12:00 - 20:00",
    description: "ตลาดน้ำยามเย็นที่มีอาหารอร่อยและสามารถชมหิ่งห้อยได้"
  }
];

const mockCategories = [
  { id: 1, name: "ชายหาด", icon: <Waves className="w-6 h-6" />, count: 5 },
  { id: 2, name: "วัด", icon: <Building className="w-6 h-6" />, count: 4 },
  { id: 3, name: "ธรรมชาติ", icon: <TreePine className="w-6 h-6" />, count: 3 },
  { id: 4, name: "ภูเขา", icon: <Mountain className="w-6 h-6" />, count: 2 },
  { id: 5, name: "เมือง", icon: <Building className="w-6 h-6" />, count: 1 },
  { id: 6, name: "ตลาด", icon: <Users className="w-6 h-6" />, count: 3 }
];

const mockProvinces = [
  "กรุงเทพฯ", "กระบี่", "นครราชสีมา", "ราชบุรี", "เชียงใหม่", "ภูเก็ต", "พัทยา", "อยุธยา"
];

const TravelRecommendationApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [currentTab, setCurrentTab] = useState('search');
  const [budget, setBudget] = useState([1000, 10000]);
  const [companions, setCompanions] = useState('');
  const [accessibility, setAccessibility] = useState(false);

  const filteredDestinations = mockDestinations.filter(dest => {
    const matchesSearch = !searchQuery ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || dest.category === selectedCategory;
    const matchesProvince = !selectedProvince || dest.province === selectedProvince;

    return matchesSearch && matchesCategory && matchesProvince;
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const DestinationCard = ({ destination }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleFavorite(destination.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${favorites.has(destination.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {destination.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{destination.name}</h3>
            <p className="text-sm text-gray-500">{destination.province}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {destination.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{destination.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{destination.openTime}</span>
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-600">
            {destination.price}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">ThaiTravel</h1>
              <p className="text-sm text-gray-500">ค้นพบที่เที่ยวในฝัน</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาสถานที่ท่องเที่ยว เช่น 'ทะเล สปา ราคาถูก'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              ตัวกรอง
            </button>

            {mockCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === category.name
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
              <h3 className="text-lg font-semibold mb-4">ตัวกรองขั้นสูง</h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Province Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">จังหวัด</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">ทุกจังหวัด</option>
                    {mockProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    งงบประมาณ: ฿{budget[0].toLocaleString()} - ฿{budget[1].toLocaleString()}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="500"
                      max="50000"
                      value={budget[0]}
                      onChange={(e) => setBudget([parseInt(e.target.value), budget[1]])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Companions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เดินทางกับ</label>
                  <select
                    value={companions}
                    onChange={(e) => setCompanions(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกกลุ่มเดินทาง</option>
                    <option value="solo">เดินทางคนเดียว</option>
                    <option value="couple">คู่รัก</option>
                    <option value="family">ครอบครัว</option>
                    <option value="friends">เพื่อนๆ</option>
                  </select>
                </div>

                {/* Accessibility */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={accessibility}
                      onChange={(e) => setAccessibility(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Accessibility className="w-4 h-4" />
                    เข้าถึงได้สำหรับผู้พิการ
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              สถานที่แนะนำสำหรับคุณ
            </h2>
            <p className="text-gray-600">
              พบ {filteredDestinations.length} สถานที่ที่ตรงกับการค้นหา
              {searchQuery && ` "${searchQuery}"`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>เรียงตามความนิยม</option>
              <option>เรียงตามคะแนน</option>
              <option>เรียงตามระยะทาง</option>
              <option>เรียงตามราคา</option>
            </select>
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Load More */}
        {filteredDestinations.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              โหลดเพิ่มเติม
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบสถานที่ที่ตรงกับการค้นหา</h3>
            <p className="text-gray-600 mb-4">ลองเปลี่ยนคำค้นหาหรือปรับตัวกรองใหม่</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSelectedProvince('');
                setShowFilters(false);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: 'search', icon: Search, label: 'ค้นหา' },
            { id: 'favorites', icon: Heart, label: 'รายการโปรด' },
            { id: 'trips', icon: Calendar, label: 'ทริป' },
            { id: 'profile', icon: User, label: 'โปรไฟล์' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center p-2 ${currentTab === item.id ? 'text-blue-600' : 'text-gray-400'
                }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default TravelRecommendationApp;