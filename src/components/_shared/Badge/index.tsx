import cn from 'src/utils/cn';
import styles from './index.module.css';

interface Props {
  className?: string;
  /**
   * @deprecated use type instead
   */
  color?: string;
  type?: 'white' | 'black' | 'beginner' | 'intermediate' | 'advanced';
}

const Badge: React.FC<Props> = ({ color, type = 'white', className, children, ...rest }) => {
  return (
    <div className={cn(styles.badge, className, styles[type] ?? '')} style={{ backgroundColor: color }} {...rest}>
      {children}
    </div>
  );
};

export default Badge;
