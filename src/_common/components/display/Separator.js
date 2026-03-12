export const Separator = ({ orientation = 'horizontal', decorative = false, opacity = 'opacity-10', bg = 'bg-current', className = '', ...props }) => (
	<div
		role={decorative ? 'none' : 'separator'}
		aria-orientation={decorative ? undefined : orientation}
		className={(orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full') + ' shrink-0 ' + bg + ' ' + opacity + ' ' + className}
		{...props}
	/>
);
