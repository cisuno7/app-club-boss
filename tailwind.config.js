/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Conforme DesignSystem.md
        primary: "#1A56DB", // Azul confiança
        secondary: "#7E3AF2", // Roxo inovação
        success: "#0E9F6E", // Verde sucesso
        warning: "#F59E0B", // Amarelo atenção
        error: "#DC2626", // Vermelho erro
        gray: {
          900: "#111827", // Texto
          700: "#374151", // Texto secundário
          400: "#9CA3AF", // Bordas
          100: "#F3F4F6", // Fundos
        },
        white: "#FFFFFF",
        black: "#000000",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"] // Inter conforme DesignSystem.md
      }
    }
  },
  plugins: []
};
