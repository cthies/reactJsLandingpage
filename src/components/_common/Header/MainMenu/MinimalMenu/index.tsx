import { ReactElement } from 'react';
import classes from './index.module.css';
import Icon from 'src/components/_shared/Icon';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

function MinimalMenu(): ReactElement {
  const t = useMicrocopyTranslations();
  return (
    <div className={classes.container}>
      <span>
        <Icon name="seal" />
        {t('header_minimal_quality')}
      </span>
      <span>
        <Icon name="lock" />
        {t('header_minimal_security')}
      </span>
      <span>
        <Icon name="return" />
        {t('header_minimal_guarantee')}
      </span>
    </div>
  );
}

export default MinimalMenu;
