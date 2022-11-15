import React, { FC } from 'react';
import Icon from 'src/components/_shared/Icon';
import styles from './index.module.css';

interface BaseRatingProps {
  ratingValue?: number;
  maxValue?: number;
  size: number;
  iconsCount: number;
}

const BaseRating: FC<BaseRatingProps> = ({ ratingValue = 0, maxValue = 5, size, iconsCount }) => {
  function getRatingValue(): number {
    return Math.round(ratingValue * 100) / maxValue;
  }

  return (
    <div className={styles.container} style={{ width: `${size * iconsCount}px`, height: `${size}px` }}>
      <div className={styles.bg}>
        {[...Array(iconsCount)].map((star, index) => {
          return (
            <Icon key={index} name="star" size={size} className={styles.bgIcon} color={'var(--color-common-black)'} />
          );
        })}
      </div>
      <div className={styles.value} style={{ width: `${getRatingValue()}%` }}>
        {[...Array(iconsCount)].map((star, index) => {
          return <Icon key={index} name="star" size={size} color={'var(--color-common-black)'} />;
        })}
      </div>
    </div>
  );
};

export default BaseRating;
