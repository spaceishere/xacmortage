"use client";

import React, { useState, useEffect } from "react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000000);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(1.5);
  const [loanTerm, setLoanTerm] = useState(24);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Calculate monthly payment and validate down payment
  useEffect(() => {
    // Validate and adjust down payment when loan amount changes
    const maxDownPayment = loanAmount * 0.5;
    if (downPayment > maxDownPayment) {
      setDownPayment(maxDownPayment);
    }

    const principal = loanAmount - Math.min(downPayment, maxDownPayment);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    if (principal > 0 && monthlyRate > 0) {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(principal / numPayments);
    }
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("mn-MN").format(Math.round(amount)) + "₮";
  };

  const SliderInput = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    suffix = "",
    fieldKey,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
    fieldKey: string;
  }) => {
    const isEditing = editingField === fieldKey;

    const handleInputSubmit = (inputValue: string) => {
      const numValue = parseFloat(inputValue.replace(/[^\d.-]/g, ""));
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        onChange(numValue);
      }
      setEditingField(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputSubmit(e.currentTarget.value);
      } else if (e.key === "Escape") {
        setEditingField(null);
      }
    };

    return (
      <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-orange-400/50 transition-colors">
        <div className="flex justify-between items-center mb-3">
          <label className="text-white/90 text-sm font-medium">{label}</label>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                defaultValue={typeof value === "number" && value < 100 ? value.toFixed(1) : formatMoney(value).replace("₮", "")}
                onBlur={(e) => handleInputSubmit(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-white font-semibold bg-transparent border-b border-white/30 focus:border-orange-400 focus:outline-none text-right min-w-[100px]"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setEditingField(fieldKey)}
                className="text-white font-semibold hover:text-orange-300 transition-colors cursor-pointer"
              >
                {typeof value === "number" && value < 100 ? value.toFixed(1) : formatMoney(value).replace("₮", "")}
                {suffix}
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          {/* Range line */}
          <div className="w-full h-2 bg-white/20 rounded-lg mb-2"></div>{" "}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-transparent appearance-none cursor-pointer slider relative z-10 opacity-0 absolute top-0"
          />
          <div
            className="absolute -top-2 w-6 h-6 rounded-full shadow-lg cursor-pointer transform -translate-x-5 z-20"
            style={{
              left: `${((value - min) / (max - min)) * 100}%`,
              backgroundImage: 'url("/selecter.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startValue = value;
              const rangeWidth = e.currentTarget.parentElement?.offsetWidth || 0;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaPercent = (deltaX / rangeWidth) * 100;
                const deltaValue = ((max - min) * deltaPercent) / 100;
                const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
                onChange(newValue);
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-[200px] bg-[#181414] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4">
                <img src="/Logo2.png" alt="XAC Leasing Logo" className="h-16 w-auto" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">ТООЦООЛУУР</h1>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              <SliderInput
                label="Хэрэгцийн үнэ"
                value={loanAmount}
                onChange={setLoanAmount}
                min={1000000}
                max={500000000}
                step={1000000}
                fieldKey="loanAmount"
              />

              <SliderInput
                label="Урьдчилгаа төлбөр"
                value={downPayment}
                onChange={(value) => {
                  const maxDownPayment = loanAmount * 0.5;
                  setDownPayment(Math.min(value, maxDownPayment));
                }}
                min={0}
                max={loanAmount * 0.5}
                step={100000}
                fieldKey="downPayment"
              />

              <SliderInput
                label="Түрээсийн хүү (жилээр)"
                value={interestRate}
                onChange={setInterestRate}
                min={0.1}
                max={20}
                step={0.1}
                suffix=" %"
                fieldKey="interestRate"
              />

              <SliderInput
                label="Түрээсийн хугацаа (сараар)"
                value={loanTerm}
                onChange={setLoanTerm}
                min={6}
                max={96}
                step={1}
                suffix=" сар"
                fieldKey="loanTerm"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Main Result */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 text-center">
              <h2 className="text-white/80 text-lg mb-4">Түрээсийн дүн</h2>
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text mb-6">
                {formatMoney(monthlyPayment)}
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl p-4 mb-6 border border-orange-400/30">
                <div className="text-white/70 text-sm mb-1">Сард төлөх дүн</div>
                <div className="text-xl font-bold text-orange-400">{formatMoney(monthlyPayment)}</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Зээлийн мэдээлэл
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">Зээлийн дүн:</span>
                  <span className="text-white font-medium">{formatMoney(loanAmount - downPayment)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">Нийт төлөх дүн:</span>
                  <span className="text-white font-medium">{formatMoney(monthlyPayment * loanTerm)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70">Нийт хүү:</span>
                  <span className="text-orange-400 font-medium">{formatMoney(monthlyPayment * loanTerm - (loanAmount - downPayment))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ea580c);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.6);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(249, 115, 22, 0.8);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ea580c);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.6);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(249, 115, 22, 0.8);
        }

        .slider::-webkit-slider-track {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          border-radius: 10px;
          height: 8px;
        }

        .slider::-moz-range-track {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          border-radius: 10px;
          height: 8px;
          border: none;
        }
      `}</style>
    </div>
  );
}
