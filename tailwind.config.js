/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sidebar-blue": "#182537",
        "blue-add": "#0088FF",
        "blue-600": "#2661ec",
        "gray-300": "#dddddd",
        "gray-100": "#f4f6f8",
        "gray-200": "#dfd8d8",
        "light-gray": "#efeded",
        "light-blue": "#eff7fd",
        "purple-light": "#eae2f0",
        purple: "#7506e4",
        "purple-dark": "#876fca",
        "green-light": "#f3fcf9",
        green: "#0db473",
        "green-dark": "#9fedcf",
        "yellow-light": "#fffbf2",
        yellow: "#e49c06",
        "yellow-dark": "#ffdf9b",
      },
    },
  },
  plugins: [],
};
