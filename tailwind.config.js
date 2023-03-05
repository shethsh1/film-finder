module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#F8F8F8",
          secondary: "#01c6ac",
          tertiary: "#01c6ac",
          font: {
            primary: "#212529",
          },
        },
        dark: {
          primary: "#0d1321",
          secondary: "#1d2d44",
          tertiary: "#d5dfed",
          font: {
            primary: "#f0ebd8",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
