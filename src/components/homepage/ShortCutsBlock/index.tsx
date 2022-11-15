import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import BlockContainer from 'src/components/_common/BlockContainer';
import styles from './index.module.css';
import ShortCutCard from './ShortCutCard';
import { HomePageShortcutsSlice } from 'lib/api/content/getHomePageData/Types';

interface ShortCutBlockProps {
  data: HomePageShortcutsSlice;
}

const ShortCutBlock: FC<ShortCutBlockProps> = ({ data }) => {
  if (!data || !data.primary.is_active) {
    return null;
  }

  return (
    <BlockContainer data-cy="shortcuts-block">
      <div className={styles.titleWrapper}>
        <Typography tag="h4" data-cy="shortcuts-block-title">
          {data.primary?.title}
        </Typography>
      </div>
      <div className={styles.itemWrapper}>
        {data?.items.map((item, index) => (
          <ShortCutCard key={index} item={item} position={`${index + 1}`} />
        ))}
      </div>
    </BlockContainer>
  );
};

export default ShortCutBlock;
