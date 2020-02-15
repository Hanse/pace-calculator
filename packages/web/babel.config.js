module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
};
