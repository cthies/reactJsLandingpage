import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import BlockContainer from 'src/components/_common/BlockContainer';
import Grid from 'src/components/_shared/Grid';
import { InterestLandingPageAnchorSlice } from 'lib/api/content/getInterestPage/Types';
import TitleBlockItem from '../TitleBlockItem';
import isEmpty from 'lodash.isempty';
import classes from './index.module.css';

interface TitleBlockProps {
  data: InterestLandingPageAnchorSlice;
}

const TitleBlockNoImage: FC<TitleBlockProps> = ({ data }) => {
  const { title, subtitle } = data.primary;

  if (isEmpty(data.items)) {
    return null;
  }

  return (
    <BlockContainer>
      <div className={classes.titleWrapper}>
        <Typography tag="h1">{title}</Typography>
        <div className={classes.header}>
          <Typography>{subtitle}</Typography>
        </div>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          {data.items.map((item, index) => (
            <Grid key={index} item xs={6} sm={3} className={classes.btnWrapper}>
              <TitleBlockItem {...item} theme="light" />
            </Grid>
          ))}
        </Grid>
      </div>
    </BlockContainer>
  );
};

export default TitleBlockNoImage;
