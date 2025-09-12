"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Link from "next/link";
export default function Circle() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7;

  useEffect(() => {
    const carousel = document.getElementById("testimonial-carousel");

    function showTestimonial(index: number) {
      setCurrentSlide(index);
      if (carousel) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
      }
    }

    // Auto-advance carousel every 5 seconds
    const autoAdvance = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => {
      clearInterval(autoAdvance);
    };
  }, []);

  useEffect(() => {
    const carousel = document.getElementById("testimonial-carousel");
    if (carousel) {
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex justify-center items-center flex-col w-[100vw] bg-[#181414]">
      <div className="flex justify-center items-center flex-col max-w-[1160px]">
        <div className="flex font-montserrat mt-[160px] text-[61.425px] font-bold text-white uppercase">Хүрээлэл</div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[36px] line-height-[48px] text-white text-center">
          <h2>
            Ашид өвлөгдөх үнэт хөрөнгө, үнэ цэн <br /> бүрийг хамт бүтээх хамтын ажиллагааны <br /> хүрээлэл
          </h2>
        </div>
        <div className="">
          {/* Company Logos Grid */}
          <div className="grid grid-cols-4 mt-12 mb-20">
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/c21.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/remax-1.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/gerlug.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/ncd-1.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/lapland.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/hantugul-1.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/globalbridge-1.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex items-center justify-center p-6 border border-[#777] group">
              <Image
                src="/casadavinci-1.png"
                alt="logo"
                width={277}
                height={174}
                className="opacity-30 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-[40px] mb-[40px]">
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" id="testimonial-carousel">
              {/* Testimonial 1 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "Бид байгаль орчны чанарыг сайжруулах, хамгаалах, экосистемийн тэнцвэрт байдлыг хадгалахад чиглэсэн ногоон орчин бий болгон
                    ажиллана."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">NCD group</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "Шувуудын ганганааг сонсон, цэлгэр талдаа дураараа өссөн уужуу ухаант Монгол түмний эрт дээр үеэс өвлөгдөн ирсэн уламжлалт ахуй
                    соёлыг санагдуулам, амьд байгальд ойр төлөвлөлт бүхий CASA DA VINCI хотхон нь айл бүрт хувийн эдэлбэр газар, цэлгэр саруул цонх,
                    саруул террас зэрэг хувийн орон зайг чухалчилсан төлөвлөлтөөрөө онцлог хотхон юм."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">Casa Da Vinci</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "Аз жаргалын тулгын гурван чулуу, амьдрал заяаны тулах гурван багана эрүүл мэнд, амар амгалан, үнэ цэнийн оршихуйг эрхэм гэр бүлд
                    тань зориулав."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">Хан Төгөл Хотхон</p>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "CENTURY 21® нь дэлхийн үл хөдлөх хөрөнгийн хамгийн том, хамгийн алдартай брэнд юм. CENTURY 21® нь 50 гаруй жилийн амжилтын түүх,
                    мэргэжлийн туршлагатай, дэлхий нийтэд хүлээн зөвшөөрөгдсөн хүчирхэг франчайз төдийгүй хамтын ажиллагааны систем юм."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">CENTURY 21®</p>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "Үл хөдлөх хөрөнгийн шилдэг компани байж, бусдад мөрөөдлөө биелүүлэх боломжийг олгосноор зорилгодоо хүрэх. БҮГД ҮР ДҮН ГАРГАЖ,
                    БҮГД ХОЖНО."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">REMAX</p>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "Нэр төр, үнэ цэнийн илэрхийлэл "Gerlug Vista" хотхон нь айл гэрийн эрүүл аюулгүй, тааламжит орчинг бүрдүүлсэн шинэлэг
                    архитектурын цогц төлөвлөлт, олон улсын стандартын дагуу сүндэрлэж байна."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">Gerlug Vista</p>
                </div>
              </div>

              {/* Testimonial 7 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <p className="font-montserrat text-[14px] text-white mb-4">
                    "Нийгэмдээ эерэг өөрчлөлтийг бий болгох хүсэл тэмүүлэлтэй, ижил үнэт зүйл, хүсэл тэмүүлэлтэй хүмүүс манай хотхонд нэгдэн цуглаж
                    гэр бүлийн дотно найз нөхөд болно."
                  </p>
                  <p className="font-montserrat text-[16px] font-semibold text-white">Lap Land Villa</p>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 0 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(0)}
              ></button>
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 1 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(1)}
              ></button>
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 2 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(2)}
              ></button>
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 3 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(3)}
              ></button>
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 4 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(4)}
              ></button>
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 5 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(5)}
              ></button>
              <button
                className={`w-3 h-3 rounded-full bg-white transition-opacity ${currentSlide === 6 ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                onClick={() => handleDotClick(6)}
              ></button>
            </div>
          </div>
        </div>
        <Link href="/contact">
          <div className="flex font-montserrat mt-[100px] mb-[40px] text-[61.425px] text-white text-center">Менежерүүд</div>
        </Link>
      </div>
    </div>
  );
}
