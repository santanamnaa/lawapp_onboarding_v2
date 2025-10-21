import { useState, useEffect } from "react";
import { MobileContainer } from "./components/MobileContainer";
import { SplashScreen } from "./components/screens/SplashScreen";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { MainApp } from "./components/MainApp";
import { Toaster } from "./components/ui/sonner";

export type Screen = 
  | "splash" 
  | "onboarding" 
  | "login" 
  | "register" 
  | "main";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate splash screen delay
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        // Check if user has seen onboarding
        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        const authToken = localStorage.getItem("authToken");
        
        if (authToken) {
          setIsAuthenticated(true);
          setCurrentScreen("main");
        } else if (hasSeenOnboarding) {
          setCurrentScreen("login");
        } else {
          setCurrentScreen("onboarding");
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    localStorage.setItem("authToken", "mock-token-123");
    setIsAuthenticated(true);
    setCurrentScreen("main");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setCurrentScreen("login");
  };

  return (
    <div className="size-full bg-gray-100 flex items-center justify-center">
      <MobileContainer>
        {currentScreen === "splash" && <SplashScreen />}
        
        {currentScreen === "onboarding" && (
          <OnboardingScreen onComplete={() => {
            localStorage.setItem("hasSeenOnboarding", "true");
            setCurrentScreen("login");
          }} />
        )}
        
        {currentScreen === "login" && (
          <LoginScreen 
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen("register")}
          />
        )}
        
        {currentScreen === "register" && (
          <RegisterScreen 
            onRegister={(role) => {
              localStorage.setItem("userRole", role);
              handleLogin();
            }}
            onNavigateToLogin={() => setCurrentScreen("login")}
          />
        )}
        
        {currentScreen === "main" && isAuthenticated && (
          <MainApp onLogout={handleLogout} />
        )}
      </MobileContainer>
      <Toaster />
    </div>
  );
}
