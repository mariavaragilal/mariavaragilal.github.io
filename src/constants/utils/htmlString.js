export const stringContainsHtmlMarkup = (s) => {
	if (typeof s !== 'string' || s.indexOf('<') === -1) return false;
	return /<\/?[a-zA-Z][a-zA-Z0-9:-]*(\s|>|\/)/.test(s) || /<![a-zA-Z]/.test(s) || /<\?/.test(s);
};
