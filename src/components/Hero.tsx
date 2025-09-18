"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes } from "next/font/google";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();

      if (locked || now - lastScrollTime < 1000) {
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
  }, [index, locked, lastScrollTime]);

  const currentVideo = videos[index];
  if (!currentVideo) return null;

  return (
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
      </div>
    </section>
  );
}
