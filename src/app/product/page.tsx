"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Product() {
  const { isEnglish } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loanProducts = [
    {
      title: isEnglish ? "HOUSING LOAN" : "ОРОН СУУЦНЫ ЗЭЭЛ",
      description: isEnglish
        ? "Customers, with XacBank's housing loan, buy your dream home and make the biggest savings and investment of your life."
        : "Харилцагч та ХасБанкны орон сууцны зээлээр мөрөөдлийн байраа худалдан авч, амьдралынхаа хамгийн том хуримтлал, хөрөнгө оруулалтыг хийгээрэй.",
      image: "/hero/apart.jpg",
      amount: isEnglish ? "1 billion MNT" : "1 тэрбум төгрөг",
      term: isEnglish ? "240 months" : "240 cap",
      monthlyRate: "1.5%",
      annualRate: "18.0%",
      buttonText: isEnglish ? "Details" : "Дэлгэрэнгүй",
    },
    {
      title: isEnglish ? "PERSONAL HOUSING LOAN" : "АМИНЫ ОРОН СУУЦНЫ ЗЭЭЛ",
      description: isEnglish
        ? "Customers can have a personal housing unit with their desired color and design."
        : "Харилцагч та өөрийн хүссэн өнгө загвараар амины орон сууцтай болох боломжтой.",
      image: "/hero/apart.jpg",
      amount: isEnglish ? "Up to 1.5 billion MNT" : "1.5 тэрбум төгрөг хүртэл",
      term: isEnglish ? "240 months" : "240 cap",
      monthlyRate: "1.5%",
      annualRate: "18.0%",
      buttonText: isEnglish ? "Details" : "Дэлгэрэнгүй",
    },
  ];

  const requirements = [
    isEnglish ? "NO BAD LOAN HISTORY" : "МУУ ЗЭЭЛИЙН ТҮҮХГҮЙ",
    isEnglish ? "STABLE INCOME" : "ОРЛОГО ТОГТМОЛ БАЙХ",
    isEnglish ? "DOWN PAYMENT CONFIRMED" : "УРЬДЧИЛГАА ТӨЛБӨР БАТАЛГААЖСАН",
  ];

  const materials = {
    eMongolia: [
      isEnglish ? "ID card reference" : "Иргэний үнэмлэхний лавлагаа",
      isEnglish ? "Residential address reference" : "Оршин суугаа хаягын лавлагаа",
      isEnglish
        ? "Marriage registration reference / non-marriage registration reference"
        : "Гэрлэлт бүртгэсний лавлагаа/ гэрлэлт бүртгэгдээгүй лавлагаа",
      isEnglish ? "Real Estate List reference" : "ҮХХ-ийн жагсаалтын лавлагаа",
      isEnglish ? "Vehicle ownership reference" : "Тээврийн хэрэгсэл өмчилж буй лавлагаа",
      isEnglish ? "Reference of no debt to others by court decision" : "Шүүхийн шийдвэрээр бусдад өр төлбөргүй лавлагаа",
    ],
    incomeProof: {
      salary: [
        isEnglish ? "Bank statement for the last 12 months" : "Дансны хуулга сүүлийн 12 сараар",
        isEnglish ? "Employment certificate" : "Ажлын газрын тодорхойлолт",
        isEnglish
          ? "If active loan, loan agreement, repayment schedule, loan account statement"
          : "Идэвхитэй зээлтэй бол зээлийн гэрээ, эргэн төлөлтийн хуваарь, зээлийн дансны хуулга",
      ],
      business: [
        isEnglish ? "Bank statement for the last 12 months" : "Дансны хуулга сүүлийн 12 сараар",
        isEnglish ? "Copy of company certificate, charter, special license" : "ААН-ийн гэрчилгээ, дүрэм, тусгай зөвшөөрөлийн хуулбар",
        isEnglish ? "Financial statement for the last 1 year" : "Сүүлийн 1 жилийн Санхүүгийн Тайлан",
        isEnglish ? "Copies of business-related work agreements" : "Бизнестэй холбоотой ажлын гэрээнүүдийн хуулбар",
        isEnglish
          ? "If active loan, loan agreement, repayment schedule, loan account statement"
          : "Идэвхитэй зээлтэй бол зээлийн гэрээ, эргэн төлөлтийн хуваарь, зээлийн дансны хуулга",
      ],
    },
    housingInfo: [
      isEnglish ? "Interior and exterior photos of the property to be purchased" : "Авах байрны дотор гаднах зураг",
      isEnglish ? "Proof of paid down payment or ability to pay" : "Урьдчилгаа төлбөрийг төлсөн, эсвэл төлөх чадвартайг нотлох баримт",
      isEnglish ? "Copy of real estate certificate or reservation agreement" : "ҮХХ-ийн гэрчилгээний хуулбар, эсвэл захиалгын гэрээ",
      isEnglish ? "Property rights registration reference (E-Mongolia)" : "Эд хөрөнгийн эрхийн бүртгэлийн лавлагаа (E-Mongolia)",
    ],
  };

  return (
    <div className="flex justify-center items-center pt-[200px] pb-[100px] flex-col w-full min-h-screen bg-[#181414] overflow-x-hidden">
      <motion.div
        className="flex justify-center items-center flex-col gap-[60px] max-w-[1400px] px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Loan Products */}
        <motion.div variants={fadeInVariants} className="space-y-8 w-full max-w-6xl">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center text-[36px]"
            style={{
              fontFamily: "Montserrat",
              fontSize: "60px",
              width: "auto",
              fontWeight: "300",
              letterSpacing: "0.001em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              WebkitTextStroke: "0.5px rgba(255,255,255,0.3)",
            }}
          >
            {isEnglish ? "Loan Products" : "Зээлийн бүтээгдэхүүн"}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {loanProducts.map((product, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "Montserrat" }}>
                  {product.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: "Montserrat" }}>
                  {product.description}
                </p>

                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <Image src={product.image} alt={product.title} fill className="object-cover" />
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Loan amount" : "Зээлийн хэмжээ"}
                    </p>
                    <p className="text-white font-semibold" style={{ fontFamily: "Montserrat" }}>
                      {product.amount}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Term" : "Хугацаа"}
                    </p>
                    <p className="text-white font-semibold" style={{ fontFamily: "Montserrat" }}>
                      {product.term}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Interest" : "Хүү"}
                    </p>
                    <p className="text-white font-semibold" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Monthly" : "Сарын"}: {product.monthlyRate}%
                    </p>
                    <p className="text-white font-semibold" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Annual" : "Жилийн"}: {product.annualRate}%
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {product.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#181414] border border-white/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Montserrat" }}>
                    {isEnglish ? "Loan Requirements & Materials" : "Зээлийн шаардлага болон материал"}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Loan Requirements */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Loan Requirements" : "Зээлийн шаардлага"}
                    </h3>
                    <div className="space-y-3">
                      {requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-gray-300" style={{ fontFamily: "Montserrat" }}>
                            {requirement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Materials */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Required Materials" : "Бүрдүүлэх материал"}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6" style={{ fontFamily: "Montserrat" }}>
                      {isEnglish ? "Decision valid for 60 days" : "Шийдвэр 60 хоног хүчинтэй"}
                    </p>

                    <div className="space-y-6">
                      {/* E-Mongolia */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Montserrat" }}>
                          {isEnglish ? "Reference from E-Mongolia" : "E-MONGOLIA-ААС ЛАВЛАГАА"}
                        </h4>
                        <ul className="space-y-2">
                          {materials.eMongolia.map((item, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span style={{ fontFamily: "Montserrat" }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Income Proof */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Montserrat" }}>
                          {isEnglish ? "Income Proof Documents" : "Орлого нотлох баримт"}
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <h5 className="text-md font-medium text-blue-400 mb-2" style={{ fontFamily: "Montserrat" }}>
                              {isEnglish ? "Salary" : "Цалин"}
                            </h5>
                            <ul className="space-y-1 ml-4">
                              {materials.incomeProof.salary.map((item, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span style={{ fontFamily: "Montserrat" }}>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-md font-medium text-blue-400 mb-2" style={{ fontFamily: "Montserrat" }}>
                              {isEnglish ? "Business" : "Бизнес"}
                            </h5>
                            <ul className="space-y-1 ml-4">
                              {materials.incomeProof.business.map((item, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span style={{ fontFamily: "Montserrat" }}>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Housing Information */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Montserrat" }}>
                          {isEnglish ? "Housing Information" : "Орон сууцны мэдээлэл"}
                        </h4>
                        <ul className="space-y-2">
                          {materials.housingInfo.map((item, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span style={{ fontFamily: "Montserrat" }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
