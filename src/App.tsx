import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CalculatorScreen } from './components/CalculatorScreen';
import { FeaturesScreen } from './components/FeaturesScreen';
import { ScreenType } from './types';

export default function App() {
  // Theme state: defaults to dark theme (true) matching the app design
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('commission_app_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  // Current screen: 'welcome' | 'calculator' | 'features'
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  useEffect(() => {
    localStorage.setItem('commission_app_dark_mode', darkTheme.toString());
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  // Support browser/hardware back button navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const stateScreen = e.state?.screen as ScreenType | undefined;
      if (stateScreen) {
        setCurrentScreen(stateScreen);
      } else {
        setCurrentScreen('welcome');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToCalculator = () => {
    window.history.pushState({ screen: 'calculator' }, '');
    setCurrentScreen('calculator');
  };

  const navigateToFeatures = () => {
    window.history.pushState({ screen: 'features' }, '');
    setCurrentScreen('features');
  };

  const navigateToWelcome = () => {
    if (window.history.state?.screen) {
      window.history.back();
    } else {
      setCurrentScreen('welcome');
    }
  };

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${darkTheme ? 'bg-[#0c121d]' : 'bg-[#faf5ee]'}`}>
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            <WelcomeScreen
              darkTheme={darkTheme}
              onToggleTheme={toggleTheme}
              onEnterApp={navigateToCalculator}
              onNavigateToFeatures={navigateToFeatures}
            />
          </motion.div>
        )}

        {currentScreen === 'calculator' && (
          <motion.div
            key="calculator-screen"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            <CalculatorScreen
              darkTheme={darkTheme}
              onToggleTheme={toggleTheme}
              onNavigateBack={navigateToWelcome}
            />
          </motion.div>
        )}

        {currentScreen === 'features' && (
          <motion.div
            key="features-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            <FeaturesScreen
              darkTheme={darkTheme}
              onToggleTheme={toggleTheme}
              onNavigateBack={navigateToWelcome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
