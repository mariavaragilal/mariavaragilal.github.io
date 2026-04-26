import React from 'react';
import { cn } from '../../../constants/utils/cn';

export const Stack = ({
	kicker,
	title,
	titleAs: TitleTag = 'span',
	titleClassName,
	summary,
	summaryClassName,
}) => (
	<React.Fragment>
		<div className='flex flex-col gap-1'>
			<span className='font-mono font-bold tracking-[0.06em] text-[0.6875rem] text-brand' aria-hidden='true'>{kicker}</span>
			<TitleTag className={cn('font-mono text-[1.0625rem] font-medium tracking-[-0.01em] text-foreground', titleClassName)}>{title}</TitleTag>
		</div>
		<div className='flex flex-col gap-2.5 text-left'>
			<p className={cn('text-[0.90625rem] leading-[1.6] text-current/88', summaryClassName)}>{summary}</p>
		</div>
	</React.Fragment>
);
