"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Value() {
  const { isEnglish } = useLanguage();

  return (
    <motion.div
      className="flex justify-center pt-[200px] items-center flex-col w-[100vw] bg-[#18141418]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-center items-center flex-col max-w-[1160px]">
        <motion.div
          className="flex font-montserrat  text-[45px] lg:text-[3.5vw] font-bold text-white uppercase"
          style={{
            fontFamily: "Montserrat",
            verticalAlign: "top",
            margin: "0 auto",
            marginBottom: "0px",
            width: "auto",
          }}
          variants={itemVariants}
        >
          {isEnglish ? "Values" : "Үнэ цэн"}
        </motion.div>

        <motion.div
          className="flex font-montserrat  mt-[40px] mb-[40px] w-[80vw] xl:w-[100vw] items-center justify-center font-light text-[16px] text-[#777] text-center text-base/6"
          style={{
            fontFamily: "Montserrat !important",
          }}
          variants={itemVariants}
        >
          {isEnglish ? (
            <strong>
              We honor Precious People, Mother Earth, and Healthy Profits,
              delivering valuable financial services to our customers <br />
              and becoming their lifelong partners.
            </strong>
          ) : (
            <strong>
              Бид Эрдэнэт хүмүүн, Эх дэлхий, Эрүүл ашгийг эрхэмлэн
              харилцагчаадаа <br /> үнэ цэнтэй санхүүгийн үйлчилгээг хүргэж,
              насан туршийн түнш нь байх болно.
            </strong>
          )}
        </motion.div>

        <motion.div className="" variants={itemVariants}>
          <Image
            className="w-[80vw] xl:w-[100vw]"
            src="/altai5bogd.jpg"
            alt="Mongolian landscape"
            width={1313}
            height={590}
          />
        </motion.div>

        <motion.div
          className="flex font-montserrat mt-[40px] mb-[40px] w-[80vw] xl:w-[100vw] items-center justify-center font-light text-[16px] text-[#777] text-center text-base/6"
          style={{
            fontFamily: "Montserrat !important",
          }}
          variants={itemVariants}
        >
          {isEnglish ? (
            <>
              XacBank has been creating sustainable growth in Mongolia&apos;s
              banking and financial system since its establishment in 2001,{" "}
              <br />
              expanding its operations and now becoming one of the 4 largest
              banks in the system.
            </>
          ) : (
            <>
              ХасБанк 2001 онд байгууллагдсан цагаасаа Монгол Улсын банк
              санхүүгийн системд тогтвортой өсөлтийг бий болгож, <br /> үйл
              ажиллагаагаа өргөтгөж ирсэн бөгөөд өдгөө системийн хэмжээний 4 том
              банкны нэг болоод байна.
            </>
          )}
        </motion.div>

        <motion.div className="" variants={itemVariants}>
          <Image
            className="w-[80vw] xl:w-[100vw]"
            src="/xacbank1.jpg"
            alt="XacBank building"
            width={1313}
            height={590}
          />
        </motion.div>

        <motion.div
          className="flex font-montserrat mt-[40px] mb-[40px] w-[80vw] xl:w-[100vw] items-center justify-center font-light text-[16px] text-[#777] text-center text-base/6"
          style={{ fontFamily: "Montserrat !important" }}
          variants={itemVariants}
        >
          {isEnglish ? (
            <>
              We add light to every happy moment of yours, helping you choose
              and purchase your own home that creates memories, <br />
              providing you with top-tier financial services with honor and
              making you feel comfortable while saving your valuable time.
            </>
          ) : (
            <>
              Бид Таны аз жаргалтай мөч бүрт гэрэл нэмж, дурсамж бүтээх өөрийн
              орон сууцаа сонгох, худалдан авахад тань дээд зэрэглэлийн
              хүндлэлээр санхүүгийн <br /> үйлчилгээ үзүүлэн, тав тухыг мэдрүүлж
              таны үнэ цэнтэй цаг хугацааг хэмнэхэд туслах болно.
            </>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <Link href="/circle" className="block">
            <motion.div
              className="flex font-montserrat mt-[100px] font-light mb-[40px] text-[45px] lg:text-[3.5vw] spacex-x-[90px] text-white text-center justify-center text-base/6"
              style={{ fontFamily: "Montserrat !important" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {isEnglish ? "Partnership" : "Түншлэл"}
              <motion.span
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              ></motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
