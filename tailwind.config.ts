import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ink": "#151412",
        "ink-deep": "#131312",
        "ink-inverse": "#F4F1EC",
        "canvas": "#F4F1EC",
        "paper": "#FAF9F7",
        "paper-card": "#FAF8F4",
        "shell": "#F6F3EF",
        "shell-header": "#F5F4F0",
        "shell-appointment": "#F8F5F2",
        "metal": "#9B856B",
        "line": "#C9C2B8",
        "line-inverse": "#3A3835",
        "muted": "#6B6660",
        "muted-inverse": "#A8A29A"
},
      fontSize: {
        "display": [
                "Playfair Display",
                "1"
        ],
        "heading": [
                "Playfair Display",
                "1"
        ],
        "quote": [
                "Playfair Display",
                "1"
        ],
        "wordmark": [
                "Playfair Display",
                "1"
        ],
        "wordmark-footer": [
                "Playfair Display",
                "1"
        ],
        "card-title": [
                "Playfair Display",
                "1"
        ],
        "product-name": [
                "Playfair Display",
                "1"
        ],
        "nav": [
                "Inter",
                "1"
        ],
        "eyebrow": [
                "Inter",
                "1"
        ],
        "body": [
                "Inter",
                "1"
        ],
        "body-sm": [
                "Inter",
                "1"
        ],
        "price": [
                "Inter",
                "1"
        ],
        "meta": [
                "Inter",
                "1"
        ]
},
      spacing: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "30": "7.5rem"
},
      borderRadius: {
        "none": "0px",
      },
    },
  },
  plugins: [],
};

export default config;
