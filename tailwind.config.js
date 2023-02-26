module.exports = {
    mode: 'jit',
    purge: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html'
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          light: {
            primary: '#4A5568',
            secondary: '#718096',
            accent: '#63B3ED',
            background: '#F7FAFC'
          },
          dark: {
            primary: '#E2E8F0',
            secondary: '#A0AEC0',
            accent: '#4299E1',
            background: '#1A202C'
          }
        }
      }
    },
    variants: {},
    plugins: []
  };