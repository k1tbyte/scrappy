import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#191a33",
        "primary": "#21223d",
        "accent": "#26254b",
        "secondary": "#6d67fd",
        "chip": "#6858b9",
        "tertiary": "#3a3881",
        "foreground": "#beb2b2",
        "foreground-muted": "#41486f",
        "foreground-accent": "#f8f6f6",
        "border": "#1e2039",
        "success": "#08fc81",
        "danger": "#f04343",
        "close": "#de6d92",
        "warn": "#facc15"
      },
      borderRadius: {
        '2xm': '5px',
        'xm': '3px'
      },
      fontSize: {
        '2xs': '13px',
      },
    },
  },
  plugins: [
    plugin(({addComponents, addUtilities}) => {
      addUtilities({
        '.flex-y-center': {
          "@apply flex items-center": {}
        },
        '.flex-x-center': {
          "@apply flex justify-center": {}
        },
        '.flex-center': {
          "@apply flex items-center justify-center": {}
        },
        '.translate-center': {
          "@apply -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2": {}
        },
        '.backdrop-primary': {
          "@apply bg-primary/80 backdrop-saturate-150 backdrop-blur-md": {}
        },
        '.letter-space': {
          letterSpacing: "1px"
        },
        '.auto-rows': {
          gridAutoRows: "1fr"
        },
        '.focus-shadow': {
          outline: "none",
          boxShadow: "0 0 0 3px theme('colors.border')"
        }
      })
    })
  ],
}

