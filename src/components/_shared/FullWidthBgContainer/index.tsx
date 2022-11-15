import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  mobile?: boolean;
  desktop?: boolean;
  onClick?: React.MouseEventHandler;
  flex?: boolean;
  contentClassName?: string;
};

function FullWidthBgContainer({
  children,
  id,
  className,
  mobile,
  desktop,
  onClick,
  flex = true,
  contentClassName,
}: Props): JSX.Element {
  const classes = [styles.container, className ?? '', mobile ? 'mobile' : '', desktop ? 'desktop' : ''].join(' ');
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div id={id} className={classes} onClick={onClick}>
      <div className={`${flex ? 'flex' : ''} columns between ${styles.content} ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default FullWidthBgContainer;
