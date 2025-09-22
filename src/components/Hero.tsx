"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes } from "next/font/google";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const videos = [
  { src: "/hero/room.mp4", text: "Хүндлэл" },
  { src: "/hero/downtown.mp4", text: "Тав тухыг мэдрүүлэн" },
  { src: "/hero/room.mp4", text: "Цаг хугацааг хэмнэх" },
];

interface FormData {
  familyName: string;
  firstName: string;
  phone: string;
  location: string;
  area: string;
  purchasePrice: string;
  contactMethod: {
    call: boolean;
    sms: boolean;
  };
  callPhone: string;
  smsPhone: string;
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  // Loan form popup states
  const [showLoanPopup, setShowLoanPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    familyName: "",
    firstName: "",
    phone: "",
    location: "",
    area: "80",
    purchasePrice: "700,000,000",
    contactMethod: {
      call: false,
      sms: false,
    },
    callPhone: "",
    smsPhone: "",
  });

  const districts = ["Хан-Уул", "Баянзүрх", "Сүхбаатар", "Сонгино-Хайрхан", "Баянгол"];
  const ageRanges = ["80-аас доош", "80-90", "91-100", "101-200"];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();

      if (locked || now - lastScrollTime < 1000 || showLoanPopup) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 10 && index < videos.length - 1) {
        setDirection(1);
        setIndex((prev) => prev + 1);
        setLocked(true);
        setLastScrollTime(now);
      } else if (e.deltaY < -10 && index > 0) {
        setDirection(-1);
        setIndex((prev) => prev - 1);
        setLocked(true);
        setLastScrollTime(now);
      }

      timer = setTimeout(() => {
        setLocked(false);
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (timer) clearTimeout(timer);
    };
  }, [index, locked, lastScrollTime, showLoanPopup]);

  const handleInputChange = (field: keyof FormData, value: string | { call: boolean; sms: boolean }) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactMethodChange = (method: "call" | "sms") => {
    setFormData((prev) => ({
      ...prev,
      contactMethod: {
        ...prev.contactMethod,
        [method]: !prev.contactMethod[method],
      },
    }));
  };

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const errors: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.familyName.trim()) {
      errors.familyName = "Овог оруулна уу";
    }
    if (!formData.firstName.trim()) {
      errors.firstName = "Нэр оруулна уу";
    }

    // Validate contact method
    if (!formData.contactMethod.call && !formData.contactMethod.sms) {
      errors.contactMethod = "Мэдээлэл авах хэлбэрээ сонгоно уу";
    }

    // Validate phone numbers if contact method is selected
    if (formData.contactMethod.call && !formData.callPhone.trim()) {
      errors.callPhone = "Утасны дугаараа оруулна уу";
    }

    if (formData.contactMethod.sms && !formData.smsPhone.trim()) {
      errors.smsPhone = "SMS утасны дугаараа оруулна уу";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setShowLoanPopup(false);
    setShowSuccessPopup(true);
  };

  const closeLoanPopup = () => {
    setShowLoanPopup(false);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const resetForm = () => {
    setFormData({
      familyName: "",
      firstName: "",
      phone: "",
      location: "",
      area: "80",
      purchasePrice: "700,000,000",
      contactMethod: {
        call: false,
        sms: false,
      },
      callPhone: "",
      smsPhone: "",
    });
    setSelectedDistrict("");
    setSelectedAge("");
    setFormErrors({});
    setShowSuccessPopup(false);
  };

  const currentVideo = videos[index];
  if (!currentVideo) return null;

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background video */}
        <div className="fixed inset-0 -z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.video
              key={currentVideo.src}
              src={currentVideo.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 mt-[15vh] h-full flex flex-col justify-between">
          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentVideo.text}
                className="w-full px-8 md:px-16 lg:px-24"
                custom={direction}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex w-full justify-center items-center">
                  {/* --- Зөвхөн md дээш үед харагдана --- */}
                  <div className="hidden md:flex w-full justify-between items-center gap-[40px]">
                    {/* Counter */}
                    <div className="w-[10%] h-[1px] bg-white/30"></div>

                    <div className="text-white flex justify-center items-center text-2xl font-light font-mono flex-shrink-0">
                      <span className="opacity-70">{String(index + 1).padStart(2, "0")}</span>
                      <span className="opacity-30 mx-1">|</span>
                      <span className="opacity-30">{String(videos.length).padStart(2, "0")}</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-white/30"></div>

                    {/* Main Text */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentVideo.text}
                        className="flex-shrink-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <h1
                          className={`text-white text-5xl md:text-7xl lg:text-8xl drop-shadow-lg ${greatVibes.className} whitespace-normal max-w-4xl mx-auto text-center leading-tight`}
                        >
                          {currentVideo.text}
                        </h1>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex-1 h-[1px] bg-white/30"></div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-[40px] flex-shrink-0">
                      <button
                        onClick={() => {
                          if (index > 0) {
                            setDirection(-1);
                            setIndex((prev) => prev - 1);
                          }
                        }}
                        className="p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
                        disabled={index === 0}
                        aria-label="Previous slide"
                      >
                        <FiChevronLeft size={30} />
                      </button>
                      <button
                        onClick={() => {
                          if (index < videos.length - 1) {
                            setDirection(1);
                            setIndex((prev) => prev + 1);
                          }
                        }}
                        className="p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
                        disabled={index === videos.length - 1}
                        aria-label="Next slide"
                      >
                        <FiChevronRight size={30} />
                      </button>
                    </div>

                    <div className="w-[10%] h-[1px] bg-white/30"></div>
                  </div>

                  {/* --- Зөвхөн md-с доош үед харагдана --- */}
                  <div className="block md:hidden w-full text-center">
                    <h1 className={`text-white text-4xl drop-shadow-lg ${greatVibes.className} whitespace-normal leading-tight`}>
                      {currentVideo.text}
                    </h1>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Хүсэлт илгээх товч */}
        </div>
      </section>

      {/* Loan Form Popup */}
      <AnimatePresence>
        {showLoanPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoanPopup}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-orange-500 text-white p-6 text-center relative">
                <button onClick={closeLoanPopup} className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors">
                  <FiX size={24} />
                </button>
                <h1 className="text-2xl font-bold">ХАСБАНК</h1>
                <p className="text-sm opacity-90">Моргэйж</p>
              </div>

              <form onSubmit={handleLoanSubmit} className="p-8">
                {/* Section 1: Personal Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">1 Хувийн мэдээлэл</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Овог: *</label>
                      <input
                        type="text"
                        value={formData.familyName}
                        onChange={(e) => handleInputChange("familyName", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formErrors.familyName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                        }`}
                        required
                      />
                      {formErrors.familyName && <p className="text-red-500 text-xs mt-1">{formErrors.familyName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Нэр: *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formErrors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                        }`}
                        required
                      />
                      {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Утас:</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Утасны дугаар"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Section 2: Property Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">2 Худалдан авах Орон сууцны мэдээлэл</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Байршил:</label>
                        <select
                          value={formData.location}
                          onChange={(e) => {
                            handleInputChange("location", e.target.value);
                            setSelectedDistrict(e.target.value);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Дүүрэг сонгоно уу</option>
                          {districts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Талбайн хэмжээ:</label>
                        <input
                          type="text"
                          value={formData.area}
                          onChange={(e) => handleInputChange("area", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Худалдан авах үнэ:</label>
                        <input
                          type="text"
                          value={formData.purchasePrice}
                          onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Contact Method */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Мэдээлэл авах хэлбэрээ сонгоно уу: *</label>
                        {formErrors.contactMethod && <p className="text-red-500 text-xs mb-2">{formErrors.contactMethod}</p>}

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="call"
                              checked={formData.contactMethod.call}
                              onChange={() => handleContactMethodChange("call")}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor="call" className="text-sm font-medium text-gray-700 min-w-[80px]">
                              Утас
                            </label>
                            <input
                              type="tel"
                              placeholder="Утасны дугаар"
                              value={formData.callPhone}
                              onChange={(e) => handleInputChange("callPhone", e.target.value)}
                              disabled={!formData.contactMethod.call}
                              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                formErrors.callPhone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                              }`}
                            />
                            {formErrors.callPhone && <p className="text-red-500 text-xs mt-1 w-full">{formErrors.callPhone}</p>}
                          </div>

                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="sms"
                              checked={formData.contactMethod.sms}
                              onChange={() => handleContactMethodChange("sms")}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor="sms" className="text-sm font-medium text-gray-700 min-w-[80px]">
                              SMS/Viber
                            </label>
                            <input
                              type="tel"
                              placeholder="SMS (Viber) утасны дугаар"
                              value={formData.smsPhone}
                              onChange={(e) => handleInputChange("smsPhone", e.target.value)}
                              disabled={!formData.contactMethod.sms}
                              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                formErrors.smsPhone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                              }`}
                            />
                            {formErrors.smsPhone && <p className="text-red-500 text-xs mt-1 w-full">{formErrors.smsPhone}</p>}
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Хүсэлт илгээх
                      </button>
                    </div>

                    {/* Right Column - Districts and Age Selection */}
                    <div>
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Дүүрэг:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {districts.map((district) => (
                            <button
                              key={district}
                              type="button"
                              onClick={() => {
                                setSelectedDistrict(district);
                                handleInputChange("location", district);
                              }}
                              className={`px-3 py-2 text-sm border rounded-md transition duration-200 ${
                                selectedDistrict === district
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                              }`}
                            >
                              {district}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Талбайн сонголт:</h3>
                        <div className="space-y-2">
                          {ageRanges.map((range) => (
                            <button
                              key={range}
                              type="button"
                              onClick={() => {
                                setSelectedAge(range);
                                handleInputChange("area", range);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm border rounded-md transition duration-200 ${
                                selectedAge === range
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Хүсэлт илгээх</h3>
                        <p className="text-xs text-gray-600 mb-2">Таны хүсэлт Амжилттай илгээгдлээ.</p>
                        <p className="text-xs text-gray-600 mb-1">Бид Танруу</p>
                        <p className="text-xs text-gray-600 mb-1">(Ажлын өдөр 9:00-17:00 хооронд)</p>
                        <p className="text-xs text-orange-600 font-medium">8001-0218, 8001-0219-аас холбогдох</p>
                        <p className="text-xs text-gray-600">дэлгэрэнгүй мэдээлэл өгөх болно.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSuccessPopup}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {/* Success Icon with Animation */}
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>

                {/* Success Message */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Амжилттай илгээгдлээ! ✨</h3>

                <div className="bg-orange-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    Таны <strong>моргэйжийн хүсэлт</strong> амжилттай бүртгэгдлээ.
                  </p>
                  <p className="text-sm text-orange-600 font-semibold mb-2">📞 Холбогдох утас: 8001-0218, 8001-0219</p>
                  <p className="text-xs text-gray-600">⏰ Ажлын өдөр: 9:00-17:00 хооронд</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={closeSuccessPopup}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Хаах
                  </button>

                  <button
                    onClick={resetForm}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    Шинэ хүсэлт илгээх
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
