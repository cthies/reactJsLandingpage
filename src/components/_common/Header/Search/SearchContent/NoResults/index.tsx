import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import classes from './index.module.css';

interface NoResultsProps {
  value: string;
}

const NoResults: FC<NoResultsProps> = ({ value }): JSX.Element => {
  const t = useMicrocopyTranslations();
  return (
    <div className={classes.wrapper}>
      <Typography tag="h4" noWrap>
        {`${t('search_no_result')}  "${value}"`}
      </Typography>
    </div>
  );
};

export default NoResults;
