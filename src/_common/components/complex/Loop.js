import { useEffect, useState } from 'react';

const NODES = [
	{ id: 'create', label: 'Create', angle: -90, blurb: 'work within defined boundaries' },
	{ id: 'launch', label: 'Launch', angle: 0, blurb: 'reach the launch line, release' },
	{ id: 'test', label: 'Test', angle: 90, blurb: 'test with real usage and signals' },
	{ id: 'refine', label: 'Refine', angle: 180, blurb: 'iterate, protect the vision' },
];

const pointOnRing = (cx, cy, r, deg) => {
	const a = (deg * Math.PI) / 180;
	return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const arcBetween = (cx, cy, r, a0, a1) => {
	const pad = 6;
	const a0r = ((a0 + pad) * Math.PI) / 180;
	const a1r = ((a1 - pad) * Math.PI) / 180;
	const x0 = cx + r * Math.cos(a0r);
	const y0 = cy + r * Math.sin(a0r);
	const x1 = cx + r * Math.cos(a1r);
	const y1 = cy + r * Math.sin(a1r);
	return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
};

export const Loop = ({ size = 320, autoplay = true, animations = true, labels: customLabels, blurbs: customBlurbs, centerLabel = 'the loop' }) => {
	const [active, setActive] = useState(0);
	const [hover, setHover] = useState(null);
	const cx = size / 2;
	const cy = size / 2;
	const r = size * 0.36;
	const rOuter = r + 28;

	useEffect(() => {
		if (!autoplay || !animations) return undefined;
		const t = setInterval(() => setActive((a) => (a + 1) % 4), 2000);
		return () => clearInterval(t);
	}, [autoplay, animations]);

	const arcs = NODES.map((n, i) => {
		const next = NODES[(i + 1) % 4];
		return arcBetween(cx, cy, r, n.angle, next.angle + (next.angle < n.angle ? 360 : 0));
	});

	const cur = hover != null ? hover : active;
	const circumference = 2 * Math.PI * r;
	const labelFor = (i) => (customLabels && customLabels[i]) || NODES[i].label;
	const blurbFor = (i) => (customBlurbs && customBlurbs[i]) || NODES[i].blurb;

	return (
		<div className='relative mx-auto' style={{ width: size, height: size }}>
			<svg className='w-full h-auto block overflow-visible' viewBox={`0 0 ${size} ${size}`} aria-hidden='true'>
				<circle cx={cx} cy={cy} r={r + 14} fill='none' className='stroke-border' strokeWidth='1' />
				<circle cx={cx} cy={cy} r={r} fill='none' className='stroke-border' strokeWidth='1' />
				{arcs.map((d, i) => (
					<path
						key={i}
						d={d}
						fill='none'
						className='stroke-brand'
						strokeWidth='1.25'
						style={{
							strokeDasharray: circumference,
							strokeDashoffset: i === cur ? 0 : circumference,
							transition: 'stroke-dashoffset .9s cubic-bezier(.6,0,.3,1)',
						}}
					/>
				))}
				{[0, 90, 180, 270].map((a) => {
					const p1 = pointOnRing(cx, cy, r - 6, a);
					const p2 = pointOnRing(cx, cy, r + 6, a);
					return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className='stroke-current/44' strokeWidth='1' />;
				})}
				{NODES.map((n, i) => {
					const p = pointOnRing(cx, cy, r, n.angle);
					const lp = pointOnRing(cx, cy, rOuter, n.angle);
					const anchor = n.angle === 0 ? 'start' : n.angle === 180 ? 'end' : 'middle';
					const dy = n.angle === -90 ? -8 : n.angle === 90 ? 16 : 4;
					const isActive = cur === i;
					return (
						<g
							key={n.id}
							onMouseEnter={() => setHover(i)}
							onMouseLeave={() => setHover(null)}
							onClick={() => setActive(i)}
							style={{ cursor: 'pointer' }}>
							<circle
								cx={p.x}
								cy={p.y}
								r={isActive ? 6 : 4}
								className={isActive ? 'fill-brand stroke-brand' : 'fill-background stroke-foreground'}
								strokeWidth='1.25'
								style={{ transition: 'fill .25s, stroke .25s, r .25s' }}
							/>
							<text
								x={lp.x}
								y={lp.y + dy}
								textAnchor={anchor}
								className={'font-mono uppercase tracking-[0.04em] text-[0.6875rem] ' + (isActive ? 'fill-foreground' : 'fill-current/66')}
								style={{ transition: 'fill .25s' }}>
								{labelFor(i)}
							</text>
						</g>
					);
				})}
				<text x={cx} y={cy - 4} textAnchor='middle' className='font-mono uppercase tracking-[0.08em] text-[0.59375rem] fill-current/44'>
					{centerLabel}
				</text>
				<text x={cx} y={cy + 14} textAnchor='middle' className='font-mono uppercase tracking-[0.08em] text-[0.59375rem] fill-current/66'>
					{String(cur + 1).padStart(2, '0')} / 04
				</text>
			</svg>
			<div className='text-center mt-3 text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold min-h-4'>
				<span className='text-brand'>→ </span>
				{blurbFor(cur)}
			</div>
		</div>
	);
};
