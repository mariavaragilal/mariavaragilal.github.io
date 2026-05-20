export const stringContainsHtmlMarkup = (s) => {
	if (typeof s !== 'string' || s.indexOf('<') === -1) return false;
	return /<\/?[a-zA-Z][a-zA-Z0-9:-]*(\s|>|\/)/.test(s) || /<![a-zA-Z]/.test(s) || /<\?/.test(s);
};

export const formatTwoDigit = (n) => String(n).padStart(2, '0');

export const getHostname = (url) => {
	try { return new URL(url).hostname.replace('www.', ''); }
	catch { return url; }
};
