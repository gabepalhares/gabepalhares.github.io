module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,astro}',  // Certifique-se de que o caminho correto dos arquivos está incluído
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '850px',
        'ml': '890px',
        'lg': '1080px',
        'xl': '1280px',
        'll': '1340px',
        '2xl': '1536px',
      },
    },
  },
  variants: {},
  plugins: [],
}
