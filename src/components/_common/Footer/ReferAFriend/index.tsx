import Grid from 'src/components/_shared/Grid';
import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import Typography from 'src/components/_shared/Typography';
import styles from './index.module.css';
import Icon from 'src/components/_shared/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectReferLink } from 'src/store/slices/ui';
import { useMicrocopyTranslations, useReferAFriendTranslations } from 'src/hooks/useTranslations';
import { showOverlay } from 'src/store/slices/overlay';
import cn from 'src/utils/cn';
import BlockContainer from 'src/components/_common/BlockContainer';
import Button from 'src/components/_shared/Button';

function ReferAFriend(): JSX.Element | null {
  const referLink = useSelector(selectReferLink);
  const tReferAFriend = useReferAFriendTranslations();
  const tMicrocopy = useMicrocopyTranslations();
  const dispatch = useDispatch();

  if (!referLink) {
    return null;
  }

  function handleCopyClick(): void {
    dispatch(showOverlay({ type: 'notification', message: tMicrocopy('clipboard_copied'), variant: 'success' }));
    import('copy-to-clipboard').then((module) => {
      module.default(referLink, { format: 'text/plain' });
    });
  }

  return (
    <FullWidthBgContainer id="refer_a_friend" className={styles.root}>
      <BlockContainer className={styles.container}>
        <Typography tag="h3" className={styles.title}>
          {tReferAFriend('title')}
        </Typography>
        <Typography className={styles.subtitle}>{tReferAFriend('subtitle')}</Typography>
        <Grid container>
          <Grid item md={6} xs={12}>
            <ul className={styles.list}>
              <li>
                <Icon name="copy" className={styles.listIcon} /> {tReferAFriend('list_copy')}
              </li>
              <li>
                <Icon name="shareAndroid" className={styles.listIcon} /> {tReferAFriend('list_share')}
              </li>
              <li>
                <Icon name="discount" className={cn(styles.listIcon, styles.discountIcon)} />{' '}
                {tReferAFriend('list_discount')}
              </li>
            </ul>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={styles.inputContainer}>
              <input type="text" value={referLink} readOnly className={styles.input} />
              <Button fullWidth={false} className={styles.button} onClick={handleCopyClick}>
                {tMicrocopy('copy_button')}
              </Button>
            </div>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${referLink}`} target="_blank" rel="noreferrer">
              <Icon name="social_facebook" className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Icon name="social_instagram" className={styles.icon} />
            </a>
            <a href={`https://twitter.com/home?status=${referLink}`} target="_blank" rel="noreferrer">
              <Icon name="social_twitter" className={styles.icon} />
            </a>
            <a href={`https://wa.me/?text=${referLink}`} target="_blank" rel="noreferrer">
              <Icon name="social_whatsapp" className={styles.icon} />
            </a>
          </Grid>
        </Grid>
      </BlockContainer>
    </FullWidthBgContainer>
  );
}

export default ReferAFriend;
