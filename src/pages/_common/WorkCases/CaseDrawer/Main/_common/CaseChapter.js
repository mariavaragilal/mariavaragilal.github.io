import { Card } from '../../../../../../_common/components';
import { cn } from '../../../../../../constants/utils/cn';
import { getProjectAccentVars } from '../../../../../../constants/utils/colorContrast';
import { formatTwoDigit } from '../../../../../../constants/utils/formatNumberString';
import { RichText } from '../../../../RichText';

export const formatChapterKicker = (heading, number) => {
	if (!heading) return heading;
	const normalized = String(heading).replace(/\s+/g, ' ').trim();
	const withoutRule = normalized.replace(/^[-–—]+\s*/, '');
	const label = withoutRule.replace(/^\d{1,2}\s*·\s*/, '').trim();
	const prefix = formatTwoDigit(number);
	return prefix + ' · ' + label;
};

export const ChapterKicker = ({ text, style, className = '', labelClassName = '' }) => {
	if (!text) return null;
	return (
		<p style={style} className={cn('text-editorial-eyebrow text-current mb-4 md:mb-5', labelClassName, className)}>
			<span>{text}</span>
		</p>
	);
};

const LIGHT_SURFACE_VARIANTS = new Set(['paper', 'soft', 'muted']);

export const ChapterBand = ({ variant = 'paper', projectColor, className = '', as = 'section', ariaLabel, style: styleProp, children }) => {
	const useAccent = projectColor && LIGHT_SURFACE_VARIANTS.has(variant);
	const accentVars = useAccent ? getProjectAccentVars(projectColor, 4.5) : undefined;
	const rawAccent = projectColor && !useAccent ? { '--project-accent': projectColor } : undefined;
	const style = accentVars || rawAccent || styleProp ? { ...(accentVars || {}), ...(rawAccent || {}), ...(styleProp || {}) } : undefined;
	const projectAccentScope = accentVars ? { 'data-project-accent': '' } : {};
	return (
		<Card
			as={as}
			variant={variant}
			padding=''
			aria-label={ariaLabel}
			style={style}
			className={cn('min-w-0 w-full py-12 lg:py-16 space-y-12', variant === 'paper' && 'border-0', className)}
			{...projectAccentScope}
		>
			{children}
		</Card>
	);
};

export const EditorialHeading = ({
	eyebrow,
	title,
	children,
	as: Tag = 'div',
	onAccent = false,
	onInk = false,
	className = '',
	eyebrowClassName = '',
	eyebrowStyle,
	leadBelow = false,
}) => (
	<Tag className={cn('relative flex flex-col mx-auto w-full', className)}>
		<ChapterKicker text={eyebrow} style={eyebrowStyle} labelClassName={cn((onAccent || onInk) && 'text-current/88', eyebrowClassName)} />
		{title ? <div className={cn('mb-6 md:mb-8', leadBelow && 'order-last')}>
			<RichText as='h2' className='text-editorial-section text-current break-words' text={title} />
		</div> : null}
		{children}
	</Tag>
);
