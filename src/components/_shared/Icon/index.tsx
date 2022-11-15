import { SVGProps } from 'react';
import { useDeviceType } from 'src/hooks/useDeviceType';
import cn from 'src/utils/cn';
import styles from './index.module.css';
import iconsMap from './iconsMap';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof iconsMap;
  size?: number;
  mobileSize?: number;
}

const Icon: React.FC<IconProps> = ({ className, name, size, color, mobileSize, ...props }) => {
  const isMobile = useDeviceType() === 'mobile';

  const IconComponent = iconsMap[name];
  if (!IconComponent) return null;

  if (size) {
    props.width = size;
    props.height = size;
  } else if (mobileSize && isMobile) {
    props.width = mobileSize;
    props.height = mobileSize;
  }

  return (
    <IconComponent
      className={cn(color ? undefined : styles.icon, className)}
      style={{
        verticalAlign: 'middle',
        maxWidth: 'initial',
      }}
      color={color}
      {...props}
    />
  );
};

export default Icon;
