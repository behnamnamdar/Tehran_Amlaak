import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Sun, 
  Moon, 
  LogOut, 
  Phone, 
  ArrowLeft,
  CheckCircle2,
  BookmarkPlus,
  Layers,
  ExternalLink,
  Calculator,
  Download,
  Smartphone
} from 'lucide-react';

interface WelcomeScreenProps {
  darkTheme: boolean;
  onToggleTheme: () => void;
  onEnterApp: () => void;
  onNavigateToFeatures: () => void;
}

const PRODUCER_NAME = "داود بیگی نژاد";
const PRODUCER_TITLE = "معاون اول اتحادیه املاک تهران";
const PRODUCER_PHONE = "09122544338";

const SOCIAL_LINKS = [
  {
    id: 'whatsapp',
    name: 'کانال واتس‌اپ',
    url: 'http://whatsapp.com/channel/0029Vb3cOjq30LKPRxuEi82a',
    color: '#25D366',
    icon: (
      <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.972.531 1.731.782 2.781.783h.001c3.18 0 5.767-2.587 5.768-5.766 0-1.541-.6-2.99-1.69-4.08-1.09-1.09-2.539-1.687-4.079-1.687zm0-2.172c4.385 0 7.94 3.555 7.94 7.938 0 2.12-.826 4.113-2.326 5.613-1.5 1.5-3.492 2.325-5.614 2.325h-.001c-1.349 0-2.673-.346-3.844-.999l-5.686 1.491 1.517-5.542c-.714-1.239-1.09-2.651-1.09-4.088 0-4.383 3.555-7.938 7.94-7.938zm-3.696 5.864c-.201-.448-.415-.457-.607-.465l-.517-.008c-.179 0-.469.067-.715.335-.246.269-.938.917-.938 2.236s.96 2.593 1.094 2.772c.134.179 1.85 2.969 4.57 4.025 2.261.877 2.72.703 3.212.658.492-.045 1.586-.648 1.81-1.275.223-.627.223-1.164.156-1.276-.067-.112-.246-.179-.514-.313-.269-.134-1.587-.783-1.833-.872-.246-.09-.425-.134-.604.134-.179.269-.693.873-.85 1.052-.157.179-.313.201-.582.067-.269-.134-1.135-.418-2.161-1.334-.799-.712-1.338-1.592-1.495-1.861-.157-.269-.017-.414.118-.548.121-.12.269-.313.403-.47.134-.157.179-.269.269-.448.09-.179.045-.335-.022-.47-.067-.134-.604-1.456-.828-1.993z"/>
      </svg>
    )
  },
  {
    id: 'bale',
    name: 'کانال بله',
    url: 'http://ble.ir/join/ZTA2ZDJlMT',
    color: '#00a86b',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#00A86B" />
        <path d="M7 11.5L10.5 15L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'telegram',
    name: 'کانال تلگرام',
    url: 'http://t.me/davidbeygi',
    color: '#229ED9',
    icon: (
      <svg className="w-5 h-5 fill-[#229ED9]" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 4-1.74 6.68-2.88 8.02-3.44 3.83-1.58 4.62-1.86 5.15-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.2-.04.37z"/>
      </svg>
    )
  },
  {
    id: 'instagram',
    name: 'پیج اینستاگرام',
    url: 'http://instagram.com/davidbeygi',
    color: '#E4405F',
    icon: (
      <svg className="w-5 h-5 fill-[#E4405F]" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  darkTheme,
  onToggleTheme,
  onEnterApp,
  onNavigateToFeatures,
}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);

  const handlePhoneCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(PRODUCER_PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
    window.location.href = `tel:${PRODUCER_PHONE}`;
  };

  // Save Contact to Mobile Contacts (.vcf export or native Android intent)
  const handleSaveContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof window !== 'undefined' && (window as any).Android?.saveContact) {
        (window as any).Android.saveContact(PRODUCER_NAME, PRODUCER_PHONE, PRODUCER_TITLE);
        setContactSaved(true);
        setTimeout(() => setContactSaved(false), 3000);
        return;
      }
    } catch (err) {
      console.error(err);
    }

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${PRODUCER_NAME} ${PRODUCER_TITLE}`,
      `N:بیگی نژاد;داود;;${PRODUCER_TITLE};`,
      `ORG:اتحادیه صنف مشاوران املاک تهران`,
      `TITLE:${PRODUCER_TITLE}`,
      `TEL;TYPE=CELL,VOICE,PREF:${PRODUCER_PHONE}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Davoud_Beygi_Nezhad.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 3000);
  };

  return (
    <div className="relative min-h-[100dvh] h-full w-full flex flex-col items-center justify-between p-2.5 sm:p-4 md:py-6 overflow-y-auto select-none">
      {/* Background image & gradient scrim */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url('./assets/img_real_estate_bg.jpg')` }}
      >
        <div 
          className={`absolute inset-0 transition-colors duration-500 ${
            darkTheme 
              ? 'bg-gradient-to-b from-[#0c121d]/85 via-[#111827]/92 to-[#0c121d]/95' 
              : 'bg-gradient-to-b from-[#faf5ee]/80 via-[#f6e7d5]/90 to-[#ebdcc9]/95'
          }`} 
        />
      </div>

      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md flex-1 flex flex-col justify-between py-2 sm:py-3 px-2 sm:px-3 space-y-3 sm:space-y-4"
      >
        {/* 1. Top Navigation Bar */}
        <header className="flex items-center justify-between w-full mb-1 sm:mb-1.5 flex-shrink-0">
          {/* Exit Button */}
          <button
            type="button"
            id="top-exit-btn"
            onClick={() => setShowExitModal(true)}
            aria-label="خروج"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all active:scale-95 shadow-sm ${
              darkTheme 
                ? 'bg-[#192235]/90 border-[#263550] text-[#fb8438] hover:bg-[#202c44]' 
                : 'bg-white/95 border-[#ebdcc9] text-[#0298b3] hover:bg-[#faf5ee]'
            }`}
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
          </button>

          {/* Badge: اتحادیه مشاوران املاک تهران */}
          <div 
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border shadow-sm ${
              darkTheme 
                ? 'bg-[#192235]/90 border-[#263550] text-[#faf5ee]' 
                : 'bg-white/95 border-[#ebdcc9] text-[#141d2b]'
            }`}
          >
            <span className="text-sm sm:text-base font-bold tracking-tight">اتحادیه مشاوران املاک تهران</span>
            <Building2 className={`w-4 h-4 ${darkTheme ? 'text-[#fb8438]' : 'text-[#0298b3]'}`} />
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            id="top-theme-btn"
            onClick={onToggleTheme}
            aria-label="تغییر تم"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all active:scale-95 shadow-sm ${
              darkTheme 
                ? 'bg-[#192235]/90 border-[#263550] text-[#fb8438] hover:bg-[#202c44]' 
                : 'bg-white/95 border-[#ebdcc9] text-[#0298b3] hover:bg-[#faf5ee]'
            }`}
          >
            {darkTheme ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#fb8438]" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0298b3]" />
            )}
          </button>
        </header>

        {/* 2. Middle Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center py-2 space-y-3 sm:space-y-4">
          
          {/* Logo with 100% Full Visibility and Zero Clipping */}
          <div className="relative group flex items-center justify-center my-1">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Layer 1: Ambient breathing glow */}
              <motion.div 
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.45, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-1 rounded-full blur-xl pointer-events-none bg-[#36c2bb]/30"
              />

              {/* Central Real Estate Logo based on user uploaded ss.JPG */}
              <motion.div 
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img 
                  src="./assets/real-estate-logo.svg" 
                  alt="لوگوی کمیسیون املاک تهران"
                  className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/real-estate-logo.jpg';
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Main Title: کمیسیون املاک تهران (متن سامانه رسمی محاسبه تعرفه قانونی... حذف شد) */}
          <div className="text-center">
            <h1 className={`font-['Lalezar',sans-serif] text-3xl sm:text-4xl tracking-wide leading-tight ${
              darkTheme 
                ? 'text-[#fef08a] drop-shadow-[0_2px_14px_rgba(251,191,36,0.35)]' 
                : 'text-[#1e3a8a] drop-shadow-xs'
            }`}>
              کمیسیون املاک تهران
            </h1>
          </div>

          {/* Social Channels Section (WhatsApp, Bale, Telegram, Instagram) */}
          <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className={`text-xs sm:text-sm font-bold ${darkTheme ? 'text-[#a2b2c8]' : 'text-[#5a6b82]'}`}>
                کانال‌ها و راه‌های ارتباطی رسمی:
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`social-link-${item.id}`}
                  className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs group ${
                    darkTheme ? 'bg-[#192235]/90 border-[#263550]' : 'bg-white/90 border-[#ebdcc9]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${darkTheme ? 'text-[#f8f3ec]' : 'text-[#141d2b]'}`}>
                      {item.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Producer Card: داود بیگی نژاد with Improved Harmonious Red Save Contact Button */}
          <div 
            id="producer-card"
            className={`w-full p-3 sm:p-3.5 rounded-xl border shadow-sm flex flex-col gap-2.5 ${
              darkTheme 
                ? 'bg-[#1e3f8c] border-[#456fd8] text-white' 
                : 'bg-[#2b55ba] border-[#456fd8] text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm sm:text-base font-bold block leading-tight">
                  تهیه کننده: {PRODUCER_NAME}
                </span>
                <span className="text-xs sm:text-sm opacity-85 block mt-0.5 leading-tight">
                  {PRODUCER_TITLE}
                </span>
              </div>

              {/* Call / Phone Badge */}
              <button
                type="button"
                id="producer-phone-btn"
                onClick={handlePhoneCall}
                title="تماس یا کپی شماره"
                className="flex items-center gap-1.5 bg-[#f06a1d] hover:bg-[#d3540f] active:scale-95 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-black shadow-xs transition-all"
              >
                {copiedPhone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">{PRODUCER_PHONE}</span>
                  </>
                )}
              </button>
            </div>

            {/* Save Contact Button with Harmonious Crimson Red Styling */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs sm:text-sm opacity-90 font-medium">
                ذخیره مستقیم شماره در مخاطبین:
              </span>
              <button
                type="button"
                id="save-contact-btn"
                onClick={handleSaveContact}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] active:scale-95 text-white text-xs sm:text-sm font-black transition-all shadow-xs border border-red-400/40"
              >
                {contactSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-black">ذخیره شد!</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>ذخیره مخاطب</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </main>

        {/* 3. Bottom Action Buttons: ورود به برنامه (متن در وسط و بدون آیکون راست)، امکانات نرم‌افزار، دکمه خروج */}
        <footer className="w-full pt-1 sm:pt-2 flex-shrink-0">
          {/* Main Enter App Button: Centered text and NO icon on right */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            id="enter-app-btn"
            onClick={onEnterApp}
            className={`w-full h-12 sm:h-13 rounded-2xl flex items-center justify-center font-black text-base sm:text-lg shadow-md transition-all text-white mb-3 sm:mb-3.5 ${
              darkTheme 
                ? 'bg-[#0298b3] hover:bg-[#16b4d2] border border-[#16b4d2]/50 shadow-[#0298b3]/25' 
                : 'bg-[#007a91] hover:bg-[#0298b3] border border-[#0298b3]/40 shadow-[#007a91]/20'
            }`}
          >
            <span>ورود به برنامه</span>
          </motion.button>

          {/* Grid with Features Button and Exit Button with clear separation */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Distinct Colored Button: امکانات نرم افزار */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="button"
              id="features-app-btn"
              onClick={onNavigateToFeatures}
              className="h-11 sm:h-12 rounded-xl flex items-center justify-center gap-1.5 font-bold text-sm sm:text-base text-white shadow-xs transition-all bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#f97316] hover:brightness-110 active:scale-95 border border-amber-400/40 shadow-amber-500/20"
            >
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>امکانات نرم‌افزار</span>
            </motion.button>

            {/* Exit App Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="button"
              id="bottom-exit-btn"
              onClick={() => setShowExitModal(true)}
              className={`h-11 sm:h-12 rounded-xl flex items-center justify-center gap-1.5 font-bold text-sm sm:text-base border transition-all active:scale-95 shadow-xs ${
                darkTheme 
                  ? 'bg-[#192235]/90 border-[#263550] text-[#fb8438] hover:bg-[#202c44]' 
                  : 'bg-white/95 border-[#ebdcc9] text-[#e05600] hover:bg-[#faf5ee]'
              }`}
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              <span>خروج از برنامه</span>
            </motion.button>
          </div>
        </footer>
      </motion.div>

      {/* Exit confirmation modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl text-center space-y-4 ${
              darkTheme ? 'bg-[#192235] border-[#263550] text-white' : 'bg-white border-[#ebdcc9] text-[#141d2b]'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#f06a1d]/15 text-[#f06a1d] flex items-center justify-center">
              <LogOut className="w-6 h-6 rotate-180" />
            </div>
            <h3 className="text-lg font-black">آیا قصد خروج دارید؟</h3>
            <p className={`text-xs ${darkTheme ? 'text-[#a2b2c8]' : 'text-[#5a6b82]'}`}>
              برای استفاده مجدد، می‌توانید همین صفحه را باز نگه دارید یا میانبر برنامه را به صفحه اصلی گوشی اضافه نمایید.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowExitModal(false);
                  try {
                    if (typeof window !== 'undefined' && (window as any).Android?.exitApp) {
                      (window as any).Android.exitApp();
                      return;
                    }
                  } catch (err) {
                    console.error(err);
                  }
                  window.close();
                }}
                className="flex-1 py-3 rounded-2xl bg-[#ef4444] hover:bg-[#dc2626] text-white text-sm font-bold"
              >
                بستن برنامه
              </button>
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className={`flex-1 py-3 rounded-2xl border text-sm font-bold ${
                  darkTheme ? 'border-[#263550] text-[#a2b2c8] hover:bg-[#202c44]' : 'border-[#ebdcc9] text-[#5a6b82] hover:bg-gray-100'
                }`}
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Saved Toast */}
      <AnimatePresence>
        {contactSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#10b981] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>شماره با عنوان «داود بیگی نژاد معاون اول اتحادیه املاک تهران» ذخیره شد</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
