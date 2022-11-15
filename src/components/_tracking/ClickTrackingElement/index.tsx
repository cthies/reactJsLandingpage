import { trackEvent } from 'src/tracking';
import TrackingElement from '../_TrackingElement';

type Props = {
  category: string;
  label?: string;
};

const ClickTrackingElement: React.FC<Props> = ({ children, category, label }) => {
  const handleClick = () => {
    trackEvent({
      action: 'click',
      category,
      label,
    });
  };

  return <TrackingElement onClick={handleClick}>{children}</TrackingElement>;
};

export default ClickTrackingElement;
