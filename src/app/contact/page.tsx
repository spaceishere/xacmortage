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
  const formElementRef = useRef<HTMLFormElement>(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const isManagerInView = useInView(managerRef, { once: true, amount: 0.1 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 });

  const [saveLead, { loading }] = useMutation(WIDGETS_SAVE_LEAD);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type, message: "" });
    }, 4000);
  };

  const openNotificationWithIcon = (type: "success" | "error", message: string) => {
    (notification as unknown as Record<string, (config: { message: string; placement: string }) => void>)[type]({
      message,
      placement: "topRight",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formElementRef.current) return;

    const formData = new FormData(formElementRef.current);
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
      { _id: "field-name", type: "input", value: values.name },
      { _id: "field-register", type: "input", value: values.register || "" },
      { _id: "field-mobile", type: "input", value: values.mobile || "" },
      { _id: "field-email", type: "input", value: values.email || "" },
      { _id: "field-message", type: "textarea", value: values.message },
    ];

    const browserInfo = {
      language: navigator.language,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    try {
      console.log("Sending form data:", {
        formId: "nL-7wT3jNM5XTa-r6PylY",
        submissions,
        browserInfo,
        cachedCustomerId: "5uoY53QC9Pwmrsq2W",
      });

      const { data } = await saveLead({
        variables: {
          formId: "nL-7wT3jNM5XTa-r6PylY",
          submissions,
          browserInfo,
          cachedCustomerId: "5uoY53QC9Pwmrsq2W",
        },
      });

      console.log("Response data:", data);

      if (data && typeof data === "object" && "widgetsSaveLead" in data) {
        const result = (data as Record<string, unknown>).widgetsSaveLead as Record<string, unknown>;
        console.log("Mutation result:", result);

        if (result.status === "ok") {
          // Show success toast
          showToast("success", isEnglish ? "Request sent successfully!" : "Амжилттай илгээлээ!");
          openNotificationWithIcon("success", isEnglish ? "Request sent successfully" : "Амжилттай илгээлээ");
          if (formElementRef.current) {
            formElementRef.current.reset();
          }
        } else {
          const errors = result.errors as Array<{ text: string }> | undefined;
          console.log("Mutation errors:", errors);
          // Show error toast
          const errorMessage = errors && errors.length > 0 ? errors[0].text : isEnglish ? "Failed to send" : "Амжилтгүй боллоо";
          showToast("error", `${isEnglish ? "Error" : "Алдаа"}: ${errorMessage}`);
          openNotificationWithIcon(
            "error",
            errors && errors.length > 0 ? `${isEnglish ? "Error" : "Алдаа"}: ${errors[0].text}` : isEnglish ? "Failed to send" : "Амжилтгүй боллоо"
          );
        }
      } else {
        console.log("Unexpected response format:", data);
        showToast("error", isEnglish ? "Unexpected response format" : "Хүлээгдээгүй хариу");
        openNotificationWithIcon("error", isEnglish ? "Unexpected response format" : "Хүлээгдээгүй хариу");
      }
    } catch (error) {
      console.error("GraphQL mutation error:", error);
      // Show error toast for network issues
      showToast("error", isEnglish ? "Failed to send request. Please try again." : "Амжилтгүй боллоо. Дахин оролдоно уу.");
      openNotificationWithIcon("error", isEnglish ? "Failed to send request" : "Амжилтгүй боллоо");
    }
  };

  return (
    <div className="flex flex-col items-center pt-32 sm:pt-40 md:pt-48 lg:pt-56 w-full bg-[#181414] min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="flex justify-center items-center mb-12 sm:mb-16"
        >
          <div className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase text-center">
            {isEnglish ? "MANAGER" : "МЕНЕЖЕР"}
          </div>
        </motion.div>

        {/* Manager */}
        <motion.div
          ref={managerRef}
          initial="hidden"
          animate={isManagerInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="flex flex-col lg:flex-row justify-center items-center text-white pt-12 sm:pt-16 md:pt-20 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 md:mb-24"
        >
          <div className="flex-shrink-0">
            <Image src="/mungunzul.png" alt="manager" width={406} height={420} className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto rounded-lg shadow-xl" />
          </div>
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start space-y-2 sm:space-y-3">
            <p className="font-montserrat text-white/70 text-xl sm:text-2xl md:text-3xl font-semibold">8074-8855</p>
            <p className="font-montserrat text-white/70 text-sm sm:text-base md:text-lg">{isEnglish ? "Phone" : "Утас"}</p>
            <p className="font-montserrat text-white/70 text-lg sm:text-xl md:text-2xl lg:text-3xl break-all">mungunzul.n@xacleasing.mn</p>
            <p className="font-montserrat text-white/70 text-sm sm:text-base md:text-lg">{isEnglish ? "Email" : "Цахим шуудан"}</p>
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
          <p className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-10 md:mb-12 font-medium">
            {isEnglish ? "Send Request" : "Хүсэлт илгээх"}
          </p>

          <div className="w-full max-w-[780px] mx-auto px-4 sm:px-6 lg:px-0">
            <form ref={formElementRef} onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {/* First Row - Name and Register */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                <input
                  name="name"
                  required
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-12 sm:h-14 md:h-16 text-white placeholder-white/50 px-0 text-sm sm:text-base
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
             h-12 sm:h-14 md:h-16 text-white placeholder-white/50 px-0 text-sm sm:text-base
             focus:border-transparent focus:bg-gradient-to-r focus:from-white focus:to-white/90
             focus:[background-position:0_100%] focus:[background-size:100%_2px] 
             [background-size:0_2px] [background-position:0_100%] bg-no-repeat 
             transition-all duration-500 ease-out"
                  placeholder={isEnglish ? "Register Number" : "Регистр"}
                  type="text"
                />
              </div>

              {/* Second Row - Phone and Email */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                <input
                  name="mobile"
                  className="flex-1 bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-12 sm:h-14 md:h-16 text-white placeholder-white/50 px-0 text-sm sm:text-base
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
             h-12 sm:h-14 md:h-16 text-white placeholder-white/50 px-0 text-sm sm:text-base
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
                className="w-full bg-transparent border-0 border-b-2 border-white/30 outline-none 
             h-24 sm:h-28 md:h-32 text-white placeholder-white/50 px-0 resize-none text-sm sm:text-base
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
                  className="border-2 border-white text-white py-3 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {loading ? (isEnglish ? "Sending..." : "Илгээж байна...") : isEnglish ? "Send" : "Илгээх"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Custom Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.3 }}
          className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-lg max-w-xs sm:max-w-sm ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {toast.type === "success" ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast({ show: false, type: "success", message: "" })}
              className="flex-shrink-0 ml-2 text-white/70 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
