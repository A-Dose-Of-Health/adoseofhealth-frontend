import localFont from "next/font/local"

export const chrcy = localFont({
  src: [
    {
      path: "./fonts/chrcy_thin-webfont.woff2",
      weight: "100", // Thin
      style: "normal",
    },
    {
      path: "./fonts/chrcy_regular-webfont.woff2",
      weight: "400", // Regular
      style: "normal",
    },
    {
      path: "./fonts/chrcy_medium-webfont.woff2",
      weight: "500", // Medium
      style: "normal",
    },
    {
      path: "./fonts/chrcy_bold-webfont.woff2",
      weight: "700", // Bold
      style: "normal",
    },
  ],
  variable: "--font-chrcy", // for CSS variables (optional but nice)
})
