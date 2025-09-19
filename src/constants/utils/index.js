export const MONTHS = Array.from({ length: 12 }, (_, i) => new Date(2000, i).toLocaleString("fr", { month: "short" }).toUpperCase().replace(".", ""));
export const YEARS = (src) => {
	if (!src?.length) return [new Date().getFullYear()];

	const startYear = Math.min(
		...src.map((invoice) => {
			if (!invoice.emissionDate) return new Date().getFullYear();
			const date = new Date(invoice.emissionDate);
			return date.getFullYear();
		})
	);
	const currentYear = new Date().getFullYear();
	return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
};

export const GET_PREVIOUS_MONTH = (dateSource = null) => {
	const sourceDate = dateSource ? new Date(dateSource) : new Date();
	const previousMonth = new Date(Date.UTC(sourceDate.getUTCFullYear(), sourceDate.getUTCMonth() - 1, 1));

	return {
		year: previousMonth.getUTCFullYear(),
		month: previousMonth.getUTCMonth(),
	};
};

// Utility function to calculate duration between two dates
export const GET_DURATION = (startDate, endDate = null) => {
	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : new Date();

	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();

	if (months < 0) {
		years--;
		months += 12;
	}

	// Adjust for days if needed
	if (end.getDate() < start.getDate()) {
		months--;
		if (months < 0) {
			years--;
			months += 12;
		}
	}

	return { years, months };
};

// Format duration string
export const FORMAT_DURATION = (startDate, endDate = null) => {
	const { years, months } = GET_DURATION(startDate, endDate);

	if (years === 0) {
		return months === 1 ? "(1 month)" : `(${months} months)`;
	} else if (months === 0) {
		return years === 1 ? "(1 year)" : `(${years} years)`;
	} else {
		const yearText = years === 1 ? "year" : "years";
		const monthText = months === 1 ? "month" : "months";
		return `(${years} ${yearText} ${months} ${monthText})`;
	}
};

export const FORMAT_DATE = (dateString, includeTime = false) => {
	if (!dateString) return "";

	// Check if it's an ISO date (2024-08-30T00:00:00)
	if (dateString.includes("T")) {
		const date = new Date(dateString);
		const options = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		};

		if (includeTime) {
			options.hour = "2-digit";
			options.minute = "2-digit";
		}

		return includeTime ? date.toLocaleString("fr-FR", options) : date.toLocaleDateString("fr-FR", options);
	}

	return dateString; // Return as is if already formatted
};

export const FORMAT_DATETIME = (dateString) => FORMAT_DATE(dateString, true);

export const FORMAT_PERCENTAGE = (value) => {
	const formatter = new Intl.NumberFormat("fr-FR", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
	return value == null ? "" : formatter.format(value);
};

export const FORMAT_NUMBER = (value) => {
	const formatter = new Intl.NumberFormat("fr-FR", {
		style: "decimal",
		currency: "EUR",
		maximumFractionDigits: 2,
	});
	return value == null ? "" : formatter.format(value);
};

export const FORMAT_AMOUNT = (value) => {
	const formatter = new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
	});

	let amount = 0;
	if (typeof value === "object" && value !== null) {
		amount = Object.values(value).find((val) => typeof val === "number") ?? 0;
	} else if (typeof value === "number") {
		amount = value;
	}

	return value == null ? "" : formatter.format(amount);
};

export const FORMAT_RATE = new Intl.NumberFormat("fr-FR", {
	style: "percent",
	maximumFractionDigits: 2,
});
