module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: [
            "nativewind",
            "@welldone-software/why-did-you-render",
          ],
        },
      ],
      "nativewind/babel",
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
