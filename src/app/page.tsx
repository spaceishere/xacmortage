import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-[100vw] bg-[#181414]">
      <div className="flex justify-center items-center flex-col max-w-[1160px]">
        <div className="flex font-montserrat mt-[160px] text-[61.425px] font-bold text-white uppercase ">Үнэ цэн</div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[14px] text-white text-center">
          Бид Эрдэнэт хүмүүн, Эх дэлхий, Эрүүл ашгийг эрхэмлэн харилцагчдадаа <br /> үнэ цэнтэй санхүүгийн үйлчилгээг хүргэж, насан туршийн түнш нь
          байх болно.
        </div>
        <div className="">
          <Image src="/altai5bogd.jpg" alt="logo" width={1313} height={590} />
        </div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[14px] text-white text-center">
          ХасБанк 2001 онд байгууллагдсан цагаасаа Монгол Улсын банк санхүүгийн системд тогтвортой өсөлтийг бий болгож, <br /> үйл ажиллагаагаа
          өргөтгөж ирсэн бөгөөд өдгөө системийн хэмжээний 4 том банкны нэг болоод байна.
        </div>
        <div className="">
          <Image src="/xacbank1.jpg" alt="logo" width={1313} height={590} />
        </div>
        <div className="flex font-montserrat mt-[40px] mb-[40px] text-[14px] text-white text-center">
          Бид Таны аз жаргалтай мөч бүрт гэрэл нэмж, дурсамж бүтээх өөрийн орон сууцаа сонгох, худалдан авахад тань дээд зэрэглэлийн хүндлэлээр
          санхүүгийн <br /> үйлчилгээ үзүүлэн, тав тухыг мэдрүүлж таны үнэ цэнтэй цаг хугацааг хэмнэхэд туслах болно.
        </div>
        <Link href="/circle">
          <div className="flex font-montserrat mt-[100px] mb-[40px] text-[61.425px] text-white text-center">Түншлэл</div>
        </Link>
      </div>
    </div>
  );
}
