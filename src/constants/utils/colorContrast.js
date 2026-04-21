// Project-accent color math for the case drawer: WCAG contrast adjustment,
// light/dark accent pairs, CSS custom-property shims, and foreground picks.

const parseHex = (hex) => {
	const m = String(hex || '').trim().replace('#', '');
	if (m.length === 3) return [parseInt(m[0] + m[0], 16), parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16)];
	if (m.length === 6) return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
	return null;
};
const toHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const relLuminance = (r, g, b) => {
	const f = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
	return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrastRatio = (rgb1, rgb2) => {
	const l1 = relLuminance(...rgb1);
	const l2 = relLuminance(...rgb2);
	const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (a + 0.05) / (b + 0.05);
};

export const ensureAccessibleColor = (hex, bgHex = '#ffffff', minRatio = 4.5) => {
	const fg = parseHex(hex);
	const bg = parseHex(bgHex);
	if (!fg || !bg) return hex;
	if (contrastRatio(fg, bg) >= minRatio) return hex;
	const bgLum = relLuminance(...bg);
	const target = bgLum > 0.5 ? [0, 0, 0] : [255, 255, 255];
	for (let i = 1; i <= 20; i++) {
		const t = i / 20;
		const next = fg.map((c, j) => c * (1 - t) + target[j] * t);
		if (contrastRatio(next, bg) >= minRatio) return toHex(next[0], next[1], next[2]);
	}
	return bgLum > 0.5 ? '#000000' : '#ffffff';
};

const DARK_SURFACE_BG = '#1c2033';
export const getProjectAccentPair = (projectColor, minRatio = 4.5) => {
	if (!projectColor) return null;
	return {
		light: ensureAccessibleColor(projectColor, '#ffffff', minRatio),
		dark: ensureAccessibleColor(projectColor, DARK_SURFACE_BG, minRatio),
	};
};

export const getProjectAccentVars = (projectColor, minRatio = 4.5) => {
	const pair = getProjectAccentPair(projectColor, minRatio);
	if (!pair) return undefined;
	return { '--project-accent-light': pair.light, '--project-accent-dark': pair.dark };
};
export const getProjectKickerStyle = (projectColor, usesProjectColorBg, isVariable = false) => {
	if (!projectColor || usesProjectColorBg) return undefined;
	const accessible = ensureAccessibleColor(projectColor, '#ffffff', 4.5);
	return isVariable ? { '--project-accent': accessible } : { color: 'var(--project-accent, ' + accessible + ')' };
};

export const pickForegroundForBg = (bgHex, minRatio = 7, darkInk = '#111111') => {
	const bg = parseHex(bgHex);
	if (!bg) return '#ffffff';
	const white = parseHex('#ffffff');
	const dark = parseHex(darkInk) || parseHex('#111111');
	const whiteRatio = contrastRatio(white, bg);
	const darkRatio = contrastRatio(dark, bg);
	if (whiteRatio >= minRatio && whiteRatio >= darkRatio) return '#ffffff';
	if (darkRatio >= minRatio) return darkInk;
	return whiteRatio >= darkRatio ? '#ffffff' : darkInk;
};
