module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],  // Ensure this points to your app directory
        alias: {
          screens: './app/screens',
          navigations: './app/navigations',
        },
      },
    ],
  ],
};
