import { cn } from '../../../../../constants/utils/cn';

export const LabelSection = ({ heading, children, as: Tag = 'div', headingAs: Heading = 'h3', className = '', headingClassName = '' }) => (
	<Tag className={cn('relative w-full', className)}>
		{heading ? (
			<Heading className={cn('mb-4 text-xs md:text-sm uppercase tracking-[0.08em] font-semibold text-current/88', headingClassName)}>
				{heading}
			</Heading>
		) : null}
		{children}
	</Tag>
);
