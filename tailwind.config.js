module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rubic: ["Rubik", "sans-serif"],
      },
      colors: {
        primary: {
          moderateBlue: "#5457b6",
          softRed: "#ed6468",
          lightGrayish: "#c3c4ef",
          paleRed: "#ffb8bb",
        },
        neutral: {
          darkBlue: "#324152",
          grayishBlue: "#67727e",
          lightGray: "#eaecf1",
          veryLightGray: "#f5f6fa",
          socreBg: "#f5f6f8",
        },
      },
    },
  },
  plugins: [],
};
