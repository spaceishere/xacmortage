"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);
  const carouselRef = useRef(null);
  const managersRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const isSubtitleInView = useInView(subtitleRef, { once: true, amount: 0.2 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const isCarouselInView = useInView(carouselRef, { once: true, amount: 0.2 });
  const isManagersInView = useInView(managersRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isAnimating]);

  const handleDotClick = (index: number) => {
    if (isAnimating) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="flex justify-center items-center pt-[200px] flex-col w-[100vw] bg-[#181414]">
      <motion.div
        className="flex justify-center items-center flex-col gap-[100px] max-w-[1160px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          ref={titleRef}
          variants={fadeInVariants}
          className="flex font-montserrat text-[3.5vw] font-bold text-white uppercase"
          style={{
            fontFamily: "Montserrat",
            verticalAlign: "top",
            margin: "0 auto",
            marginBottom: "0px",
            width: "auto",
          }}
        >
          {isEnglish ? "Circle" : "Хүрээлэл"}
        </motion.div>

        <motion.div
          ref={subtitleRef}
          variants={fadeInVariants}
          className="flex mt-[40px] mb-[40px] text-[36px] line-height-[48px] text-white text-center"
        >
          <h2>
            {isEnglish ? (
              <>
                A circle of cooperation to create <br /> valuable assets and values <br /> for future generations
              </>
            ) : (
              <>
                Ашид өвлөгдөх үнэт хөрөнгө, үнэ цэн <br /> бүрийг хамт бүтээх хамтын ажиллагааны <br /> хүрээлэл
              </>
            )}
          </h2>
        </motion.div>

        <motion.div ref={gridRef} variants={fadeInVariants} className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 mt-6 md:mt-12 mb-10 md:mb-20">
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
                className="flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <div className="relative w-full h-16 sm:h-20 md:h-24 lg:h-28">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain object-center opacity-70 hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div ref={carouselRef} variants={fadeInVariants} className="mt-[40px] mb-[40px] w-full max-w-4xl">
          <div className="relative overflow-hidden">
            <div className="relative h-[200px]">
              <AnimatePresence initial={false} custom={direction} mode="wait" onExitComplete={() => setIsAnimating(false)}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full px-4"
                >
                  <div className="text-center">
                    <p
                      className="text-[18px] text-white/70 mb-4"
                      style={{ fontFamily: "Montserrat" }}
                      dangerouslySetInnerHTML={{ __html: testimonials[currentSlide].content }}
                    />
                    <p className="text-[18px] text-white/70">{testimonials[currentSlide].author}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows at Bottom */}
            <div className="flex justify-center mt-4 space-x-4 gap-[60px]">
              <button onClick={prevSlide} className="text-white hover:text-gray-300 transition-colors duration-200" aria-label="Previous testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={nextSlide} className="text-white hover:text-gray-300 transition-colors duration-200" aria-label="Next testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
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
              className="flex mt-[100px] mb-[40px] text-[61.425px] text-white text-center hover:opacity-80 transition-opacity duration-300"
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
