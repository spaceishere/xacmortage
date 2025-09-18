"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Contact() {
  const { isEnglish } = useLanguage();

  // Refs for each section
  const titleRef = useRef(null);
  const managerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  // Check if sections are in view
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const isManagerInView = useInView(managerRef, { once: true, amount: 0.1 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });

  return (
    <div className="flex items-center flex-col pt-[200px] w-full bg-[#181414] min-h-screen px-4">
      <div className="w-[80vw] max-w-[1160px] mx-auto">
        {/* Title Section */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="flex justify-center items-center mb-16"
        >
          <div
            className="flex font-montserrat  text-[45px] lg:text-[3.5vw] font-bold text-white uppercase"
            style={{
              fontFamily: "Montserrat",
              verticalAlign: "top",
              margin: "0 auto",
              marginBottom: "0px",
              width: "auto",
            }}
          >
            {isEnglish ? "MANAGER" : "МЕНЕЖЕР"}
          </div>
        </motion.div>

        {/* Manager Section */}
        <motion.div
          ref={managerRef}
          initial="hidden"
          animate={isManagerInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="flex flex-col lg:flex-row justify-center items-center text-white pt-[60px] md:pt-[40px] gap-8 lg:gap-[32px] mb-24"
        >
          <div className="flex-shrink-0">
            <Image
              src="/mungunzul.png"
              alt="manager"
              width={406}
              height={420}
              className="w-[90vw] md:max-w-[350px] lg:max-w-[406px] h-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="flex justify-center items-center flex-col text-center lg:text-left">
            <p className="font-montserrat text-white/70 text-[24px] md:text-[30px] mb-[10px]">8074-8855</p>
            <p className="font-montserrat text-white/70 text-[16px] md:text-[18px] mb-[15px]">{isEnglish ? "Phone" : "Утас"}</p>
            <p className="font-montserrat text-white/70 text-[20px] md:text-[24px] lg:text-[30px] mb-[28px] break-all">mungunzul.n@xacleasing.mn</p>
            <p className="font-montserrat text-white/70 text-[16px] md:text-[18px] mb-[15px]">{isEnglish ? "Email" : "Цахим шуудан"}</p>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          ref={formRef}
          initial="hidden"
          animate={isFormInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="w-full flex flex-col items-center py-[40px] md:py-[80px] text-white"
        >
          <p className="text-center text-[24px] md:text-[36px] mb-12 font-medium">{isEnglish ? "Send Request" : "Хүсэлт илгээх"}</p>

          <div className="w-full max-w-[780px] mx-auto">
            <form className="flex flex-col gap-[40px]">
              {/* First Row - Name and Register */}
              <div className="flex flex-col md:flex-row gap-[40px]">
                <input
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder="Овог нэр"
                  type="text"
                />
                <input
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder="Регистр"
                  type="text"
                />
              </div>

              {/* Second Row - Phone and Email */}
              <div className="flex flex-col md:flex-row gap-[40px]">
                <input
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder="Утас"
                  type="text"
                />
                <input
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder="Цахим шуудан"
                  type="email"
                />
              </div>

              {/* Message Field */}
              <textarea
                className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                placeholder="Таны хүсэлт"
              />

              {/* Submit Button */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="border-2 border-white text-white py-[12px] px-[40px] md:px-[50px] rounded-[50px] text-[14px] hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Илгээх
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Contact Information Footer */}
        <motion.div ref={infoRef} initial="hidden" animate={isInfoInView ? "visible" : "hidden"} variants={fadeInVariants} className="w-full pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 md:pt-16">
            {/* Email */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-white font-montserrat text-sm mb-2">Цахим шуудан</p>
              <p className="text-white font-montserrat text-sm md:text-base">info@xacleasing.mn</p>
            </div>

            {/* Address */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white font-montserrat text-sm mb-2">Хаяг</p>
              <p className="text-white font-montserrat text-sm">
                ХасЛизинг цамхаг, 5 давхар,
                <br />
                Чингэлтэй дүүрэг,
                <br />
                Улаанбаатар, Монгол
              </p>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p className="text-white font-montserrat text-sm mb-2">Утас</p>
              <p className="text-white font-montserrat text-sm md:text-base">(976) 7011-2067</p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 gap-4 pb-8">
            <div className="text-white font-montserrat text-sm text-center md:text-left">#шинийг #шуурхай</div>
            <div className="flex items-center gap-2 text-white font-montserrat text-sm">
              <span>Social</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
