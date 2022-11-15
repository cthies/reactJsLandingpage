import Grid from 'src/components/_shared/Grid';
import { InterestLandingPageWhatsNewSlice } from 'lib/api/content/getInterestPage/Types';
import WhatsNewItem from 'src/components/interests/WhatsNew/WhatsNewItem';
import Typography from 'src/components/_shared/Typography';
import isEmpty from 'lodash.isempty';

type Props = {
  data: InterestLandingPageWhatsNewSlice;
};

function Desktop(props: Props): JSX.Element | null {
  const { primary, items } = props.data;

  if (isEmpty(items)) {
    return null;
  }

  return (
    <>
      <Typography tag="h4" theme="dark">
        {primary.title}
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item md={6}>
          <WhatsNewItem item={items[0]} titleTag="h2" position="1" usedImpression={true} />
        </Grid>
        <Grid item md={6} container spacing={3}>
          {items.map((item, index) => {
            if (index !== 0) {
              return (
                <Grid item md={6} key={index}>
                  <WhatsNewItem item={item} position={`${index + 1}`} usedImpression={true} titleTag="h5" />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default Desktop;
