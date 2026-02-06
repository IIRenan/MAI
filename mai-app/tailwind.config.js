/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Material You (Green Source)
        primary: {
          DEFAULT: '#2e6c38', // Green 700 - Cor principal forte
          container: '#b3f2bb', // Green 100 - Fundo de botões ativos/seleção
          onContainer: '#002107', // Texto sobre o container
        },
        secondary: {
          DEFAULT: '#516350', // Green-Grey - Para elementos menos importantes
          container: '#d4e8d0',
          onContainer: '#101f11',
        },
        surface: {
          DEFAULT: '#f7fbf2', // Fundo geral (quase branco, levemente verde)
          variant: '#e1e5dd', // Bordas e divisores
          on: '#181d18', // Texto principal
        },
        outline: '#727970', // Cor de bordas de input
      },
      borderRadius: {
        'xl': '1rem', // 16px - Cards padrão
        '2xl': '1.5rem', // 24px - Dialogs e Cards grandes
        '3xl': '2rem', // 32px - Botões grandes (Pill shape)
      },
      boxShadow: {
        'elevation-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'elevation-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
      }
    },
  },
  plugins: [],
}