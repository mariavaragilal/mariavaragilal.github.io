import cvPt from './cv.pt.json';
import mvEn from './mv.en.json';
import mvPt from './mv.pt.json';

const deepMerge = (base, override) => {
	if (override === undefined || override === null) return base;
	if (Array.isArray(base) && Array.isArray(override)) return override.length ? override : base;
	if (typeof base === 'object' && base !== null && typeof override === 'object' && override !== null && !Array.isArray(base) && !Array.isArray(override)) {
		const out = { ...base };
		for (const k of Object.keys(override)) out[k] = deepMerge(base[k], override[k]);
		return out;
	}
	return override;
};

const pt = { ...cvPt, mv: deepMerge(mvEn, mvPt) };

export default pt;
