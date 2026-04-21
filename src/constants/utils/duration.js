export const GET_DURATION = (startDate, endDate = null) => {
	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : new Date();

	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();

	if (months < 0) {
		years--;
		months += 12;
	}

	if (end.getDate() < start.getDate()) {
		months--;
		if (months < 0) {
			years--;
			months += 12;
		}
	}

	return { years, months };
};

// `labels`: { year, years, month, months } — pass from i18n for locale-aware output.
export const FORMAT_DURATION = (startDate, endDate = null, labels = null) => {
	const { years, months } = GET_DURATION(startDate, endDate);
	const ySing = labels ? labels.year : 'year';
	const yPlural = labels ? labels.years : 'years';
	const mSing = labels ? labels.month : 'month';
	const mPlural = labels ? labels.months : 'months';

	if (years === 0) {
		return months === 1 ? '(1 ' + mSing + ')' : '(' + months + ' ' + mPlural + ')';
	}
	if (months === 0) {
		return years === 1 ? '(1 ' + ySing + ')' : '(' + years + ' ' + yPlural + ')';
	}
	const yearText = years === 1 ? ySing : yPlural;
	const monthText = months === 1 ? mSing : mPlural;
	return '(' + years + ' ' + yearText + ' ' + months + ' ' + monthText + ')';
};
