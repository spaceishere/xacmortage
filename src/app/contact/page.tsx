import Image from "next/image";
import Link from "next/link";

export default function contact() {
  return (
    <div className="flex  items-center flex-col w-[100vw] bg-[#181414] min-h-[100vh]">
      <div className="flex justify-center items-center flex-col max-w-[1160px]">
        <div className="flex font-montserrat mt-[160px] text-[61.425px] font-bold text-white uppercase ">МЕНЕЖЕР</div>

        <div className="flex flex-wrap justify-between text-white pt-[109px] gap-[32px]">
          <div className="">
            <Image src="/mungunzul.png" alt="logo" width={386} height={420} />
          </div>
          <div className="flex justify-center items-center flex-col line-height-[40px] leading-[40px]">
            <p className="font-montserrat text-[30px] mb-[10px]">8074-8855</p>
            <p className="font-montserrat text-[14px] mb-[15px]">Утас</p>
            <p className="font-montserrat text-[30px] mb-[28px]">mungunzul.n@xacleasing.mn</p>
            <p className="font-montserrat text-[14px] mb-[15px]">Цахим шуудан</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center py-[100px] text-white">
        <p className="text-center text-[36px]">Хүсэлт илгээх</p>
        <div className="flex justify-center flex-col  pt-[10px] font-poppins, sans-serif">
          <div className="flex gap-[100px]">
            <input className="border-b-2 outline-none focus:border-indigo-600 w-[370px] h-[60px] mb-[40px]" placeholder="Овог нэр" type="text" />
            <input className="border-b-2 outline-none focus:border-indigo-600 w-[370px] h-[60px] mb-[20px]" placeholder="Регистр" type="text" />
          </div>
          <div className="flex gap-[100px]">
            <input className="border-b-2 outline-none focus:border-indigo-600 w-[370px] h-[60px] mb-[20px]" placeholder="Утас" type="text" />
            <input className="border-b-2 outline-none focus:border-indigo-600 w-[370px] h-[60px] mb-[20px]" placeholder="Цахим шуудан" type="text" />
          </div>
          <input className="border-b-2 outline-none focus:border-indigo-600 w-[840px] h-[60px] mb-[60px]" placeholder="Таны хүсэлт" type="text" />
          <button className="flex border-1 text-white py-[10px] px-[50px] rounded-[50px] text-[14px]">Илгээх</button>
        </div>
        <div className="w-full max-w-6xl mx-auto px-4 mt-16">
          {/* Contact Information Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-700">
            {/* Email */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-white font-montserrat text-sm mb-2">Цахим шуудан</p>
              <p className="text-white font-montserrat">info@xacleasing.mn</p>
            </div>

            {/* Address */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white font-montserrat text-sm mb-2">Хаяг</p>
              <p className="text-white font-montserrat text-sm">
                ХасЛизинг цамхаг, 5 давхар,
                <br />
                Чингэлтэй дүүрэг,
                <br />
                Улаанбаатар, Монгол
              </p>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p className="text-white font-montserrat text-sm mb-2">Утас</p>
              <p className="text-white font-montserrat">(976) 7011-2067</p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-700 mt-8">
            <div className="text-white font-montserrat text-sm">#шинийг #шуурхай</div>
            <div className="flex items-center gap-2 text-white font-montserrat text-sm">
              <span>Social</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
