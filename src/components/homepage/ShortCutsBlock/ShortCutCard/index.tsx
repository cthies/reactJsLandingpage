import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import Image from 'next/image';
import Link from 'src/components/_shared/Link';
import styles from './index.module.css';
import { HomePageShortcutsItemType } from 'lib/api/content/getHomePageData/Types';

interface Props {
  item: HomePageShortcutsItemType;
  position: string;
}

const ShortCutCard: FC<Props> = ({ item, position }) => {
  const { title, url, image, tracking_id, tracking_name, tracking_creative } = item;
  return (
    <div className={styles.item} data-cy="shortcuts-item">
      <PromotionTrackingElement
        promoId={tracking_id}
        promoName={tracking_name}
        promoCreative={tracking_creative}
        promoPosition={position}
      >
        <Link href={url} data-cy="shortcuts-item-link">
          <Image
            src={image}
            alt={title}
            title={title}
            className={styles.image}
            layout="fill"
            objectFit="cover"
            data-cy="shortcuts-item-image"
          />
          <Typography tag="h4" className={styles.title} data-cy="shortcuts-item-title">
            {title}
          </Typography>
        </Link>
      </PromotionTrackingElement>
    </div>
  );
};

export default ShortCutCard;
