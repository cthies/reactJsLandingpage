import { useEffect, useRef } from 'react';
import { useIntersection } from './useIntersection';

const useSlickSliderTracking = (
  htmlElement: HTMLElement | null,
  currentIndex: number,
  onImpression: (index: number) => void
): void => {
  const trackingRef = useRef<number[]>([]);
  const isVisible = useIntersection(htmlElement);

  useEffect(() => {
    if (isVisible) {
      if (!trackingRef.current.includes(currentIndex)) {
        onImpression(currentIndex);
        trackingRef.current.push(currentIndex);
      }
    }
  }, [isVisible, currentIndex, onImpression]);
};

export default useSlickSliderTracking;
