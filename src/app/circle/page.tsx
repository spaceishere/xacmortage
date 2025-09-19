"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

const testimonials = [
  {
    content:
      "&ldquo;Бид байгаль орчны чанарыг сайжруулах, хамгаалах, экосистемийн тэнцвэрт байдлыг хадгалахад чиглэсэн ногоон орчин бий болгон ажиллана.&rdquo;",
    author: "NCD group",
  },
  {
    content:
      "&ldquo;Шувуудын ганганааг сонсон, цэлгэр талдаа дураараа өссөн уужуу ухаант Монгол түмний эрт дээр үеэс өвлөгдөн ирсэн уламжлалт ахуй соёлыг санагдуулам, амьд байгальд ойр төлөвлөлт бүхий CASA DA VINCI хотхон нь айл бүрт хувийн эдэлбэр газар, цэлгэр саруул цонх, саруул террас зэрэг хувийн орон зайг чухалчилсан төлөвлөлтөөрөө онцлог хотхон юм.&rdquo;",
    author: "Casa Da Vinci",
  },
  {
    content:
      "&ldquo;Аз жаргалын тулгын гурван чулуу, амьдрал заяаны тулах гурван багана эрүүл мэнд, амар амгалан, үнэ цэнийн оршихуйг эрхэм гэр бүлд тань зориулав.&rdquo;",
    author: "Хан Төгөл Хотхон",
  },
  {
    content:
      "&ldquo;CENTURY 21® нь дэлхийн үл хөдлөх хөрөнгийн хамгийн том, хамгийн алдартай брэнд юм. CENTURY 21® нь 50 гаруй жилийн амжилтын түүх, мэргэжлийн туршлагатай, дэлхий нийтэд хүлээн зөвшөөрөгдсөн хүчирхэг франчайз төдийгүй хамтын ажиллагааны систем юм.&rdquo;",
    author: "CENTURY 21®",
  },
  {
    content:
      "&ldquo;Үл хөдлөх хөрөнгийн шилдэг компани байж, бусдад мөрөөдлөө биелүүлэх боломжийг олгосноор зорилгодоо хүрэх. БҮГД ҮР ДҮН ГАРГАЖ, БҮГД ХОЖНО.&rdquo;",
    author: "REMAX",
  },
  {
    content:
      "&ldquo;Нэр төр, үнэ цэнийн илэрхийлэл &ldquo;Gerlug Vista&rdquo; хотхон нь айл гэрийн эрүүл аюулгүй, тааламжит орчинг бүрдүүлсэн шинэлэг архитектурын цогц төлөвлөлт, олон улсын стандартын дагуу сүндэрлэж байна.&rdquo;",
    author: "Gerlug Vista",
  },
  {
    content:
      "&ldquo;Нийгэмдээ эерэг өөрчлөлтийг бий болгох хүсэл тэмүүлэлтэй, ижил үнэт зүйл, хүсэл тэмүүлэлтэй хүмүүс манай хотхонд нэгдэн цуглаж гэр бүлийн дотно найз нөхөд болно.&rdquo;",
    author: "Lap Land Villa",
  },
];

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

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  }),
};

export default function Circle() {
  const { isEnglish } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const managersRef = useRef(null);

  const isManagersInView = useInView(managersRef, { once: true, amount: 0.2 });

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [isAnimating, totalSlides]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isAnimating, nextSlide]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="flex justify-center items-center pt-[200px] flex-col w-full min-h-screen bg-[#181414] overflow-x-hidden">
      <motion.div
        className="flex justify-center items-center flex-col gap-[100px] max-w-[1160px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex font-montserrat  text-[45px] lg:text-[3.5vw] font-bold text-white uppercase"
          style={{
            fontFamily: "Montserrat",
            verticalAlign: "top",
            margin: "0 auto",
            marginBottom: "0px",
            width: "auto",
          }}
          variants={fadeInVariants}
        >
          {isEnglish ? "Circle" : "Хүрээлэл"}
        </motion.div>

        <motion.div
          className="flex font-montserrat mt-[40px] mb-[40px] w-[80vw] xl:w-[100vw] justify-center items-center  font-semibold text-[24px] text-[#777] text-center"
          variants={fadeInVariants}
        >
          {isEnglish ? (
            <>
              A circle of cooperation to create <br /> valuable assets and values <br /> for future generations
            </>
          ) : (
            <>
              Ашид өвлөгдөх үнэт хөрөнгө, үнэ цэн <br /> бүрийг хамт бүтээх хамтын ажиллагааны <br /> хүрээлэл
            </>
          )}
        </motion.div>

        <motion.div variants={fadeInVariants} className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-6 md:mt-12 mb-10 md:mb-20">
            {[
              { src: "/c21.png", alt: "CENTURY 21" },
              { src: "/remax-1.png", alt: "REMAX" },
              { src: "/gerlug.png", alt: "Gerlug Vista" },
              { src: "/ncd-1.png", alt: "NCD Group" },
              { src: "/lapland.png", alt: "Lap Land Villa" },
              { src: "/hantugul-1.png", alt: "Hantugul" },
              { src: "/globalbridge-1.png", alt: "Global Bridge" },
              { src: "/casadavinci-1.png", alt: "Casa Da Vinci" },
            ].map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-3 sm:p-4 md:p-6 border-[1px] border-white/10 transition-colors duration-300"
              >
                <div className="relative w-full h-16 sm:h-20 md:h-24 lg:h-28">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain object-center opacity-30 hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInVariants} className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 w-full max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden">
            <div className="relative h-32 sm:h-40 md:h-48 lg:h-52">
              <AnimatePresence initial={false} custom={direction} mode="wait" onExitComplete={() => setIsAnimating(false)}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full px-2 sm:px-4"
                >
                  <div className="text-center">
                    <p
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-3 sm:mb-4 leading-relaxed"
                      style={{ fontFamily: "Montserrat" }}
                      dangerouslySetInnerHTML={{ __html: testimonials[currentSlide].content }}
                    />
                    <p className="text-sm sm:text-base md:text-lg text-white/70 font-medium">{testimonials[currentSlide].author}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-8 sm:space-x-12 md:space-x-16">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="text-white hover:text-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-2"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="text-white hover:text-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-2"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
          </div>
        </motion.div>
        <motion.div
          ref={managersRef}
          initial="hidden"
          animate={isManagersInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="w-full flex justify-center"
        >
          <Link href="/contact">
            <motion.div
              className="flex mt-[100px] mb-[40px] text-[45px] text-white text-center hover:opacity-80 transition-opacity duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isEnglish ? "Managers" : "Менежерүүд"}
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
