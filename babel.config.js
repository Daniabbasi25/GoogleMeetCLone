module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
   [ '@babel/plugin-transform-private-methods',{ loose: true }],
   ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./app'],  // Ensure this points to your app directory
        alias: {
          screens: './app/screens',
          navigations: './app/navigations',
          services: './app/services',
        },
      },
    ],
  ],
};
