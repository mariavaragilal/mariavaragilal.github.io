import { cva } from 'class-variance-authority';
import { cn } from '../../../constants/utils/cn';

const scrollBarVariants = cva('flex touch-none select-none transition-colors', {
	variants: {
		orientation: {
			vertical: 'absolute right-0 top-0 h-full w-2.5',
			horizontal: 'absolute bottom-0 left-0 w-full h-2.5',
		},
	},
	defaultVariants: {
		orientation: 'vertical',
	},
});

export const ScrollArea = ({ className = '', children, ...props }) => (
	<div className={cn('relative overflow-hidden', className)} {...props}>
		<div className='h-full w-full rounded-[inherit] overflow-auto [scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent]'>
			{children}
		</div>
	</div>
);

export const ScrollBar = ({ orientation = 'vertical', className = '', ...props }) => (
	<div
		data-orientation={orientation}
		className={cn(scrollBarVariants({ orientation }), className)}
		{...props}
	>
		<div className='relative flex-1 rounded-full bg-border'/>
	</div>
);
