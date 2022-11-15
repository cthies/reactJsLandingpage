import { useCallback } from 'react';
import { trackEvent } from 'src/tracking';
import TrackingElement from '../_TrackingElement';
import styles from './index.module.css';
import cn from 'src/utils/cn';

type Props = {
  dataCategory: string;
  dataAction: string;
  dataLabel: string;
  inline?: boolean;
};

const EventTrackingElement: React.FC<Props> = ({ children, dataCategory, dataAction, dataLabel, inline }) => {
  const handleClick = useCallback(() => {
    trackEvent({
      category: dataCategory,
      action: dataAction,
      label: dataLabel,
    });
  }, [dataCategory, dataAction, dataLabel]);

  return (
    <TrackingElement onClick={handleClick} className={cn(inline && styles.inline)}>
      {children}
    </TrackingElement>
  );
};

export default EventTrackingElement;
