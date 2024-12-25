/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
			"screen-1350": { min: "0px", max: "1350px" },
			"screen-1100": { min: "0px", max: "1100px" },
			"screen-900": { min: "0px", max: "900px" },
			"screen-800": { min: "0px", max: "800px" },
			"screen-680": { min: "0px", max: "680px" },
			"screen-480": { min: "0px", max: "480px" },
			"screen-350": { min: "0px", max: "350px" },
			// => @media (min-width: 992px) { ... }
		  }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

