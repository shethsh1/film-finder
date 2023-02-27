module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#7a92cb",
          secondary: "#718096",
          font: {
            primary: "#f0ebd8",
          },
        },
        dark: {
          primary: "#0d1321",
          secondary: "#A0AEC0",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
