module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
        "-999": "-999",
      },
      colors: {
        gold: {
          DEFAULT: "#F7DB96",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: null,
            img: {
              margin: "auto",
            },
            a: {
              transform: "translate(-100%,50%)",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
      boxShadow: ["active"],
      translate: ["group-hover"],
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("nightwind")],
};
