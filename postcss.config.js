const path = require('path');

module.exports = {
  plugins: [
    'postcss-each',
    'postcss-for',
    'postcss-nested',
    [
      'postcss-mixins',
      {
        mixinsDir: path.join(__dirname, 'src/styles/mixins'),
        silent: true,
      },
    ],
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
};
