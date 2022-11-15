import { MouseEventHandler, useCallback } from 'react';
import Icon from 'src/components/_shared/Icon';
import Typography from 'src/components/_shared/Typography';
import Image from 'next/image';
import styles from './index.module.css';
import React from 'react';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import ClickTrackingElement from 'src/components/_tracking/ClickTrackingElement';
import Badge from 'src/components/_shared/Badge';
import { HomePageContentSliderItemType } from 'lib/api/content/getHomePageData/Types';
import Button from 'src/components/_shared/Button';

interface ContentCardProps {
  className?: string;
  item: HomePageContentSliderItemType;
  isFavorite: boolean;
  onFavoriteClick?: (isFavorite: boolean) => void;
  minContentHeight?: number;
  position: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  className,
  item,
  onFavoriteClick,
  isFavorite,
  minContentHeight,
  position,
}) => {
  const {
    type,
    topic,
    title,
    url,
    image,
    time,
    badge_label,
    badge_type,
    cta_title,
    cta_url,
    cta_tracking_category,
    cta_tracking_label,
    tracking_id,
    tracking_name,
    tracking_creative,
  } = item;

  const favoriteClickHandler: MouseEventHandler = useCallback(
    (e) => {
      if (onFavoriteClick) {
        e.preventDefault();
        onFavoriteClick(isFavorite);
      }
    },
    [isFavorite, onFavoriteClick]
  );

  return (
    <div className={`${styles.container} ${className}`} data-cy="content-card-box">
      <Typography className={styles.heading} tag="h6" data-cy="content-card-headline">
        {topic}
      </Typography>
      <PromotionTrackingElement
        promoId={tracking_id}
        promoName={tracking_name}
        promoCreative={tracking_creative}
        promoPosition={position}
      >
        <div className={styles.cardWrapper}>
          <a href={url} className={styles.clickArea} data-cy="content-card-link">
            <div className={styles.imageContainer}>
              <Image
                src={image}
                className={styles.image}
                alt={title}
                title={title}
                layout="fill"
                objectFit="cover"
                data-cy="content-card-image"
              />
              {onFavoriteClick && (
                <button onClick={favoriteClickHandler} className={styles.favoriteButton}>
                  <Icon name={isFavorite ? 'heartSolid' : 'heart'} />
                </button>
              )}
            </div>
            <div className={styles.textContent} style={{ minHeight: minContentHeight || '' }}>
              <div className={styles.titleWrapper}>
                <Typography className="font-bold" data-cy="content-card-title">
                  {title}
                </Typography>
                {badge_label && (
                  <Badge className={styles.badge} type={badge_type} data-cy="content-card-badge">
                    <Typography tag="body-xs">{badge_label}</Typography>
                  </Badge>
                )}
              </div>
              <div className={styles.durationContainer}>
                <Icon name={type === 'article' ? 'book' : 'timeClock'} className={styles.clockIcon} />
                <Typography tag="body-xs">{time}</Typography>
              </div>
            </div>
          </a>
        </div>
      </PromotionTrackingElement>
      <div className={styles.moreButtonContainer}>
        <ClickTrackingElement category={cta_tracking_category ?? ''} label={cta_tracking_label}>
          <Button
            className={styles.moreButton}
            mode="tertiary"
            fullWidth={false}
            href={cta_url}
            data-cy="content-card--link-button"
          >
            {cta_title}
          </Button>
        </ClickTrackingElement>
      </div>
    </div>
  );
};

export default ContentCard;
