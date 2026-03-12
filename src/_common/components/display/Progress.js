const TRACK = 'relative h-2 w-full overflow-hidden rounded-full bg-secondary';
const INDICATOR = 'h-full w-full flex-1 bg-primary transition-all';

export const Progress = ({ value = 0, max = 100, className = '', ...props }) => {
	const pct = Math.min(100, Math.max(0, (value / max) * 100));
	return (
		<div
			role='progressbar'
			aria-valuenow={value}
			aria-valuemin={0}
			aria-valuemax={max}
			className={TRACK + ' ' + className}
			{...props}
		>
			<div className={INDICATOR} style={{ transform: 'translateX(-' + (100 - pct) + '%)' }}/>
		</div>
	);
};
