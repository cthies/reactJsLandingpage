import { useEffect, useRef } from 'react';
import { useIntersection } from 'src/hooks/useIntersection';

type Props = {
  htmlElement: HTMLElement | null;
  onImpression: () => void;
};

const ImpressionTrackingElement: React.FC<Props> = ({ htmlElement, children, onImpression }) => {
  const impressionSentRef = useRef<boolean>(false);
  const isVisible = useIntersection(htmlElement);

  useEffect(() => {
    if (isVisible && !impressionSentRef.current) {
      impressionSentRef.current = true;
      onImpression();
    }
  }, [isVisible, onImpression]);

  return <>{children}</>;
};

export default ImpressionTrackingElement;
