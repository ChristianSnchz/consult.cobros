module.exports = api => {
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-react-jsx',
    '@babel/proposal-optional-chaining',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['babel-plugin-styled-components', { 'namespace': 'debt-consult' }]
  ];

  if (process.env.NODE_ENV === 'development') {
    api.cache(true);
    plugins.push('react-hot-loader/babel');
  } else {
    api.cache(false);
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          modules: false,
          corejs: '3.6'
        }
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
      [
        'react-app',
        {
          typescript: true
        }
      ]
    ],
    plugins
  };
};
