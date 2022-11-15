import React, { FC } from 'react';
import Grid from 'src/components/_shared/Grid';
import IntroBlock from '../IntroBlock';
import { HabitsBlockProps } from '../';
import ContentCard from './ContentCard';
import BlockContainer from 'src/components/_common/BlockContainer';

import styles from './index.module.css';

const HabitsBlockDesktop: FC<HabitsBlockProps> = ({ data }) => {
  const { primary, items } = data;
  const { intro_title, intro_author, intro_content } = primary;

  return (
    <div className={styles.container} data-cy="editorial-block-box">
      <BlockContainer>
        <Grid container spacing={4}>
          <Grid item container spacing={4} wrap="wrap" justifyContent="space-between" alignItems="stretch">
            <Grid item xs={6}>
              <IntroBlock title={intro_title} author={intro_author} content={intro_content} />
            </Grid>
            {items.map((item, index) => (
              <Grid item xs={6} key={index}>
                <ContentCard data={item} position={`${index + 1}`} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </BlockContainer>
    </div>
  );
};

export default HabitsBlockDesktop;
