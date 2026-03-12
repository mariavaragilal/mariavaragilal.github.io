export function Insight({ children, isActive = true }) {
	return (
		<div
			className={'self-start flex items-start gap-2 mt-1.5 py-2.5 px-3.5 rounded-xl border border-primary/20 bg-primary/5 ring-2 ring-primary/15 transition-opacity duration-400 delay-500 ' + (isActive ? 'opacity-100' : 'opacity-0')}
		>
			<span className='text-primary text-xs mt-0.5 shrink-0'>✦</span>
			<p className='text-[0.875rem] leading-[1.5] italic m-0 text-foreground'>
				{children}
			</p>
		</div>
	);
}
