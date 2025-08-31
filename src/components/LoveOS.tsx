import { useState, useEffect } from "react";
import { Desktop } from "./Desktop";
import { LoadingScreen } from "./LoadingScreen";

export const LoveOS = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Desktop />;
};