module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // custom shapes / spacing / glass style tokens
      lineHeight: {
        5.5: "1.375rem", // = 22px
  7.75: "1.9375rem", // = 31px, adjust as desired
      },
      spacing: {
        9.5: "38px",
        4.5: "18px",
      },
      fontSize: {
        base: ["1rem", { lineHeight: "1.375rem" }], // if you want `text-base/5.5`
        h2: ['32px', '44px'],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        secondary: "#6366f1",
        tertiary: "#65d8bb",
        black: "#1e1e1e",
        white: "#ffffff",
        black: {
          DEFAULT: "#1e1e1e",
          8: "rgba(30, 30, 30, 0.08)", // = black/8
          10: "rgba(30, 30, 30, 0.10)", // = black/10
          20: "rgba(30, 30, 30, 0.20)", // = black/20
        },
        white: {
          DEFAULT: "#ffffff",
          6: "rgba(255, 255, 255, 0.06)", // = white/6
          10: "rgba(255, 255, 255, 0.10)", // = white/10
          20: "rgba(255, 255, 255, 0.20)", // = white/20
          80: "rgba(255, 255, 255, 0.80)", // = white/80
        },
        gray: "#737373",
        "gray-light": "#fefbf4",
        "gray-100": "#fff3de",
        blue: "#110e1f",
        "blue-light": "#201743",
        primary: "#1E444C",
        primedark: "#18474F",
        accent: "#FCF1AD",
        filter: {
          "blur-20": "blur(20px)",
          "blur-25": "blur(25px)",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        chrcy: ["var(--font-chrcy)", "sans-serif"], // 👈 now available as font-myfont
        manrope: ["var(--font-manrope)", "sans-serif"],
        bricolage: ['var(--font-bricolage)', 'sans-serif']
      },
      borderRadius: {
        "2xl": "20px",
        "4xl": "40px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1572px",
      },
      transitionTimingFunction: {
        "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
      },
      keyframes: {
        "bg-position": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-down": {
          "0%": { opacity: "0", transform: "translateY(-80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "content-blur": {
          "0%": { filter: "blur(0.3rem)" },
          "100%": { filter: "blur(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pop-blob": {
          "0%": { transform: "scale(1)" },
          "33%": { transform: "scale(1.2)" },
          "66%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "bg-position": "bg-position 3s infinite alternate",
        "reveal-up": "reveal-up 1s forwards",
        "reveal-down": "reveal-down 1s forwards",
        "content-blur": "content-blur 1s forwards",
        "pop-blob": "pop-blob 5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
