import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';
import cn from 'src/utils/cn';

type DrawerProps = {
  children: JSX.Element;
  transitionDuration?: number;
  anchor: 'right';
  open: boolean;
  onClose?: (event?: any) => void;
  className?: string;
};

function Drawer(props: DrawerProps): JSX.Element | null {
  const scrollPosition = useRef(0);
  const { children, transitionDuration, open, onClose, anchor, className } = props;
  const [isShown, setIsShown] = useState(open); // this is to determine if content should be rendered
  const [isOpen, setIsOpen] = useState(open); // this is to trigger the animation transition

  useEffect(() => {
    if (open) {
      setIsShown(true);
      scrollPosition.current = document.documentElement.scrollTop || document.body.scrollTop;
      document.body.classList.add(styles.hideBodyScroll);
      document.documentElement.scrollTop = document.body.scrollTop = scrollPosition.current;
      setTimeout(() => {
        setIsOpen(true);
      }, 0);
    } else {
      setIsOpen(false);
      document.body.classList.remove(styles.hideBodyScroll);
      document.documentElement.scrollTop = document.body.scrollTop = scrollPosition.current;
      setTimeout(() => {
        setIsShown(false);
      }, transitionDuration);
    }
  }, [transitionDuration, open]);

  function handleVeilClick(e: SyntheticEvent) {
    onClose && onClose(e);
  }

  if (!isShown) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(styles.container, styles[anchor], isOpen && styles.open)}
        onClick={handleVeilClick}
        style={{ transitionDuration: `${transitionDuration}ms` }}
      />
      <div
        className={cn(styles.content, styles[anchor], isOpen && styles.open, className)}
        style={{ transitionDuration: `${transitionDuration}ms` }}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

export default Drawer;
