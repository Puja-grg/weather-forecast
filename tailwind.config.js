/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "740px",
        md: "980px",
        lg: "1280px",
      },
      fontSize: {
        sm: "14px",
        md: "17px",
        lg: "21px",
      },
      fontFamily: {
        sourceSans: "Source Sans 3",
      },
    },
  },
  plugins: [],
};
