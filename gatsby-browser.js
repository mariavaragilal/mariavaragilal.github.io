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
