import { useState } from 'react';
import ImpressionTrackingElement from '../_ImpressionTrackingElement';

type Props = {
  onClick: () => void;
  onImpression?: () => void;
  className?: string;
};

const TrackingElement: React.FC<Props> = ({ children, className, onClick, onImpression, ...rest }) => {
  /**
   * We cannot use `useRef` here because we need to trigger re-render when htmlElement becomes
   * available for impression tracking. Because inside ImpressionTrackingElement we use
   * `useIntersection` hook which needs to be updated.
   */
  const [htmlElementRef, setHtmlElementRef] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setHtmlElementRef}
      className={className}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={-1}
      {...rest}
    >
      {onImpression ? (
        <ImpressionTrackingElement htmlElement={htmlElementRef} onImpression={onImpression}>
          {children}
        </ImpressionTrackingElement>
      ) : (
        children
      )}
    </div>
  );
};

export default TrackingElement;
