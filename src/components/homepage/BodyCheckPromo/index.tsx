import React, { useCallback } from 'react';
import styles from './index.module.css';
import Typography from 'src/components/_shared/Typography';
import Icon from 'src/components/_shared/Icon';
import Image from 'next/image';
import BlockContainer from 'src/components/_common/BlockContainer';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { HomePageBodyCheckSlice } from 'lib/api/content/getHomePageData/Types';
import Button from 'src/components/_shared/Button';
import isEmpty from 'lodash.isempty';

interface BodyCheckPromoProps {
  data: HomePageBodyCheckSlice;
}

const BodyCheckPromo: React.FC<BodyCheckPromoProps> = ({ data }): JSX.Element | null => {
  const {
    title,
    subtitle,
    cta_title,
    cta_url,
    image_desktop_url,
    items,
    tracking_creative,
    tracking_id,
    tracking_name,
  } = data.primary;

  const renderCheckMark = useCallback(({ text }) => {
    return (
      <div key={text} className={styles.checkMark} data-cy="body-check-checkmark">
        <Icon name="check" className={styles.checkMarkIcon} />
        <Typography tag="body-s" data-cy="body-check-text">
          {text}
        </Typography>
      </div>
    );
  }, []);

  if (isEmpty(items)) {
    return null;
  }

  return (
    <PromotionTrackingElement
      promoId={tracking_id}
      promoName={tracking_name}
      promoCreative={tracking_creative}
      promoPosition="1"
      data-cy="body-check-block"
    >
      <a href={cta_url} className={styles.clickWrapper} data-cy="body-check-link">
        <BlockContainer className={styles.container}>
          <div className={styles.textBlock}>
            <Typography tag="h3" data-cy="body-check-title">
              {title}
            </Typography>
            <Typography data-cy="body-check-subtitle">{subtitle}</Typography>
            <div className={styles.checkMarkContainer} data-cy="body-check-checkmarks-container">
              {items.map(renderCheckMark)}
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.button} fullWidth={false} component="span" data-cy="body-check-button">
                {cta_title}
              </Button>
            </div>
          </div>
          <div className={styles.imageBlock}>
            <Image
              src={image_desktop_url}
              className={styles.promoImage}
              alt={title}
              title={title}
              layout="fill"
              objectFit="cover"
              data-cy="body-check-image"
            />
          </div>
        </BlockContainer>
      </a>
    </PromotionTrackingElement>
  );
};

export default BodyCheckPromo;
