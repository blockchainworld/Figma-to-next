/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marcellus: ['Marcellus', 'serif'],
        'noto-sans': ['"Noto Sans HK"', 'sans-serif'],
      },
      screens: {
        'xs': '470px',  // 或者其他你需要的尺寸
        'xxs': '404px',
        'tiny': '375px',
      }
    },
  },
  plugins: [],
}
