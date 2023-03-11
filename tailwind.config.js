module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#F8F8F8",
          secondary: "#c7e5d0",
          tertiary: "#004f44",
          hover: "#b3cebb",
          font: {
            primary: "#212529",
          },
        },
        dark: {
          primary: "#0d1321",
          secondary: "#1d2d44",
          tertiary: "#d5dfed",
          hover: "#172436",
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
