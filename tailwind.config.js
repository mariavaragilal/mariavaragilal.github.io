module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.html", "./public/**/*.html"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Rubik", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
				mono: ["Google Sans Code", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
				"google-sans-code": ["Google Sans Code", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
			},
			fontWeight: {
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
				black: "900",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"terminal-sweep": {
					"0%": {
						"background-position": "-200% 0",
						opacity: "0.8",
					},
					"50%": {
						opacity: "1",
					},
					"100%": {
						"background-position": "200% 0",
						opacity: "0.8",
					},
				},
				"terminal-glow": {
					"0%": {
						"text-shadow": "0 0 5px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.1)",
					},
					"100%": {
						"text-shadow": "0 0 2px rgba(0, 0, 0, 0.2), 0 0 5px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 0, 0, 0.05)",
					},
				},
				"terminal-glow-dark": {
					"0%": {
						"text-shadow": "0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)",
					},
					"100%": {
						"text-shadow": "0 0 2px rgba(255, 255, 255, 0.2), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 8px rgba(255, 255, 255, 0.05)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"terminal-sweep": "terminal-sweep 0.6s ease-in-out",
				"terminal-glow": "terminal-glow 0.5s ease-in-out infinite alternate",
				"terminal-glow-dark": "terminal-glow-dark 0.5s ease-in-out infinite alternate",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
