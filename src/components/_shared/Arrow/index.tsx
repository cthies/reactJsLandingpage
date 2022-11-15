import Icon from 'src/components/_shared/Icon';
import cn from 'src/utils/cn';
import styles from './index.module.css';

interface ArrowComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: 'left' | 'right';
  size?: number;
  onArrowClick?: (action: 'next' | 'previous') => void;
}

const ArrowComponent: React.FC<ArrowComponentProps> = ({
  className,
  direction,
  onClick,
  size,
  onArrowClick,
  ...rest
}) => {
  return (
    <div
      className={cn(styles.arrowWrapper, direction === 'left' ? styles.left : styles.right)}
      onClick={(e) => {
        if (onArrowClick) {
          onArrowClick(direction === 'left' ? 'previous' : 'next');
        }

        if (onClick) {
          onClick(e);
        }
      }}
      role="none"
      {...rest}
    >
      <Icon size={size} className={className} name={direction === 'left' ? 'chevronLeft' : 'chevronRight'} />
    </div>
  );
};

export default ArrowComponent;
