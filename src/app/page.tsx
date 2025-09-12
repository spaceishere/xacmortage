"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { isEnglish } = useLanguage();

  return (
    <div className="flex justify-center items-center flex-col w-[100vw] bg-[#181414]">
      <div className="flex justify-center items-center flex-col max-w-[1160px]">
        <div className="flex font-montserrat mt-[160px] text-[61.425px] font-bold text-white uppercase">{isEnglish ? "Values" : "Үнэ цэн"}</div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[14px] text-white text-center">
          {isEnglish ? (
            <>
              We honor Precious People, Mother Earth, and Healthy Profits, delivering valuable financial services to our customers <br />
              and becoming their lifelong partners.
            </>
          ) : (
            <>
              Бид Эрдэнэт хүмүүн, Эх дэлхий, Эрүүл ашгийг эрхэмлэн харилцагчдадаа <br /> үнэ цэнтэй санхүүгийн үйлчилгээг хүргэж, насан туршийн түнш
              нь байх болно.
            </>
          )}
        </div>
        <div className="">
          <Image src="/altai5bogd.jpg" alt="logo" width={1313} height={590} />
        </div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[14px] text-white text-center">
          {isEnglish ? (
            <>
              XacBank has been creating sustainable growth in Mongolia&apos;s banking and financial system since its establishment in 2001, <br />
              expanding its operations and now becoming one of the 4 largest banks in the system.
            </>
          ) : (
            <>
              ХасБанк 2001 онд байгууллагдсан цагаасаа Монгол Улсын банк санхүүгийн системд тогтвортой өсөлтийг бий болгож, <br /> үйл ажиллагаагаа
              өргөтгөж ирсэн бөгөөд өдгөө системийн хэмжээний 4 том банкны нэг болоод байна.
            </>
          )}
        </div>
        <div className="">
          <Image src="/xacbank1.jpg" alt="logo" width={1313} height={590} />
        </div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[14px] text-white text-center">
          {isEnglish ? (
            <>
              We add light to every happy moment of yours, helping you choose and purchase your own home that creates memories, <br />
              providing you with top-tier financial services with honor and making you feel comfortable while saving your valuable time.
            </>
          ) : (
            <>
              Бид Таны аз жаргалтай мөч бүрт гэрэл нэмж, дурсамж бүтээх өөрийн орон сууцаа сонгох, худалдан авахад тань дээд зэрэглэлийн хүндлэлээр
              санхүүгийн <br /> үйлчилгээ үзүүлэн, тав тухыг мэдрүүлж таны үнэ цэнтэй цаг хугацааг хэмнэхэд туслах болно.
            </>
          )}
        </div>
        <Link href="/circle">
          <div className="flex font-montserrat mt-[100px] mb-[40px] text-[61.425px] text-white text-center">
            {isEnglish ? "Partnership" : "Түншлэл"}
          </div>
        </Link>
      </div>
    </div>
  );
}
