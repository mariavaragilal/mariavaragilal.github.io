// Stylesheets
// ==========================================
// Stylesheets: Vendors
// import "@mdi/font/css/materialdesignicons.min.css"

// Stylesheets: Global
import "./src/assets/stylesheets/index.scss";

export const onInitialClientRender = () => {
	// Hide the loading indicator after the page loads
	setTimeout(function () {
		const loader = document.getElementById("___loader");
		if (loader) {
			loader.style.display = "none";
		}
	}, 100);
};

// Enable hot reloading for better development experience
export const onRouteUpdate = () => {
	// Force re-render on route changes
	if (typeof window !== "undefined") {
		window.scrollTo(0, 0);
	}
};

// Handle HMR errors gracefully
export const onClientEntry = () => {
	// Only run in development
	if (process.env.NODE_ENV !== "development") return;

	// Override console.error to filter out HMR-related errors
	const originalConsoleError = console.error;
	console.error = (...args) => {
		const message = args.join(" ");
		if (message.includes("removeChild") && message.includes("Cannot read properties of null")) {
			// This is a common HMR error, just warn instead of error
			console.warn("HMR warning (ignored):", ...args);
			return;
		}
		originalConsoleError.apply(console, args);
	};
};
