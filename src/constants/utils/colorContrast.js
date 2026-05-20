// Project-accent color math for the case drawer: WCAG contrast adjustment,
// light/dark accent pairs, CSS custom-property shims, and foreground picks.

// ─── Core parsers ───────────────────────────────────────────────────────────

const parseHex = (hex) => {
	const m = String(hex ?? '').trim().replace('#', '');
	if (m.length === 3) return [parseInt(m[0] + m[0], 16), parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16)];
	if (m.length === 6) return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
	return null;
};

const toHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

const linearize = (c) => {
	const s = c / 255;
	return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const relLuminance = ([r, g, b]) => 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);

// ─── WCAG contrast ──────────────────────────────────────────────────────────

export const contrastRatio = (rgb1, rgb2) => {
	const l1 = relLuminance(rgb1);
	const l2 = relLuminance(rgb2);
	const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (hi + 0.05) / (lo + 0.05);
};

export const meetsContrast = (hex, bgHex, minRatio = 4.5) => {
	const fg = parseHex(hex);
	const bg = parseHex(bgHex);
	if (!fg || !bg) return false;
	return contrastRatio(fg, bg) >= minRatio;
};

// ─── HSL color space ────────────────────────────────────────────────────────

const rgbToHsl = ([r, g, b]) => {
	const rn = r / 255, gn = g / 255, bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const l = (max + min) / 2;
	if (max === min) return [0, 0, l];
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h;
	if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
	else if (max === gn) h = ((bn - rn) / d + 2) / 6;
	else h = ((rn - gn) / d + 4) / 6;
	return [h * 360, s, l];
};

const hslToRgb = (h, s, l) => {
	if (s === 0) {
		const v = Math.round(l * 255);
		return [v, v, v];
	}
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const hue2rgb = (t) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};
	const hn = h / 360;
	return [
		Math.round(hue2rgb(hn + 1 / 3) * 255),
		Math.round(hue2rgb(hn) * 255),
		Math.round(hue2rgb(hn - 1 / 3) * 255),
	];
};

// ─── Contrast adjustment ────────────────────────────────────────────────────

const adjustLightnessForContrast = (hsl, bg, bgLum, minRatio) => {
	const [h, s, origL] = hsl;
	// Light bg → search darker [0, origL]; dark bg → search lighter [origL, 1].
	const [lo, hi] = bgLum > 0.5 ? [0, origL] : [origL, 1];
	let low = lo, high = hi, best = null;
	for (let i = 0; i < 24; i++) {
		const mid = (low + high) / 2;
		const rgb = hslToRgb(h, s, mid);
		if (contrastRatio(rgb, bg) >= minRatio) {
			best = toHex(...rgb);
			// Passing: push toward the brand-faithful extreme (darkest on light bg, lightest on dark).
			if (bgLum > 0.5) low = mid;
			else high = mid;
		} else {
			// Failing: retreat toward the original lightness until contrast clears.
			if (bgLum > 0.5) high = mid;
			else low = mid;
		}
	}
	return best;
};

export const DEFAULT_DARK_SURFACE = '#1c2033';

export const ensureAccessibleColor = (hex, bgHex = '#ffffff', minRatio = 4.5) => {
	const fg = parseHex(hex);
	const bg = parseHex(bgHex);
	if (!fg || !bg) return hex;
	if (contrastRatio(fg, bg) >= minRatio) return hex;
	const bgLum = relLuminance(bg);
	const adjusted = adjustLightnessForContrast(rgbToHsl(fg), bg, bgLum, minRatio);
	if (adjusted) return adjusted;
	return bgLum > 0.5 ? '#000000' : '#ffffff';
};

// ─── Project accent API ─────────────────────────────────────────────────────

export const getProjectAccentPair = (projectColor, minRatio = 4.5, darkSurface = DEFAULT_DARK_SURFACE) => {
	if (!projectColor) return null;
	return {
		light: ensureAccessibleColor(projectColor, '#ffffff', minRatio),
		dark: ensureAccessibleColor(projectColor, darkSurface, minRatio),
	};
};

export const getProjectAccentVars = (projectColor, minRatio = 4.5, darkSurface = DEFAULT_DARK_SURFACE) => {
	const pair = getProjectAccentPair(projectColor, minRatio, darkSurface);
	if (!pair) return undefined;
	return { '--project-accent-light': pair.light, '--project-accent-dark': pair.dark };
};

export const getProjectAccentValue = (projectColor, usesProjectColorBg) => {
	if (!projectColor || usesProjectColorBg) return undefined;
	return { '--project-accent': ensureAccessibleColor(projectColor, '#ffffff', 4.5) };
};

export const getProjectAccentStyle = (projectColor, usesProjectColorBg) => {
	if (!projectColor || usesProjectColorBg) return undefined;
	const accessible = ensureAccessibleColor(projectColor, '#ffffff', 4.5);
	return { color: 'var(--project-accent, ' + accessible + ')' };
};

// ─── Foreground picking ─────────────────────────────────────────────────────

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

/** Chapter kickers on paper; on brand-colored bands use legible ink instead of accent tint. */
export const getChapterKickerStyle = (projectColor, onBrandSurface = false) => {
	if (!projectColor) return undefined;
	if (onBrandSurface) return { color: pickForegroundForBg(projectColor, 4.5) };
	return getProjectAccentStyle(projectColor, false);
};
