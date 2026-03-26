import { cn } from '../../../constants/utils/cn';

const orientationMap = {
	'horizontal': 'h-px w-full',
	'vertical': 'h-full w-px',
	'sm:horizontal': 'sm:h-px sm:w-full',
	'sm:vertical': 'sm:h-full sm:w-px',
	'md:horizontal': 'md:h-px md:w-full',
	'md:vertical': 'md:h-full md:w-px',
	'lg:horizontal': 'lg:h-px lg:w-full',
	'lg:vertical': 'lg:h-full lg:w-px',
	'xl:horizontal': 'xl:h-px xl:w-full',
	'xl:vertical': 'xl:h-full xl:w-px',
	'2xl:horizontal': '2xl:h-px 2xl:w-full',
	'2xl:vertical': '2xl:h-full 2xl:w-px',
};

function resolveOrientation(orientation) {
	return orientation.split(' ').map((token) => orientationMap[token]).join(' ');
}

export const Separator = ({ orientation = 'horizontal', decorative = false, opacity = 'opacity-10', bg = 'bg-current', className = '', ...props }) => (
	<div
		data-slot="separator"
		role={decorative ? 'none' : 'separator'}
		aria-orientation={decorative ? undefined : orientation.split(' ')[0].replace(/.*:/, '')}
		className={cn('shrink-0', bg, opacity, className) + ' ' + resolveOrientation(orientation)}
		{...props}
	/>
);
