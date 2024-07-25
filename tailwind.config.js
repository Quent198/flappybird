/** @type {import('tailwindcss').Config} */
export default {
  important:true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "!./src/components/auth/Register.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      aspectRatio: {
        "9/16": "9 / 16",
      },
      height: {
        256: "200rem",
        150: "47.5rem",
        555: "55rem",
      },
      maxHeight: {
        150: "47.5rem",
      },
      minWidth: {
        150: "50rem",
      },
      maxWidth: {
        150: "50rem",
      },
      padding: {
        15: "15px",
      },
      minWidth: {
        0: "0vw",
        "1/4": "25vw",
        "1/2": "50vw",
        "3/4": "75vw",
        full: "100vw",
      },
      fontFamily: {
        light: ["Poppins"], // 300
        medium: ["Poppins"], // 500
        heavy: ["Poppins"], // 700
      },
      colors: {
        primary: "#469875",
        secondary: "#69AD8F",
        "secondary-bg": "#efefef",
      },
      screens: {
        laptop: "850px",
        phone: "385px",
        "iphone-se": "375px",
        "screen-w-418": "418px",
      },
    },
  },
  plugins: [require("daisyui")],
};
