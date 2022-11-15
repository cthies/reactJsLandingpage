import React, { useCallback } from 'react';
import { trackPromotionClick, trackPromotionImpression } from 'src/tracking';
import TrackingElement from '../_TrackingElement';

type Props = {
  promoId: string;
  promoName: string;
  promoCreative: string;
  promoPosition: string;
  useImpression?: boolean;
  className?: string;
};

const PromotionTrackingElement: React.FC<Props> = ({
  children,
  promoId,
  promoName,
  promoCreative,
  promoPosition,
  className,
  useImpression = true,
  ...rest
}) => {
  const onTrackingClickHandler = useCallback(() => {
    trackPromotionClick({ id: promoId, name: promoName, creative: promoCreative, position: promoPosition });
  }, [promoCreative, promoId, promoName, promoPosition]);

  const onTrackingImpressionHandler = useCallback(() => {
    trackPromotionImpression({ id: promoId, name: promoName, creative: promoCreative, position: promoPosition });
  }, [promoCreative, promoId, promoName, promoPosition]);

  return (
    <TrackingElement
      onClick={onTrackingClickHandler}
      onImpression={useImpression ? onTrackingImpressionHandler : undefined}
      className={className}
      {...rest}
    >
      {children}
    </TrackingElement>
  );
};

export default PromotionTrackingElement;
