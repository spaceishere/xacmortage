import Link from "next/link";
import { FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useLanguage } from "@/contexts/LanguageContext";

const WIDGETS_SAVE_LEAD = gql`
  mutation widgetsSaveLead(
    $formId: String!
    $submissions: [FieldValueInput]
    $browserInfo: JSON!
    $cachedCustomerId: String
  ) {
    widgetsSaveLead(
      formId: $formId
      submissions: $submissions
      browserInfo: $browserInfo
      cachedCustomerId: $cachedCustomerId
    ) {
      status
      conversationId
      customerId
      errors {
        fieldId
        code
        text
        __typename
      }
      __typename
    }
  }
`;

interface FooterProps {
  isHomePage?: boolean;
}

export default function Footer({ isHomePage = false }: FooterProps) {
  const { isEnglish } = useLanguage();
  const [saveLead, { loading }] = useMutation(WIDGETS_SAVE_LEAD);
  const [showLoanPopup, setShowLoanPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
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

  const districts = [
    "Хан-Уул",
    "Баянзүрх",
    "Сүхбаатар",
    "Сонгино-Хайрхан",
    "Баянгол",
  ];
  const ageRanges = ["80-аас доош", "80-90", "91-100", "101-200"];

  const handleInputChange = (
    field: string,
    value: string | { call: boolean; sms: boolean }
  ) => {
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

  const handleLoanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const errors: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.familyName.trim()) {
      errors.familyName = isEnglish
        ? "Please enter your last name"
        : "Овог оруулна уу";
    }
    if (!formData.firstName.trim()) {
      errors.firstName = isEnglish
        ? "Please enter your first name"
        : "Нэр оруулна уу";
    }

    // Validate contact method
    if (!formData.contactMethod.call && !formData.contactMethod.sms) {
      errors.contactMethod = isEnglish
        ? "Please select a contact method"
        : "Мэдээлэл авах хэлбэрээ сонгоно уу";
    }

    // Validate phone numbers if contact method is selected
    if (formData.contactMethod.call && !formData.callPhone.trim()) {
      errors.callPhone = isEnglish
        ? "Please enter your phone number"
        : "Утасны дугаараа оруулна уу";
    }

    if (formData.contactMethod.sms && !formData.smsPhone.trim()) {
      errors.smsPhone = isEnglish
        ? "Please enter your SMS phone number"
        : "SMS утасны дугаараа оруулна уу";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const submissions = [
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.familyName,
        }, // ovog
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.firstName,
        }, // ner
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.phone || "",
        }, // Утас
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.location || "",
        }, // Байршил
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.location || "",
        }, // Дүүрэг
        { _id: "A3vr-BCMRHmxRr_mdPsFC", type: "input", value: formData.area }, // Талбайн хэмжээ
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.purchasePrice,
        }, // Худалдан авах үнэ
        { _id: "A3vr-BCMRHmxRr_mdPsFC", type: "input", value: formData.area }, // Талбайн сонголт
        {
          _id: "A3vr-BCMRHmxRr_mdPsFC",
          type: "input",
          value: formData.contactMethod.call
            ? "Утас"
            : formData.contactMethod.sms
            ? "SMS/Viber"
            : "",
        }, // Мэдээлэл авах хэлбэр
      ];

      const browserInfo = {
        language: navigator.language,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending footer form data:", {
        formId: "A3vr-BCMRHmxRr_mdPsFC",
        submissions,
        browserInfo,
      });

      const { data } = await saveLead({
        variables: {
          formId: "A3vr-BCMRHmxRr_mdPsFC",
          submissions,
          browserInfo,
        },
      });

      console.log("Footer form response:", data);

      if (data && typeof data === "object" && "widgetsSaveLead" in data) {
        const result = (data as Record<string, unknown>)
          .widgetsSaveLead as Record<string, unknown>;

        if (result.status === "ok") {
          setShowLoanPopup(false);
          setShowSuccessPopup(true);
          resetForm();
        } else {
          const errors = result.errors as Array<{ text: string }> | undefined;
          const errorMessage =
            errors && errors.length > 0
              ? errors[0].text
              : isEnglish
              ? "Failed to send"
              : "Амжилтгүй боллоо";
          setFormErrors({ submit: errorMessage });
        }
      }
    } catch (error) {
      console.error("Footer form error:", error);
      setFormErrors({
        submit: isEnglish
          ? "Failed to send request. Please try again."
          : "Амжилтгүй боллоо. Дахин оролдоно уу.",
      });
    }
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

  return (
    <div
      className={`w-full fixed bottom-0 not-[]: px-[10vw]  ${
        isHomePage ? "bg-transparen" : "bg-[#181414]"
      }`}
    >
      <div className="flex w-full justify-between items-center">
        {/* Зүүн тал */}
        <div className="group flex flex-col gap-2 relative">
          <p
            className="cursor-pointer text-white"
            style={{ fontFamily: "Montserrat" }}
          >
            #шинийг #шуурхай
          </p>
          <Link href="https://www.xacleasing.mn/">
            <p className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-20 text-white">
              Хас лизинг
            </p>
          </Link>
        </div>

        {/* Баруун тал */}
        <div className="group flex flex-col gap-[50px] items-start">
          <div className="flex items-center justify-center gap-[30px] cursor-pointer">
            <p
              className="text-[15px] font-bold text-white"
              style={{ fontFamily: "Montserrat" }}
            >
              {" "}
              Social{" "}
            </p>
            <FaShareAlt size={15} color="white" />
          </div>
          <div className="max-h-0 text-white flex justify-between w-full items-center overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-20">
            <Link href="https://www.instagram.com/xacmortgage/">
              <p style={{ fontFamily: "Montserrat" }}>In</p>
            </Link>
            <Link href="https://www.facebook.com/XacMortgage">
              <p style={{ fontFamily: "Montserrat" }}>Fb</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Loan Form Popup */}
      {showLoanPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {/* Header */}
            <div className="bg-orange-500 text-white p-6 text-center relative">
              <button
                onClick={closeLoanPopup}
                className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
              <h1 className="text-2xl font-bold">ХАСБАНК</h1>
              <p className="text-sm opacity-90">Моргэйж</p>
            </div>

            <form onSubmit={handleLoanSubmit} className="p-8">
              {/* Section 1: Personal Information */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  1 Хувийн мэдээлэл
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Овог: *
                    </label>
                    <input
                      type="text"
                      value={formData.familyName}
                      onChange={(e) =>
                        handleInputChange("familyName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        formErrors.familyName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                      required
                    />
                    {formErrors.familyName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.familyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Нэр: *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        formErrors.firstName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500"
                      }`}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Утас:
                  </label>
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
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  2 Худалдан авах Орон сууцны мэдээлэл
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Байршил:
                      </label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Талбайн хэмжээ:
                      </label>
                      <input
                        type="text"
                        value={formData.area}
                        onChange={(e) =>
                          handleInputChange("area", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Худалдан авах үнэ:
                      </label>
                      <input
                        type="text"
                        value={formData.purchasePrice}
                        onChange={(e) =>
                          handleInputChange("purchasePrice", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* Contact Method */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Мэдээлэл авах хэлбэрээ сонгоно уу: *
                      </label>
                      {formErrors.contactMethod && (
                        <p className="text-red-500 text-xs mb-2">
                          {formErrors.contactMethod}
                        </p>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="call"
                            checked={formData.contactMethod.call}
                            onChange={() => handleContactMethodChange("call")}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="call"
                            className="text-sm font-medium text-gray-700 min-w-[80px]"
                          >
                            Утас
                          </label>
                          <input
                            type="tel"
                            placeholder="Утасны дугаар"
                            value={formData.callPhone}
                            onChange={(e) =>
                              handleInputChange("callPhone", e.target.value)
                            }
                            disabled={!formData.contactMethod.call}
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              formErrors.callPhone
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-orange-500"
                            }`}
                          />
                          {formErrors.callPhone && (
                            <p className="text-red-500 text-xs mt-1 w-full">
                              {formErrors.callPhone}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="sms"
                            checked={formData.contactMethod.sms}
                            onChange={() => handleContactMethodChange("sms")}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="sms"
                            className="text-sm font-medium text-gray-700 min-w-[80px]"
                          >
                            SMS/Viber
                          </label>
                          <input
                            type="tel"
                            placeholder="SMS (Viber) утасны дугаар"
                            value={formData.smsPhone}
                            onChange={(e) =>
                              handleInputChange("smsPhone", e.target.value)
                            }
                            disabled={!formData.contactMethod.sms}
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              formErrors.smsPhone
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-orange-500"
                            }`}
                          />
                          {formErrors.smsPhone && (
                            <p className="text-red-500 text-xs mt-1 w-full">
                              {formErrors.smsPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      {loading
                        ? isEnglish
                          ? "Sending..."
                          : "Илгээж байна..."
                        : isEnglish
                        ? "Send Request"
                        : "Хүсэлт илгээх"}
                    </button>
                    {formErrors.submit && (
                      <p className="text-red-500 text-sm mt-2 text-center">
                        {formErrors.submit}
                      </p>
                    )}
                  </div>

                  {/* Right Column - Districts and Age Selection */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Дүүрэг:
                      </h3>
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
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Талбайн сонголт:
                      </h3>
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
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Хүсэлт илгээх
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Таны хүсэлт Амжилттай илгээгдлээ.
                      </p>
                      <p className="text-xs text-gray-600 mb-1">Бид Танруу</p>
                      <p className="text-xs text-gray-600 mb-1">
                        (Ажлын өдөр 9:00-17:00 хооронд)
                      </p>
                      <p className="text-xs text-orange-600 font-medium">
                        8001-0218, 8001-0219-аас холбогдох
                      </p>
                      <p className="text-xs text-gray-600">
                        дэлгэрэнгүй мэдээлэл өгөх болно.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Амжилттай илгээгдлээ! ✨
              </h3>

              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Таны <strong>моргэйжийн хүсэлт</strong> амжилттай бүртгэгдлээ.
                </p>
                <p className="text-sm text-orange-600 font-semibold mb-2">
                  📞 Холбогдох утас: 8001-0218, 8001-0219
                </p>
                <p className="text-xs text-gray-600">
                  ⏰ Ажлын өдөр: 9:00-17:00 хооронд
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={closeSuccessPopup}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
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
          </div>
        </div>
      )}
    </div>
  );
}
