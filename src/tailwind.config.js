/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  experimental: {
    colorMixing: false, // Disable OKLCH color mixing
  },
  // Force Tailwind generate RGB/HEX fallback
  corePlugins: {
    preflight: true,
  },
}