import React, { useState, useCallback } from 'react';
import parentStyles from '../MainMenu/index.module.css';
import styles from './index.module.css';
import Icon from 'src/components/_shared/Icon';
import cn from 'src/utils/cn';
import { trackEvent } from 'src/tracking';
import IconButton from 'src/components/_shared/Button/IconButton';
import Button from 'src/components/_shared/Button';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import { useIsSearchPage } from 'src/hooks/usePageType';
import Drawer from 'src/components/_shared/Drawer';

const Search: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [SearchContent, setSearchContent] = useState() as any;

  const t = useMicrocopyTranslations();

  const toggleDrawer = useCallback(
    (open: boolean) => (event: any) => {
      trackEvent({
        category: 'search',
        action: 'click',
      });

      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      if (open) {
        import('./SearchContent').then((module) => {
          setSearchContent(module.default);
          setDrawerOpen(true);
        });
      } else {
        setDrawerOpen(false);
      }
    },
    []
  );

  const isSearchPage = useIsSearchPage();
  if (isSearchPage) {
    return <div className={styles.filler} />;
  }

  return (
    <>
      <div className={styles.btn_container}>
        <Button theme="dark" onClick={toggleDrawer(true)} className={styles.btn} component="span">
          <Icon name="search" />
          <span className={styles.btnTitle}>{t('search_button')}</span>
        </Button>
      </div>
      <div className={cn('mobile', parentStyles.item)}>
        <IconButton onClick={toggleDrawer(true)} iconProps={{ name: 'search', mobileSize: 28 }} />
      </div>
      <Drawer
        transitionDuration={400}
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        className="next-js-modal"
      >
        {SearchContent && <SearchContent onClose={toggleDrawer(false)} />}
      </Drawer>
    </>
  );
};

export default Search;
