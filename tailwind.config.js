/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",     // 👈 add this
    "./src/**/*.{js,ts,jsx,tsx,mdx}",     // keep this in case you still use src/
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
