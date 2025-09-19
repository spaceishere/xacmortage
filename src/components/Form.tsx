"use client";

import { useState } from "react";

interface FormData {
  familyName: string;
  firstName: string;
  age: string;
  location: string;
  area: string;
  purchasePrice: string;
  contactMethod: {
    call: boolean;
    sms: boolean;
  };
  phone: string;
  smsPhone: string;
}

export default function XacBankLoanForm() {
  const [formData, setFormData] = useState<FormData>({
    familyName: "",
    firstName: "",
    age: "",
    location: "",
    area: "80",
    purchasePrice: "700,000,000",
    contactMethod: {
      call: false,
      sms: false,
    },
    phone: "",
    smsPhone: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const districts = ["Хан-Уул", "Баянзүрх", "Сүхбаатар", "Сонгино-Хайрхан", "Баянгол"];
  const ageRanges = ["80-аас доош", "80-90", "91-100", "101-200"];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">ХАСБАНК</h1>
          <p className="text-sm opacity-90">Моргэйж</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Section 1: Personal Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">1 Хувийн мэдээлэл</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Овог:</label>
                <input
                  type="text"
                  value={formData.familyName}
                  onChange={(e) => handleInputChange("familyName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Нэр:</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Утас:</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
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
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Хан-Уул дүүрэг">Хан-Уул дүүрэг</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">Мэдээлэл авах хэлбэрээ сонгоно уу:</label>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="call"
                        checked={formData.contactMethod.call}
                        onChange={() => handleContactMethodChange("call")}
                        className="mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Call"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sms"
                        checked={formData.contactMethod.sms}
                        onChange={() => handleContactMethodChange("sms")}
                        className="mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="SMS (viber)"
                        value={formData.smsPhone}
                        onChange={(e) => handleInputChange("smsPhone", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
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
                        onClick={() => setSelectedDistrict(district)}
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
                        onClick={() => setSelectedAge(range)}
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

        {/* Success Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Таны хүсэлт амжилттай илгээгдлээ!</h3>
                <p className="text-sm text-gray-600 mb-4">Бид тантай удахгүй холбогдох болно.</p>
                <button
                  onClick={closePopup}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                >
                  Хаах
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
