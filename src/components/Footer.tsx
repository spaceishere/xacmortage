import Link from "next/link";
import { FaShareAlt } from "react-icons/fa";

interface FooterProps {
  isHomePage?: boolean;
}

export default function Footer({ isHomePage = false }: FooterProps) {
  return (
    <div className={`w-full px-[10vw] py-[30px] ${isHomePage ? "bg-transparen" : "bg-[#181414]"}`}>
      <div className="flex w-full justify-between items-center">
        {/* Зүүн тал */}
        <div className="group flex flex-col gap-2 relative">
          <p className="cursor-pointer">#шинийг #шуурхай</p>
          <Link href="https://www.xacleasing.mn/">
            <p className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-20">Хас лизинг</p>
          </Link>
        </div>

        {/* Баруун тал */}
        <div className="group flex flex-col gap-[50px] items-start">
          <div className="flex items-center justify-center gap-[30px] cursor-pointer">
            <p className="text-[15px] font-bold"> Social </p>
            <FaShareAlt size={15} />
          </div>
          <div className="max-h-0 flex justify-between w-full items-center overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-20">
            <Link href="https://www.instagram.com/xacmortgage/">
              <p>In</p>
            </Link>
            <Link href="https://www.facebook.com/XacMortgage">
              <p>Fb</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
