import React, { FC } from 'react';
import Icon from 'src/components/_shared/Icon';
import Typography from 'src/components/_shared/Typography';
import { InterestLandingPageAnchorItem } from 'lib/api/content/getInterestPage/Types';
import ClickTrackingElement from 'src/components/_tracking/ClickTrackingElement';
import Button from 'src/components/_shared/Button';
import classes from './index.module.css';

type Props = InterestLandingPageAnchorItem & { theme?: 'dark' | 'light' };

const TitleBlockItem: FC<Props> = ({ label, url, tracking_label, tracking_category, theme = 'dark' }) => {
  return (
    <ClickTrackingElement category={tracking_category} label={tracking_label}>
      <Button mode="tertiary" theme={theme} fullWidth={false} href={url}>
        <Icon name="arrowRight" />
        <Typography tag="body-s" theme={theme} className={classes.linkButton}>
          {label}
        </Typography>
      </Button>
    </ClickTrackingElement>
  );
};

export default TitleBlockItem;
