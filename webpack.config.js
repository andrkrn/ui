/**
 * Webpack configuration file
 **/

const DashboardPlugin = require('webpack-dashboard/plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssCssNext = require('postcss-cssnext');
const postcssBR = require('postcss-browser-reporter');
const postcssR = require('postcss-reporter');
const postcssCF = require('postcss-color-function');

const isProd = process.env.NODE_ENV === 'production';
const config = {
  entry:
  {
    index: './index.jsx',
  },
  output:
  {
    filename: `${isProd ? '[hash].' : ''}bundle.js`,
    path: 'build/',
    publicPath: 'build/',
  },
  resolve:
  {
    extensions: ['', '.jsx', '.js', '.css', '.json'],
  },
  devTool: 'cheap-module-source-map',
  module:
  {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[hash].[ext]',
      },
      {
        test: /\.(ttf|eot|svg|jpg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[hash].[ext]',
      },
      {
        test: /\.(json)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'json-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query:
        {
          presets: ['stage-2', 'react', 'es2015'],
        },
      }],
  },
  plugins: [],
  postcss(webpack) {
    return [
      postcssImport(
        {
          addDependencyTo: webpack,
        }),
      postcssCssNext(),
      postcssBR(),
      postcssR(),
      postcssCF(),
    ];
  },
  devServer:
  {
    contentBase: '.',
    progress: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
};

function HashBundlePlugin() {
  // Setup the plugin instance with options...
}
HashBundlePlugin.prototype.apply = function f(compiler) {
  compiler.plugin('done', (statsData) => {
    const stats = statsData.toJson();
    if (!stats.errors.length) {
      const htmlFileName = 'index.html';
      const html = fs.readFileSync(path.join(__dirname, htmlFileName), 'utf8');
      const htmlOutput = html.replace(/\/build\/.?bundle\.js/, `${'/build/'}${stats.hash}${'.bundle.js'}`);
      fs.writeFileSync(path.join(__dirname, htmlFileName), htmlOutput);
    }
  });
};

if (!isProd) {
  config.plugins.push(new DashboardPlugin());
} else {
  config.plugins.push(new webpack.LoaderOptionsPlugin(
    {
      minimize: true,
      debug: false,
    }), new webpack.optimize.UglifyJsPlugin(
      {
        compress:
        {
          warnings: false,
        },
        output:
        {
          comments: false,
        },
        sourceMap: false,
      }), new webpack.DefinePlugin(
        {
          'process.env':
          {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          },
        }), new HashBundlePlugin(), new webpack.optimize.DedupePlugin());
}

module.exports = config;

