/* eslint-disable implicit-arrow-linebreak */
import { clientConfig } from '../../webpack/webpack.common';

const normalizeAssets = (assets) => {
  const { styles, scripts } = Object.values(assets)
    .reduce((acc, arr) => acc.concat(arr), [])
    .reduce(
      (acc, path) => {
        if (path.endsWith('.css')) {
          acc.styles[path] = [clientConfig.output.publicPath, path].join('/');
          return acc;
        }

        if (path.endsWith('.js')) {
          acc.scripts[path] = [clientConfig.output.publicPath, path].join('/');
          return acc;
        }

        return acc;
      },
      { styles: {}, scripts: {} }
    );

  return { styles: Object.values(styles), scripts: Object.values(scripts) };
};

export default normalizeAssets;
