import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  Home, 
  Building2, 
  Wallet, 
  Receipt, 
  Copy, 
  Check, 
  RotateCcw, 
  Calculator, 
  AlertCircle
} from 'lucide-react';
import { 
  cleanDigits, 
  toPersianDigits,
  parseNumber, 
  numberToWordsPersian 
} from '../utils/numberUtils';

interface CalculatorScreenProps {
  darkTheme: boolean;
  onNavigateBack: () => void;
  onToggleTheme: () => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  darkTheme,
  onNavigateBack,
  onToggleTheme,
}) => {
  // Selected tab: 0 = Mortgage & Rent (رهن و اجاره), 1 = Sale (خرید و فروش)
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  // Mortgage & Rent Tab State
  const [mortgageInput, setMortgageInput] = useState<string>('');
  const [rentInput, setRentInput] = useState<string>('');
  const [isMortgageFocused, setIsMortgageFocused] = useState<boolean>(false);
  const [isRentFocused, setIsRentFocused] = useState<boolean>(false);

  const [mortgageFee, setMortgageFee] = useState<number | null>(null);
  const [mortgageTax, setMortgageTax] = useState<number | null>(null);
  const [mortgageTotal, setMortgageTotal] = useState<number | null>(null);
  const [mortgageError, setMortgageError] = useState<string | null>(null);
  const [mortgageClearOnFocus, setMortgageClearOnFocus] = useState<boolean>(false);
  const [rentClearOnFocus, setRentClearOnFocus] = useState<boolean>(false);

  // Sale Tab State
  const [salePriceInput, setSalePriceInput] = useState<string>('');
  const [isSaleFocused, setIsSaleFocused] = useState<boolean>(false);

  const [saleFee, setSaleFee] = useState<number | null>(null);
  const [saleTax, setSaleTax] = useState<number | null>(null);
  const [saleTotal, setSaleTotal] = useState<number | null>(null);
  const [saleError, setSaleError] = useState<string | null>(null);
  const [saleClearOnFocus, setSaleClearOnFocus] = useState<boolean>(false);

  // Copy toast state
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Calculate Mortgage & Rent (Tehran Formula):
  // حق‌الزحمه املاک = نیم درصد مبلغ رهن + یک چهارم مبلغ اجاره
  // مالیات بر ارزش افزوده = ۱۰٪ حق‌الزحمه
  // مجموع کمیسیون از هر طرف = حق‌الزحمه + مالیات
  const handleCalculateMortgage = () => {
    const mortgageVal = parseNumber(mortgageInput);
    const rentVal = parseNumber(rentInput);

    if (mortgageVal <= 0 && rentVal <= 0) {
      setMortgageError('لطفاً مبلغ رهن یا اجاره را وارد کنید');
      setMortgageFee(null);
      setMortgageTax(null);
      setMortgageTotal(null);
      return;
    }

    setMortgageError(null);
    const mortgagePart = mortgageVal * 0.005; // نیم درصد مبلغ رهن
    const rentPart = rentVal / 4.0;          // یک چهارم مبلغ اجاره
    const fee = Math.round(mortgagePart + rentPart);
    const tax = Math.round(fee * 0.10);
    const total = fee + tax;

    setMortgageFee(fee);
    setMortgageTax(tax);
    setMortgageTotal(total);

    setMortgageClearOnFocus(true);
    setRentClearOnFocus(true);
  };

  // Calculate Sale (Tehran Formula):
  // حق‌الزحمه املاک = بیست و پنج صدم درصد قیمت ملک (0.25%)
  // مالیات بر ارزش افزوده = ۱۰٪ حق‌الزحمه
  // مجموع کمیسیون از هر طرف = حق‌الزحمه + مالیات
  const handleCalculateSale = () => {
    const priceVal = parseNumber(salePriceInput);

    if (priceVal <= 0) {
      setSaleError('لطفاً قیمت معتبر ملک را وارد کنید');
      setSaleFee(null);
      setSaleTax(null);
      setSaleTotal(null);
      return;
    }

    setSaleError(null);
    const fee = Math.round(priceVal * 0.0025); // بیست و پنج صدم درصد (0.25%)
    const tax = Math.round(fee * 0.10);
    const total = fee + tax;

    setSaleFee(fee);
    setSaleTax(tax);
    setSaleTotal(total);

    setSaleClearOnFocus(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const copyMortgageResult = () => {
    if (mortgageTotal === null || mortgageFee === null || mortgageTax === null) return;
    const summary = [
      '📋 محاسبه کمیسیون رهن و اجاره (تهران)',
      `مبلغ رهن: ${toPersianDigits(mortgageInput || '0')} تومان`,
      `مبلغ اجاره: ${toPersianDigits(rentInput || '0')} تومان`,
      `حق‌الزحمه املاک (نیم درصد رهن + یک چهارم اجاره): ${toPersianDigits(mortgageFee)} تومان`,
      `مالیات بر ارزش افزوده (۱۰٪): ${toPersianDigits(mortgageTax)} تومان`,
      `مجموع کمیسیون از هر طرف: ${toPersianDigits(mortgageTotal)} تومان`,
      'اتحادیه مشاوران املاک تهران'
    ].join('\n');
    copyToClipboard(summary);
  };

  const copySaleResult = () => {
    if (saleTotal === null || saleFee === null || saleTax === null) return;
    const summary = [
      '📋 محاسبه کمیسیون خرید و فروش ملک (تهران)',
      `قیمت ملک: ${toPersianDigits(salePriceInput)} تومان`,
      `حق‌الزحمه املاک: ${toPersianDigits(saleFee)} تومان`,
      `مالیات بر ارزش افزوده (۱۰٪): ${toPersianDigits(saleTax)} تومان`,
      `مجموع کمیسیون از هر طرف: ${toPersianDigits(saleTotal)} تومان`,
      'اتحادیه مشاوران املاک تهران'
    ].join('\n');
    copyToClipboard(summary);
  };

  const resetCurrentTab = () => {
    if (activeTab === 0) {
      setMortgageInput('');
      setRentInput('');
      setMortgageFee(null);
      setMortgageTax(null);
      setMortgageTotal(null);
      setMortgageError(null);
    } else {
      setSalePriceInput('');
      setSaleFee(null);
      setSaleTax(null);
      setSaleTotal(null);
      setSaleError(null);
    }
  };

  // Palettes
  const bgClass = darkTheme 
    ? 'bg-gradient-to-b from-[#0c121d] via-[#111827] to-[#0c121d] text-[#f8f3ec]' 
    : 'bg-gradient-to-b from-[#faf5ee] via-[#f6e7d5] to-[#ebdcc9] text-[#141d2b]';
  const cardBg = darkTheme ? 'bg-[#192235]/95 border-[#263550]' : 'bg-white/95 border-[#ebdcc9]';
  const inputContainerBg = darkTheme ? 'bg-[#192235] border-[#263550]' : 'bg-white border-[#ebdcc9]';
  const textSub = darkTheme ? 'text-[#a2b2c8]' : 'text-[#5a6b82]';

  // Helper flags for floating labels
  const isMortgageActive = isMortgageFocused || mortgageInput.length > 0;
  const isRentActive = isRentFocused || rentInput.length > 0;
  const isSaleActive = isSaleFocused || salePriceInput.length > 0;

  return (
    <div className={`min-h-[100dvh] h-full w-full flex flex-col transition-colors duration-300 ${bgClass} select-none overflow-x-hidden`}>
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* 1. Header & Tabs */}
        <div>
          {/* Top Bar */}
          <div className={`px-4 py-3 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-20 ${
            darkTheme ? 'bg-[#192235]/90 border-[#263550]' : 'bg-white/90 border-[#ebdcc9]'
          }`}>
            {/* Back Button */}
            <button
              type="button"
              id="calc-back-btn"
              onClick={onNavigateBack}
              aria-label="بازگشت"
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all active:scale-95 shadow-sm ${
                darkTheme 
                  ? 'bg-[#192235] border-[#263550] text-[#f8f3ec] hover:bg-[#202c44]' 
                  : 'bg-[#faf5ee] border-[#ebdcc9] text-[#141d2b] hover:bg-[#ebdcc9]'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Title with Lalezar Font */}
            <h2 className={`font-['Lalezar',sans-serif] text-xl sm:text-2xl tracking-wide ${
              darkTheme ? 'text-[#fef08a]' : 'text-[#1e3a8a]'
            }`}>
              کمیسیون املاک تهران
            </h2>

            {/* Actions: Reset & Theme */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="calc-reset-btn"
                onClick={resetCurrentTab}
                title="پاک کردن فرم"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all active:scale-95 shadow-sm ${
                  darkTheme 
                    ? 'bg-[#192235] border-[#263550] text-[#a2b2c8] hover:text-[#fb8438]' 
                    : 'bg-[#faf5ee] border-[#ebdcc9] text-[#5a6b82] hover:text-[#0298b3]'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="calc-theme-btn"
                onClick={onToggleTheme}
                aria-label="تغییر تم"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all active:scale-95 shadow-sm ${
                  darkTheme 
                    ? 'bg-[#192235] border-[#263550] text-[#fb8438] hover:bg-[#202c44]' 
                    : 'bg-[#faf5ee] border-[#ebdcc9] text-[#0298b3] hover:bg-[#ebdcc9]'
                }`}
              >
                {darkTheme ? <Sun className="w-5 h-5 text-[#fb8438]" /> : <Moon className="w-5 h-5 text-[#0298b3]" />}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`grid grid-cols-2 border-b text-center font-bold text-base sm:text-lg ${
            darkTheme ? 'bg-[#151d2c]/80 border-[#263550]' : 'bg-white/80 border-[#ebdcc9]'
          }`}>
            <button
              type="button"
              id="tab-mortgage-rent"
              onClick={() => setActiveTab(0)}
              className={`py-3.5 relative transition-all flex items-center justify-center gap-2 ${
                activeTab === 0 
                  ? darkTheme ? 'text-[#16b4d2] font-black' : 'text-[#0298b3] font-black' 
                  : textSub
              }`}
            >
              <Home className="w-5 h-5" />
              <span>رهن و اجاره</span>
              {activeTab === 0 && (
                <motion.div 
                  layoutId="tab-indicator"
                  className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${
                    darkTheme ? 'bg-[#16b4d2]' : 'bg-[#0298b3]'
                  }`} 
                />
              )}
            </button>

            <button
              type="button"
              id="tab-sale"
              onClick={() => setActiveTab(1)}
              className={`py-3.5 relative transition-all flex items-center justify-center gap-2 ${
                activeTab === 1 
                  ? darkTheme ? 'text-[#16b4d2] font-black' : 'text-[#0298b3] font-black' 
                  : textSub
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>خرید و فروش</span>
              {activeTab === 1 && (
                <motion.div 
                  layoutId="tab-indicator"
                  className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${
                    darkTheme ? 'bg-[#16b4d2]' : 'bg-[#0298b3]'
                  }`} 
                />
              )}
            </button>
          </div>
        </div>

        {/* 2. Form & Calculation Results */}
        <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto">
          {activeTab === 0 ? (
            /* Tab 1: Mortgage & Rent */
            <div className="space-y-4 pt-1">
              {/* Mortgage Input Field with Floating Label */}
              <div className="relative pt-1.5">
                <div 
                  className={`relative flex items-center rounded-2xl border p-2.5 transition-all shadow-xs ${inputContainerBg} ${
                    isMortgageFocused 
                      ? darkTheme ? 'border-[#16b4d2] ring-2 ring-[#16b4d2]/20' : 'border-[#0298b3] ring-2 ring-[#0298b3]/20'
                      : ''
                  }`}
                >
                  <div className={`p-2 rounded-xl flex-shrink-0 ${darkTheme ? 'bg-[#0c121d] text-[#16b4d2]' : 'bg-[#e5f6f9] text-[#0298b3]'}`}>
                    <Home className="w-5 h-5" />
                  </div>

                  {/* Floating Animated Label */}
                  <label
                    htmlFor="mortgage-input"
                    className={`absolute pointer-events-none transition-all duration-200 ease-out z-10 ${
                      isMortgageActive
                        ? `-top-3 right-4 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-md shadow-xs ${
                            darkTheme 
                              ? 'bg-[#192235] text-[#16b4d2] border border-[#263550]' 
                              : 'bg-white text-[#0298b3] border border-[#ebdcc9]'
                          }`
                        : `right-14 top-1/2 -translate-y-1/2 text-sm sm:text-base font-bold ${
                            darkTheme ? 'text-gray-400' : 'text-gray-500'
                          }`
                    }`}
                  >
                    مبلغ رهن (تومان)
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    id="mortgage-input"
                    value={toPersianDigits(mortgageInput)}
                    placeholder=""
                    onFocus={() => {
                      setIsMortgageFocused(true);
                      if (mortgageClearOnFocus) {
                        setMortgageInput('');
                        setMortgageClearOnFocus(false);
                      }
                    }}
                    onBlur={() => setIsMortgageFocused(false)}
                    onChange={(e) => {
                      const cleaned = cleanDigits(e.target.value);
                      if (cleaned.length <= 16) {
                        setMortgageInput(cleaned);
                        setMortgageError(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCalculateMortgage();
                    }}
                    className="flex-1 bg-transparent px-3 text-xl sm:text-2xl font-black outline-hidden text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Rent Input Field with Floating Label */}
              <div className="relative pt-1.5">
                <div 
                  className={`relative flex items-center rounded-2xl border p-2.5 transition-all shadow-xs ${inputContainerBg} ${
                    isRentFocused 
                      ? darkTheme ? 'border-[#16b4d2] ring-2 ring-[#16b4d2]/20' : 'border-[#0298b3] ring-2 ring-[#0298b3]/20'
                      : ''
                  }`}
                >
                  <div className={`p-2 rounded-xl flex-shrink-0 ${darkTheme ? 'bg-[#0c121d] text-[#16b4d2]' : 'bg-[#e5f6f9] text-[#0298b3]'}`}>
                    <Wallet className="w-5 h-5" />
                  </div>

                  {/* Floating Animated Label */}
                  <label
                    htmlFor="rent-input"
                    className={`absolute pointer-events-none transition-all duration-200 ease-out z-10 ${
                      isRentActive
                        ? `-top-3 right-4 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-md shadow-xs ${
                            darkTheme 
                              ? 'bg-[#192235] text-[#16b4d2] border border-[#263550]' 
                              : 'bg-white text-[#0298b3] border border-[#ebdcc9]'
                          }`
                        : `right-14 top-1/2 -translate-y-1/2 text-sm sm:text-base font-bold ${
                            darkTheme ? 'text-gray-400' : 'text-gray-500'
                          }`
                    }`}
                  >
                    مبلغ اجاره (تومان)
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    id="rent-input"
                    value={toPersianDigits(rentInput)}
                    placeholder=""
                    onFocus={() => {
                      setIsRentFocused(true);
                      if (rentClearOnFocus) {
                        setRentInput('');
                        setRentClearOnFocus(false);
                      }
                    }}
                    onBlur={() => setIsRentFocused(false)}
                    onChange={(e) => {
                      const cleaned = cleanDigits(e.target.value);
                      if (cleaned.length <= 16) {
                        setRentInput(cleaned);
                        setMortgageError(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCalculateMortgage();
                    }}
                    className="flex-1 bg-transparent px-3 text-xl sm:text-2xl font-black outline-hidden text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Error Notification */}
              {mortgageError && (
                <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-500 text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{mortgageError}</span>
                </div>
              )}

              {/* Calculate Button */}
              <button
                type="button"
                id="calculate-mortgage-btn"
                onClick={handleCalculateMortgage}
                className={`w-full h-14 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] text-white ${
                  darkTheme 
                    ? 'bg-[#0298b3] hover:bg-[#16b4d2] border border-[#16b4d2]/40' 
                    : 'bg-[#007a91] hover:bg-[#0298b3] border border-[#0298b3]/40'
                }`}
              >
                <Calculator className="w-5 h-5" />
                <span>محاسبه کن</span>
              </button>

              {/* Results Display */}
              <AnimatePresence mode="wait">
                {mortgageTotal !== null ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-3 pt-2"
                  >
                    {/* Fee Card */}
                    <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between ${cardBg}`}>
                      <div>
                        <span className={`text-sm sm:text-base font-bold ${textSub}`}>حق‌الزحمه املاک (نیم درصد رهن + یک‌چهارم اجاره)</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-2xl sm:text-3xl font-black">{toPersianDigits(mortgageFee ?? 0)}</span>
                          <span className={`text-sm sm:text-base font-bold ${textSub}`}>تومان</span>
                        </div>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        darkTheme ? 'bg-[#0c121d] text-[#16b4d2]' : 'bg-[#e5f6f9] text-[#0298b3]'
                      }`}>
                        <Wallet className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Tax Card (10%) */}
                    <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between ${cardBg}`}>
                      <div>
                        <span className={`text-sm sm:text-base font-bold ${textSub}`}>مالیات بر ارزش افزوده (۱۰٪)</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-2xl sm:text-3xl font-black text-[#f06a1d]">{toPersianDigits(mortgageTax ?? 0)}</span>
                          <span className={`text-sm sm:text-base font-bold ${textSub}`}>تومان</span>
                        </div>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        darkTheme ? 'bg-[#0c121d] text-[#f06a1d]' : 'bg-[#fdf0e6] text-[#f06a1d]'
                      }`}>
                        <Receipt className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Total Card */}
                    <div className={`p-4 sm:p-5 rounded-3xl border shadow-lg flex items-center justify-between text-white ${
                      darkTheme ? 'bg-[#1e3f8c] border-[#456fd8]' : 'bg-[#2b55ba] border-[#456fd8]'
                    }`}>
                      <div>
                        <span className="text-sm sm:text-base font-bold opacity-90">مجموع کمیسیون قابل دریافت از هر طرف</span>
                        <div className="flex items-baseline gap-2 mt-1.5">
                          <span className="text-3xl sm:text-4xl font-black">{toPersianDigits(mortgageTotal)}</span>
                          <span className="text-sm sm:text-base font-bold opacity-85">تومان</span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium opacity-85 mt-1">
                          {numberToWordsPersian(mortgageTotal)}
                        </div>
                      </div>

                      <button
                        type="button"
                        id="copy-mortgage-btn"
                        onClick={copyMortgageResult}
                        aria-label="کپی نتیجه"
                        className="w-12 h-12 rounded-full bg-[#f06a1d] hover:bg-[#fb8438] active:scale-95 text-white flex items-center justify-center shadow-md transition-all flex-shrink-0"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className={`p-6 rounded-2xl border text-center space-y-2 shadow-xs ${cardBg}`}>
                    <div className="w-10 h-10 mx-auto rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <p className={`text-sm sm:text-base font-medium ${textSub}`}>
                      مبالغ رهن و اجاره را وارد کرده و روی «محاسبه کن» بزنید
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Tab 2: Sale (خرید و فروش) */
            <div className="space-y-4 pt-1">
              {/* Property Price Input Field with Floating Label */}
              <div className="relative pt-1.5">
                <div 
                  className={`relative flex items-center rounded-2xl border p-2.5 transition-all shadow-xs ${inputContainerBg} ${
                    isSaleFocused 
                      ? darkTheme ? 'border-[#16b4d2] ring-2 ring-[#16b4d2]/20' : 'border-[#0298b3] ring-2 ring-[#0298b3]/20'
                      : ''
                  }`}
                >
                  <div className={`p-2 rounded-xl flex-shrink-0 ${darkTheme ? 'bg-[#0c121d] text-[#16b4d2]' : 'bg-[#e5f6f9] text-[#0298b3]'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>

                  {/* Floating Animated Label */}
                  <label
                    htmlFor="sale-price-input"
                    className={`absolute pointer-events-none transition-all duration-200 ease-out z-10 ${
                      isSaleActive
                        ? `-top-3 right-4 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-md shadow-xs ${
                            darkTheme 
                              ? 'bg-[#192235] text-[#16b4d2] border border-[#263550]' 
                              : 'bg-white text-[#0298b3] border border-[#ebdcc9]'
                          }`
                        : `right-14 top-1/2 -translate-y-1/2 text-sm sm:text-base font-bold ${
                            darkTheme ? 'text-gray-400' : 'text-gray-500'
                          }`
                    }`}
                  >
                    قیمت ملک (تومان)
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    id="sale-price-input"
                    value={toPersianDigits(salePriceInput)}
                    placeholder=""
                    onFocus={() => {
                      setIsSaleFocused(true);
                      if (saleClearOnFocus) {
                        setSalePriceInput('');
                        setSaleClearOnFocus(false);
                      }
                    }}
                    onBlur={() => setIsSaleFocused(false)}
                    onChange={(e) => {
                      const cleaned = cleanDigits(e.target.value);
                      if (cleaned.length <= 16) {
                        setSalePriceInput(cleaned);
                        setSaleError(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCalculateSale();
                    }}
                    className="flex-1 bg-transparent px-3 text-xl sm:text-2xl font-black outline-hidden text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Error Notification */}
              {saleError && (
                <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-500 text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{saleError}</span>
                </div>
              )}

              {/* Calculate Button */}
              <button
                type="button"
                id="calculate-sale-btn"
                onClick={handleCalculateSale}
                className={`w-full h-14 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] text-white ${
                  darkTheme 
                    ? 'bg-[#0298b3] hover:bg-[#16b4d2] border border-[#16b4d2]/40' 
                    : 'bg-[#007a91] hover:bg-[#0298b3] border border-[#0298b3]/40'
                }`}
              >
                <Calculator className="w-5 h-5" />
                <span>محاسبه کن</span>
              </button>

              {/* Results Display */}
              <AnimatePresence mode="wait">
                {saleTotal !== null ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-3 pt-2"
                  >
                    {/* Fee Card (without 25% text as explicitly requested) */}
                    <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between ${cardBg}`}>
                      <div>
                        <span className={`text-sm sm:text-base font-bold ${textSub}`}>حق‌الزحمه املاک</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-2xl sm:text-3xl font-black">{toPersianDigits(saleFee ?? 0)}</span>
                          <span className={`text-sm sm:text-base font-bold ${textSub}`}>تومان</span>
                        </div>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        darkTheme ? 'bg-[#0c121d] text-[#16b4d2]' : 'bg-[#e5f6f9] text-[#0298b3]'
                      }`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Tax Card (10%) */}
                    <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between ${cardBg}`}>
                      <div>
                        <span className={`text-sm sm:text-base font-bold ${textSub}`}>مالیات بر ارزش افزوده (۱۰٪)</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-2xl sm:text-3xl font-black text-[#f06a1d]">{toPersianDigits(saleTax ?? 0)}</span>
                          <span className={`text-sm sm:text-base font-bold ${textSub}`}>تومان</span>
                        </div>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        darkTheme ? 'bg-[#0c121d] text-[#f06a1d]' : 'bg-[#fdf0e6] text-[#f06a1d]'
                      }`}>
                        <Receipt className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Total Card */}
                    <div className={`p-4 sm:p-5 rounded-3xl border shadow-lg flex items-center justify-between text-white ${
                      darkTheme ? 'bg-[#1e3f8c] border-[#456fd8]' : 'bg-[#2b55ba] border-[#456fd8]'
                    }`}>
                      <div>
                        <span className="text-sm sm:text-base font-bold opacity-90">مجموع کمیسیون قابل دریافت از هر طرف</span>
                        <div className="flex items-baseline gap-2 mt-1.5">
                          <span className="text-3xl sm:text-4xl font-black">{toPersianDigits(saleTotal)}</span>
                          <span className="text-sm sm:text-base font-bold opacity-85">تومان</span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium opacity-85 mt-1">
                          {numberToWordsPersian(saleTotal)}
                        </div>
                      </div>

                      <button
                        type="button"
                        id="copy-sale-btn"
                        onClick={copySaleResult}
                        aria-label="کپی نتیجه"
                        className="w-12 h-12 rounded-full bg-[#f06a1d] hover:bg-[#fb8438] active:scale-95 text-white flex items-center justify-center shadow-md transition-all flex-shrink-0"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className={`p-6 rounded-2xl border text-center space-y-2 shadow-xs ${cardBg}`}>
                    <div className="w-10 h-10 mx-auto rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <p className={`text-sm sm:text-base font-medium ${textSub}`}>
                      قیمت ملک را وارد کرده و روی «محاسبه کن» بزنید
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Copied Toast */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#10b981] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>نتیجه محاسبه در کلیپ‌بورد کپی شد</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
