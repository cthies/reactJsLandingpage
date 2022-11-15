import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import { SearchSuggestionTopCategorySlice } from 'lib/api/content/getSearchSuggestions/Types';
import Grid from 'src/components/_shared/Grid';
import Button from 'src/components/_shared/Button';
import isEmpty from 'lodash.isempty';
import classes from './index.module.css';

export interface TopCategoriesProps {
  data: SearchSuggestionTopCategorySlice;
}

const TopCategories: FC<TopCategoriesProps> = ({ data }) => {
  const { title } = data.primary;

  if (isEmpty(data.items)) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <Typography tag="h4">{title}</Typography>
      <div className={classes.content}>
        <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
          {data.items.map((item, index) => (
            <Grid item key={index}>
              <Button href={item?.link} mode="secondary" theme="dark" className={classes.btnRound}>
                {item?.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TopCategories;
