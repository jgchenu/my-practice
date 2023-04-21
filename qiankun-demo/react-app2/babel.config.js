const __DEV__ = process.env.NODE_ENV === 'development';

const config = {
  presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    ['import', { libraryName: 'antd', style: true }],
  ],
};

if (__DEV__) {
  config.plugins.push('react-refresh/babel');
}

module.exports = config;
