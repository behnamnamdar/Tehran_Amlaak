import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  MessageSquareQuote, 
  Wrench, 
  Award, 
  FileCheck2, 
  UserCheck, 
  Building,
  Clock3,
  Layers
} from 'lucide-react';

interface FeaturesScreenProps {
  darkTheme: boolean;
  onNavigateBack: () => void;
  onToggleTheme: () => void;
}

interface FeatureItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

const FEATURES_LIST: FeatureItem[] = [
  {
    id: 'consultation',
    title: 'مشاوره',
    icon: MessageSquareQuote,
  },
  {
    id: 'service',
    title: 'سرویس',
    icon: Wrench,
  },
  {
    id: 'appraisal',
    title: 'کارشناسی',
    icon: Award,
  },
  {
    id: 'post_contract',
    title: 'خدمات پس از قرارداد',
    icon: FileCheck2,
  },
  {
    id: 'technician',
    title: 'معرفی تکنسین',
    icon: UserCheck,
  },
  {
    id: 'building_management',
    title: 'نگهداری و مدیریت ساختمان',
    icon: Building,
  },
];

export const FeaturesScreen: React.FC<FeaturesScreenProps> = ({
  darkTheme,
  onNavigateBack,
  onToggleTheme,
}) => {
  const bgClass = darkTheme 
    ? 'bg-gradient-to-b from-[#0c121d] via-[#111827] to-[#0c121d] text-[#f8f3ec]' 
    : 'bg-gradient-to-b from-[#faf5ee] via-[#f6e7d5] to-[#ebdcc9] text-[#141d2b]';
  const cardBg = darkTheme ? 'bg-[#192235]/80 border-[#263550]' : 'bg-white/80 border-[#ebdcc9]';
  const textSub = darkTheme ? 'text-[#a2b2c8]' : 'text-[#5a6b82]';

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-300 ${bgClass} select-none`}>
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-between">
        {/* Top Header */}
        <div>
          <div className={`px-4 py-3 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-20 ${
            darkTheme ? 'bg-[#192235]/90 border-[#263550]' : 'bg-white/90 border-[#ebdcc9]'
          }`}>
            <button
              type="button"
              id="features-back-btn"
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

            <div className="flex items-center gap-2">
              <Layers className={`w-5 h-5 ${darkTheme ? 'text-[#f59e0b]' : 'text-[#d97706]'}`} />
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                امکانات نرم‌افزار
              </h2>
            </div>

            <button
              type="button"
              id="features-theme-btn"
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

          {/* Subtitle Banner */}
          <div className="p-4 sm:p-5">
            <div className={`p-4 rounded-2xl border text-center space-y-1.5 shadow-xs ${cardBg}`}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-500 border border-amber-500/30">
                <Clock3 className="w-3.5 h-3.5" />
                <span>به‌زودی در دسترس قرار می‌گیرد</span>
              </div>
              <p className={`text-xs ${textSub} leading-relaxed pt-1`}>
                خدمات تخصصی و امکانات جدید نرم‌افزار در فاز توسعه قرار دارند و پس از راه‌اندازی فعال خواهند شد.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons List (All Disabled as requested) */}
        <div className="flex-1 px-4 sm:px-5 space-y-3 pb-6 overflow-y-auto">
          {FEATURES_LIST.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.button
                key={item.id}
                id={`feature-btn-${item.id}`}
                disabled={true}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-full p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between text-right cursor-not-allowed opacity-75 transition-all shadow-xs ${
                  darkTheme 
                    ? 'bg-[#151d2c]/90 border-[#263550] text-gray-400' 
                    : 'bg-white/90 border-[#ebdcc9] text-gray-500'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    darkTheme 
                      ? 'bg-[#192235] text-amber-400/70 border border-[#263550]' 
                      : 'bg-[#fffbeb] text-amber-600/80 border border-amber-200'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm sm:text-base font-black ${
                      darkTheme ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                  <span>غیرفعال</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className={`p-4 border-t ${
          darkTheme ? 'bg-[#0c121d] border-[#263550]' : 'bg-[#faf5ee] border-[#ebdcc9]'
        }`}>
          <button
            type="button"
            id="features-bottom-return-btn"
            onClick={onNavigateBack}
            className={`w-full h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm border transition-all active:scale-95 shadow-sm ${
              darkTheme 
                ? 'bg-[#192235] border-[#263550] text-white hover:bg-[#202c44]' 
                : 'bg-white border-[#ebdcc9] text-[#141d2b] hover:bg-[#ebdcc9]'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به صفحه اصلی</span>
          </button>
        </div>
      </div>
    </div>
  );
};
