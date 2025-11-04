/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line correctly finds your src/App.tsx
  ],
  theme: {
    extend: {
      colors: {
        // 'off-black' background
        background: '#111111',
        // 'off-white' text
        text: '#F8F8F8',
        // 'Electric Blue' accent
        accent: '#0070F3',
        // A slightly darker gray for secondary elements
        gray: {
          800: '#222222',
          700: '#333333',
        },
      },
      fontFamily: {
        // 'Inter' for body text
        sans: ['Inter', 'sans-serif'],
        // 'Manrope' for headings
        heading: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

