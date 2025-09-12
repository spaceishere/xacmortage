"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { isEnglish, toggleLanguage } = useLanguage();

  return (
    <div className="flex justify-between h-[120px] items-center px-[100px] w-[100vw] bg-[#181414]">
      <Image src="/Logo2.png" alt="logo" width={120} height={120} />
      <div className="flex">
        <Link href="/">
          <p className="p-[20px] text-white">{isEnglish ? "Home" : "Эхлэл"}</p>
        </Link>
        <Link href="/">
          <p className="p-[20px] text-white">{isEnglish ? "Values" : "Үнэ цэн"}</p>
        </Link>
        <Link href="/circle">
          <p className="p-[20px] text-white">{isEnglish ? "Partnership" : "Түншлэл"}</p>
        </Link>
        <Link href="/contact">
          <p className="p-[20px] text-white">{isEnglish ? "Manager" : "Менежер"}</p>
        </Link>

        {/* Language Toggle */}
        <div className="relative group">
          <button className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors p-[20px]">
            <span>{isEnglish ? "Language" : "Хэл"}</span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 bg-black   rounded-sm  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all items-center justify-center duration-200 z-50 min-w-[200px]">
            <button onClick={() => !isEnglish || toggleLanguage()} className={`w-full text-left px-4 py-3 transition-colors `}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">🇲🇳</span>
                <span className="text-sm">Монгол</span>
              </div>
            </button>
            <button onClick={() => isEnglish || toggleLanguage()} className={`w-full text-left px-4 py-3 transition-colors rounded-b-lg`}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">🇺🇸</span>
                <span className="text-sm">English</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
