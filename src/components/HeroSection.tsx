// components/HeroSection.js
"use client";

import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const texts = [
    { mn: "Хүүхдэх", en: "Mortgage", subtitle: "Таны мөрөөдлийн орон сууцыг олоход туслах найдвартай зөвлөгөө" },
    { mn: "Зээлийн", en: "Loan", subtitle: "Хамгийн боломжийн хүүтэй зээлийн санал" },
    { mn: "Орон сууц", en: "Housing", subtitle: "Чанартай орон сууцны төслүүдтэй танилцаарай" },
  ];

  const backgrounds = [
    "linear-gradient(135deg, rgba(20, 30, 60, 0.8), rgba(40, 80, 120, 0.6))",
    "linear-gradient(45deg, rgba(30, 40, 80, 0.8), rgba(60, 100, 140, 0.6))",
    "linear-gradient(225deg, rgba(25, 50, 75, 0.8), rgba(50, 90, 130, 0.6))",
  ];

  // Background slideshow effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgrounds.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  // Text cycling effect
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className={styles.hero}>
        {/* Background Slides */}
        <div className={styles.backgroundSlider}>
          {backgrounds.map((bg, index) => (
            <div key={index} className={`${styles.slide} ${currentSlide === index ? styles.active : ""}`} style={{ background: bg }} />
          ))}
        </div>

        {/* Floating Elements */}
        <div className={styles.floatingElements}>
          <div className={`${styles.floatingElement} ${styles.element1}`} />
          <div className={`${styles.floatingElement} ${styles.element2}`} />
          <div className={`${styles.floatingElement} ${styles.element3}`} />
        </div>

        {/* Parallax Background Effect */}
        <div className={styles.parallaxBg} style={{ transform: `translateY(${scrollY * 0.5}px)` }} />

        {/* Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.textContainer}>
            <h1 className={`${styles.animatedText} ${styles.mainText}`}>{texts[currentText].mn}</h1>
            <h1 className={`${styles.animatedText} ${styles.englishText}`}>{texts[currentText].en}</h1>
          </div>

          <p className={styles.subtitle}>{texts[currentText].subtitle}</p>

          <div className={styles.heroButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Зээл авах</button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>Дэлгэрэнгүй</button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollArrow} />
          <div className={styles.scrollText}>Scroll</div>
        </div>
      </section>

      {/* Next Section for scroll effect demonstration */}
      <section className={styles.nextSection}>
        <div className={styles.contentBox}>
          <h2>Бидний үйлчилгээ</h2>
          <p>Scroll дээш хийж background-ийн өөрчлөлтийг үзээрэй</p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
