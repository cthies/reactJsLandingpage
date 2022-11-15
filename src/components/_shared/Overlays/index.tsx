import { useSelector } from 'react-redux';
import { selectOverlays } from 'src/store/slices/overlay';
import Modal from 'src/components/_shared/Overlays/modal';
import Notification from 'src/components/_shared/Overlays/notification';
import styles from './index.module.css';

function Overlays(): JSX.Element {
  const overlays = useSelector(selectOverlays);
  return (
    <div className={styles.container}>
      {overlays.map((overlay) => {
        switch (overlay.type) {
          case 'modal':
            return <Modal key={overlay.uid} {...overlay} />;
          case 'notification':
            return <Notification key={overlay.uid} {...overlay} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default Overlays;
