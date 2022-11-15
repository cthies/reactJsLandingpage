import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideOverlay, NotificationType } from 'src/store/slices/overlay';
import styles from './notification.module.css';
import cn from 'src/utils/cn';
import IconButton from 'src/components/_shared/Button/IconButton';

const Notification: React.FC<NotificationType> = ({ uid, variant, message, expirationDuration = 5000 }) => {
  const dispatch = useDispatch();

  const handleCloseClick = useCallback(
    function () {
      dispatch(hideOverlay(uid));
    },
    [dispatch, uid]
  );

  useEffect(() => {
    if (expirationDuration && expirationDuration > 0) {
      const timeout = setTimeout(handleCloseClick, expirationDuration);
      return () => clearTimeout(timeout);
    }
  }, [handleCloseClick, expirationDuration]);

  return (
    <div className={cn(styles.item, styles[variant])}>
      {message}
      <IconButton onClick={handleCloseClick} className={styles.close} iconProps={{ name: 'close' }} />
    </div>
  );
};

export default Notification;
