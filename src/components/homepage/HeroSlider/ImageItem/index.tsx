import React, { FC } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectIsLighthouse } from 'src/store/slices/ui';
import classes from './index.module.css';

interface ImageProps {
  src: string;
  title: string;
  active: boolean;
  priority?: boolean;
}

const ImageItem: FC<ImageProps> = ({ src, title, active, priority }) => {
  const isLighthouse = useSelector(selectIsLighthouse);

  if (!src) {
    console.error('HeroSlider ImageItem has no "src" set in slice content.');
    return null;
  }

  return (
    <div>
      <div className={classes.imageWrapper} data-cy="hero-slider-image">
        <Image
          src={src}
          alt={title}
          title={title}
          layout="fill"
          objectFit="cover"
          className={` ${classes.imagePosition} ${active && !isLighthouse ? classes.imageAnimation : ''}`}
          priority={priority}
        />
      </div>
    </div>
  );
};

export default ImageItem;
