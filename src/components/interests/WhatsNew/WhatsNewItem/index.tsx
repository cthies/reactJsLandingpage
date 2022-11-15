import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Link from 'src/components/_shared/Link';
import Typography, { Variant } from 'src/components/_shared/Typography';
import { InterestLandingPageWhatsNewItem } from 'lib/api/content/getInterestPage/Types';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';

type Props = {
  item: InterestLandingPageWhatsNewItem;
  titleTag: Variant;
  position: string;
  usedImpression?: boolean;
};

const Item = (props: Props): JSX.Element => {
  const { item, titleTag, position, usedImpression } = props;
  const linkTarget = item.url.indexOf('/') === 0 ? '_self' : '_blank';

  return (
    <div className={styles.item}>
      <PromotionTrackingElement
        promoId={item.tracking_id}
        promoName={item.tracking_name}
        promoCreative={item.tracking_creative}
        promoPosition={position}
        useImpression={usedImpression}
      >
        <Typography theme="dark">{item.title}</Typography>
        <Link href={item.url} target={linkTarget} className={styles.clickArea}>
          <div className={styles.imageContainer}>
            <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
          </div>
          <Typography tag={titleTag} theme="dark">
            {item.subtitle}
          </Typography>
        </Link>
      </PromotionTrackingElement>
    </div>
  );
};

export default Item;
