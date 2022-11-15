import { useState, useEffect } from 'react';

export const useIntersection = (htmlElement: HTMLElement | null): boolean => {
  const [isVisible, setState] = useState(false);
  useEffect(() => {
    if (!htmlElement) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setState(entry.isIntersecting);
    });

    htmlElement && observer.observe(htmlElement);
    return () => observer.unobserve(htmlElement);
  }, [htmlElement]);
  return isVisible;
};
