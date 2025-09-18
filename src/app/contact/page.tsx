"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { notification } from "antd";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const WIDGETS_SAVE_LEAD = gql`
  mutation widgetsSaveLead($formId: String!, $submissions: [FieldValueInput], $browserInfo: JSON!, $cachedCustomerId: String) {
    widgetsSaveLead(formId: $formId, submissions: $submissions, browserInfo: $browserInfo, cachedCustomerId: $cachedCustomerId) {
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

export default function Contact() {
  const { isEnglish } = useLanguage();
  const titleRef = useRef(null);
  const managerRef = useRef(null);
  const formRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const isManagerInView = useInView(managerRef, { once: true, amount: 0.1 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 });

  const [saveLead, { loading }] = useMutation(WIDGETS_SAVE_LEAD);

  const openNotificationWithIcon = (type: "success" | "error", message: string) => {
    (notification as any)[type]({
      message,
      placement: "topRight",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get("name") as string,
      register: formData.get("register") as string,
      mobile: formData.get("mobile") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    if (!values.name || !values.message) {
      return openNotificationWithIcon("error", isEnglish ? "Please complete all required fields" : "Мэдээллээ бүрэн оруулна уу");
    }

    const submissions = [
      { _id: "nL-7wT3jNM5XTa-r6PylY", type: "input", value: values.name },
      { _id: "nL-7wT3jNM5XTa-r6PylY", type: "input", value: values.register || "" },
      { _id: "nL-7wT3jNM5XTa-r6PylY", type: "input", value: values.mobile || "" },
      { _id: "nL-7wT3jNM5XTa-r6PylY", type: "input", value: values.email || "" },
      { _id: "nL-7wT3jNM5XTa-r6PylY", type: "textarea", value: values.message },
    ];

    const browserInfo = {
      language: navigator.language,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    try {
      const { data } = await saveLead({
        variables: {
          formId: "nL-7wT3jNM5XTa-r6PylY",
          submissions,
          browserInfo,
          cachedCustomerId: "5uoY53QC9Pwmrsq2W",
        },
      });

      if (data && typeof data === "object" && "widgetsSaveLead" in data) {
        const result = (data as any).widgetsSaveLead;
        if (result.status === "ok") {
          openNotificationWithIcon("success", isEnglish ? "Request sent successfully" : "Амжилттай илгээлээ");
          e.currentTarget.reset();
        } else {
          const errors = result.errors;
          openNotificationWithIcon(
            "error",
            errors && errors.length > 0 ? `${isEnglish ? "Error" : "Алдаа"}: ${errors[0].text}` : isEnglish ? "Failed to send" : "Амжилтгүй боллоо"
          );
        }
      }
    } catch (error) {
      console.error("GraphQL mutation error:", error);
      openNotificationWithIcon("error", isEnglish ? "Failed to send request" : "Амжилтгүй боллоо");
    }
  };

  return (
    <div className="flex flex-col items-center pt-[200px] w-full bg-[#181414] min-h-screen px-4">
      <div className="w-[80vw] max-w-[1160px] mx-auto">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="flex justify-center items-center mb-16"
        >
          <div className="flex font-montserrat text-[45px] lg:text-[3.5vw] font-bold text-white uppercase">{isEnglish ? "MANAGER" : "МЕНЕЖЕР"}</div>
        </motion.div>

        {/* Manager */}
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
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
            <p className="font-montserrat text-white/70 text-[24px] md:text-[30px] mb-[10px]">8074-8855</p>
            <p className="font-montserrat text-white/70 text-[16px] md:text-[18px] mb-[15px]">{isEnglish ? "Phone" : "Утас"}</p>
            <p className="font-montserrat text-white/70 text-[20px] md:text-[24px] lg:text-[30px] mb-[28px] break-all">mungunzul.n@xacleasing.mn</p>
            <p className="font-montserrat text-white/70 text-[16px] md:text-[18px] mb-[15px]">{isEnglish ? "Email" : "Цахим шуудан"}</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          ref={formRef}
          initial="hidden"
          animate={isFormInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="w-full flex flex-col items-center py-[40px] md:py-[80px] text-white"
        >
          <p className="text-center text-[24px] md:text-[36px] mb-12 font-medium">{isEnglish ? "Send Request" : "Хүсэлт илгээх"}</p>

          <div className="w-full max-w-[780px] mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
              {/* First Row - Name and Register */}
              <div className="flex flex-col md:flex-row gap-[40px]">
                <input
                  name="name"
                  required
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder={isEnglish ? "Full Name" : "Овог нэр"}
                  type="text"
                />
                <input
                  name="register"
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder={isEnglish ? "Register Number" : "Регистр"}
                  type="text"
                />
              </div>

              {/* Second Row - Phone and Email */}
              <div className="flex flex-col md:flex-row gap-[40px]">
                <input
                  name="mobile"
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder={isEnglish ? "Phone" : "Утас"}
                  type="tel"
                />
                <input
                  name="email"
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[60px] text-white placeholder-white/50 px-0
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder={isEnglish ? "Email" : "Цахим шуудан"}
                  type="email"
                />
              </div>

              {/* Message Field */}
              <textarea
                name="message"
                required
                className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-[120px] text-white placeholder-white/50 px-0 resize-none
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                placeholder={isEnglish ? "Your message" : "Таны хүсэлт"}
              />

              {/* Submit Button */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="border-2 border-white text-white py-[12px] px-[40px] md:px-[50px] rounded-[50px] text-[14px] hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (isEnglish ? "Sending..." : "Илгээж байна...") : isEnglish ? "Send" : "Илгээх"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
