import Grid from './index';
import Wrapper from 'src/storybook/Wrapper';

const customViewports = {
  xs: {
    name: 'xs',
    styles: {
      width: '500px',
      height: '400px',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: '970px',
      height: '400px',
    },
  },
};

export default {
  title: 'Grid',
  component: Grid,
  decorators: [Wrapper],
  parameters: {
    viewport: {
      viewports: customViewports,
      defaultViewport: 'xs',
    },
  },
};

export function Story(): JSX.Element {
  return (
    <>
      <style>{`
        div { outline: 2px solid rgba(0, 0, 255, 0.2); }
        .red { background: rgba(255, 0, 0, 0.5); }
      `}</style>

      <Grid container spacing={2} direction="column-reverse">
        <Grid item xs={12} md={6} className="red">
          <div>
            1 xs={12} md={6}
          </div>
        </Grid>
        <Grid item xs={12} md={6} className="red">
          <div>
            2 xs={12} md={6}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6} md={12} className="red">
          <div>
            1 xs={6} md={12}
          </div>
        </Grid>
        <Grid item xs={6} md={12} className="red">
          <div>
            2 xs={6} md={12}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

Story.decorators = [Wrapper];

export function Layouts(): JSX.Element {
  return (
    <>
      <style>{`
        .component { margin: 5px 0 20px; }
        .component * { outline: 1px solid rgba(0, 0, 255, 0.2); }
      `}</style>

      <div className="component">
        <Grid container justifyContent="space-between">
          <Grid item md={6}>
            first
          </Grid>
          <Grid item md={6} container spacing={3}>
            <Grid item md={6}>
              second
            </Grid>
            <Grid item md={6}>
              third
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div className="component">
        <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
          <Grid item xs={12} sm={4} md={3}>
            title
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Grid item xs={12} md={6}>
              item
            </Grid>
            <Grid item xs={12} md={6}>
              item
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

Layouts.decorators = [Wrapper];
