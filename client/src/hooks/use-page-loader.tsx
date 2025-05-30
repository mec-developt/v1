import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export function usePageLoader() {
  const [loading, setLoading] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate page load time

    return () => clearTimeout(timer);
  }, [location]);

  return loading;
}