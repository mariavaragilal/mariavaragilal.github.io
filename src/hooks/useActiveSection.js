import { useEffect, useState } from 'react';

// Returns the id of the last section whose top has crossed `offset`.
// Sections are searched bottom-up so a later match wins once scrolled past it.
export const useActiveSection = (sections, offset = 120) => {
	const [active, setActive] = useState(null);

	useEffect(() => {
		if (typeof window === 'undefined') return undefined;
		const compute = () => {
			let current = null;
			for (let i = sections.length - 1; i >= 0; i--) {
				const el = document.getElementById(sections[i].id);
				if (el && el.getBoundingClientRect().top <= offset) {
					current = sections[i].id;
					break;
				}
			}
			setActive(current);
		};
		compute();
		window.addEventListener('scroll', compute, { passive: true });
		return () => window.removeEventListener('scroll', compute);
	}, [sections, offset]);

	return active;
};
