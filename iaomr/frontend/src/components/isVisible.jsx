import { useEffect, useState } from "react";

export const useIsVisible = (ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [threshold, setThreshold] = useState(0.2);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");

    const updateThreshold = () => {
      setThreshold(mq.matches ? 0.00000001 : 0.2);
    };

    updateThreshold();
    mq.addEventListener("change", updateThreshold);

    return () => mq.removeEventListener("change", updateThreshold);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};