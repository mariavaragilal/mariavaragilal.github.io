// Core Web Vitals tracking utility
// Tracks LCP, FID, CLS, FCP, and TTFB

const vitalsThresholds = {
	LCP: { good: 2500, poor: 4000 },
	FID: { good: 100, poor: 300 },
	CLS: { good: 0.1, poor: 0.25 },
	FCP: { good: 1800, poor: 3000 },
	TTFB: { good: 800, poor: 1800 },
};

// Get the rating for a metric value
const getRating = (value, thresholds) => {
	if (value <= thresholds.good) return "good";
	if (value <= thresholds.poor) return "needs-improvement";
	return "poor";
};

// Send metrics to analytics (replace with your preferred analytics service)
const sendToAnalytics = (metric) => {
	// Example: Send to Google Analytics 4
	if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
		window.gtag("event", metric.name, {
			event_category: "Web Vitals",
			event_label: metric.rating,
			value: Math.round(metric.value),
			non_interaction: true,
		});
	}

	// Example: Send to custom analytics endpoint
	if (process.env.NODE_ENV === "production") {
		fetch("/api/web-vitals", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(metric),
		}).catch(console.error);
	}

	// Log to console in development
	if (process.env.NODE_ENV === "development") {
		console.log("Web Vital:", metric);
	}
};

// Track Largest Contentful Paint (LCP)
export const trackLCP = () => {
	if (typeof window === "undefined") return;

	const observer = new PerformanceObserver((list) => {
		const entries = list.getEntries();
		const lastEntry = entries[entries.length - 1];

		const metric = {
			name: "LCP",
			value: lastEntry.startTime,
			rating: getRating(lastEntry.startTime, vitalsThresholds.LCP),
			delta: lastEntry.startTime,
			entries: [lastEntry],
		};

		sendToAnalytics(metric);
	});

	observer.observe({ entryTypes: ["largest-contentful-paint"] });
};

// Track First Input Delay (FID)
export const trackFID = () => {
	if (typeof window === "undefined") return;

	const observer = new PerformanceObserver((list) => {
		const entries = list.getEntries();
		entries.forEach((entry) => {
			const metric = {
				name: "FID",
				value: entry.processingStart - entry.startTime,
				rating: getRating(entry.processingStart - entry.startTime, vitalsThresholds.FID),
				delta: entry.processingStart - entry.startTime,
				entries: [entry],
			};

			sendToAnalytics(metric);
		});
	});

	observer.observe({ entryTypes: ["first-input"] });
};

// Track Cumulative Layout Shift (CLS)
export const trackCLS = () => {
	if (typeof window === "undefined") return;

	let clsValue = 0;
	const clsEntries = [];

	const observer = new PerformanceObserver((list) => {
		const entries = list.getEntries();
		entries.forEach((entry) => {
			if (!entry.hadRecentInput) {
				clsValue += entry.value;
				clsEntries.push(entry);
			}
		});

		const metric = {
			name: "CLS",
			value: clsValue,
			rating: getRating(clsValue, vitalsThresholds.CLS),
			delta: clsValue,
			entries: clsEntries,
		};

		sendToAnalytics(metric);
	});

	observer.observe({ entryTypes: ["layout-shift"] });
};

// Track First Contentful Paint (FCP)
export const trackFCP = () => {
	if (typeof window === "undefined") return;

	const observer = new PerformanceObserver((list) => {
		const entries = list.getEntries();
		const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint");

		if (fcpEntry) {
			const metric = {
				name: "FCP",
				value: fcpEntry.startTime,
				rating: getRating(fcpEntry.startTime, vitalsThresholds.FCP),
				delta: fcpEntry.startTime,
				entries: [fcpEntry],
			};

			sendToAnalytics(metric);
		}
	});

	observer.observe({ entryTypes: ["paint"] });
};

// Track Time to First Byte (TTFB)
export const trackTTFB = () => {
	if (typeof window === "undefined") return;

	const observer = new PerformanceObserver((list) => {
		const entries = list.getEntries();
		const navigationEntry = entries.find((entry) => entry.entryType === "navigation");

		if (navigationEntry) {
			const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;

			const metric = {
				name: "TTFB",
				value: ttfb,
				rating: getRating(ttfb, vitalsThresholds.TTFB),
				delta: ttfb,
				entries: [navigationEntry],
			};

			sendToAnalytics(metric);
		}
	});

	observer.observe({ entryTypes: ["navigation"] });
};

// Initialize all Web Vitals tracking
export const initWebVitals = () => {
	if (typeof window === "undefined") return;

	// Check if PerformanceObserver is supported
	if (!("PerformanceObserver" in window)) {
		console.warn("PerformanceObserver not supported, Web Vitals tracking disabled");
		return;
	}

	try {
		trackLCP();
		trackFID();
		trackCLS();
		trackFCP();
		trackTTFB();
	} catch (error) {
		console.error("Error initializing Web Vitals tracking:", error);
	}
};

// Utility function to get current Web Vitals scores
export const getWebVitalsScores = () => {
	if (typeof window === "undefined") return null;

	const navigation = performance.getEntriesByType("navigation")[0];
	const paint = performance.getEntriesByType("paint");

	const scores = {};

	// TTFB
	if (navigation) {
		scores.TTFB = {
			value: navigation.responseStart - navigation.requestStart,
			rating: getRating(navigation.responseStart - navigation.requestStart, vitalsThresholds.TTFB),
		};
	}

	// FCP
	const fcp = paint.find((entry) => entry.name === "first-contentful-paint");
	if (fcp) {
		scores.FCP = {
			value: fcp.startTime,
			rating: getRating(fcp.startTime, vitalsThresholds.FCP),
		};
	}

	return scores;
};
