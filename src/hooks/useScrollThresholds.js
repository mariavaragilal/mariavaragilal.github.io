import { useEffect, useState } from 'react';

// Single scroll listener drives any number of boolean flags, each gated by a
// y-offset threshold. Avoids stacking one listener per flag.
export const useScrollThresholds = (thresholds) => {
	const [flags, setFlags] = useState(() => {
		const initial = {};
		for (const key of Object.keys(thresholds)) initial[key] = false;
		return initial;
	});

	useEffect(() => {
		if (typeof window === 'undefined') return undefined;
		const compute = () => {
			const y = window.scrollY;
			const next = {};
			for (const key of Object.keys(thresholds)) next[key] = y > thresholds[key];
			setFlags((prev) => {
				for (const key of Object.keys(next)) if (prev[key] !== next[key]) return next;
				return prev;
			});
		};
		compute();
		window.addEventListener('scroll', compute, { passive: true });
		return () => window.removeEventListener('scroll', compute);
	}, [thresholds]);

	return flags;
};
