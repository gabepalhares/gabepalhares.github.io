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
        'pl': '1180px',
        'xl': '1280px',
        'll': '1340px',
        '2xl': '1536px',
      },
      colors: {
        'navy-blue': '#111827',
      }
    },
  },
  variants: {},
  plugins: [],
}
