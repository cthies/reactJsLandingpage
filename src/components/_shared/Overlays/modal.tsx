import { useCallback } from 'react';
import IconButton from 'src/components/_shared/Button/IconButton';
import Typography from 'src/components/_shared/Typography';
import cn from 'src/utils/cn';
import BlockContainer from '../../_common/BlockContainer';

import styles from './modal.module.css';
import { useDispatch } from 'react-redux';
import { hideOverlay, ModalType } from 'src/store/slices/overlay';

const ModalComponent: React.FC<ModalType> = ({ variant, uid, title, message, html }) => {
  const dispatch = useDispatch();

  const closeHandler = useCallback(() => {
    dispatch(hideOverlay(uid));
  }, [uid, dispatch]);

  return (
    <div className={cn(styles.container, styles[variant])}>
      <BlockContainer className={styles.content}>
        <div>
          {title && (
            <Typography tag="h4" theme="dark">
              {title}
            </Typography>
          )}
          {message && <Typography theme="dark">{message}</Typography>}
          {html && <div className={html.className} dangerouslySetInnerHTML={{ __html: html.content }} />}
        </div>
        <IconButton
          className={styles.closeBtn}
          onClick={closeHandler}
          theme="dark"
          iconProps={{
            name: 'close',
            size: 28,
          }}
        />
      </BlockContainer>
    </div>
  );
};

export default ModalComponent;
