import { FC, CSSProperties } from 'react';
import cn from 'src/utils/cn';
import styles from './index.module.css';

interface ContainerProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
}

const BlockContainer: FC<ContainerProps> = ({ children, className, id, ...rest }) => {
  return (
    <div className={cn(styles.container, className)} id={id} {...rest}>
      {children}
    </div>
  );
};

export default BlockContainer;
