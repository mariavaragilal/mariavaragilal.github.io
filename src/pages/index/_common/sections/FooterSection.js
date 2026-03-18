import React from 'react';
import { Copyright } from '../../../../_common/layout/components/Copyright';
import { srOnly } from '../../../../constants/utils/a11y';

export const FooterSection = () => {
	const BUILT_WITH = [
		'React 19',
		'Gatsby 5',
		'Tailwind v4',
		'Motion',
		'Custom component library',
		'Theme system',
		'JavaScript (ES6+)',
		'Accessibility - a11y',
		'i18n',
		'SEO & structured data',
	];
	return (
		<footer className='relative rounded-b-lg w-full bg-background border-t border-border px-6 py-5 text-[0.8rem] text-current/88 lg:px-12'>
			<div className='mx-auto flex max-w-full flex-col gap-1'>
				<div className='flex flex-col justify-between gap-2 sm:flex-row'>
					<Copyright />
				</div>
				<nav aria-label='Built with' className='flex flex-wrap gap-x-4 gap-y-1'>
					<span className='text-muted-foreground'>Built with:</span>
					<div className='flex flex-wrap items-center gap-x-3 text-current/88'>
						{BUILT_WITH.map((item, i) => (
							<React.Fragment key={item}>
								{i > 0 ? <span className='shrink-0 text-current/66' aria-hidden='true'>·</span> : null}
								<span>{item}</span>
							</React.Fragment>
						))}
						<span>.</span>
						{' '}
						<a href='https://github.com/mariavaragilal/mariavaragilal.github.io' target='_blank' rel='noopener noreferrer' className='hover:underline'>View source</a>
					</div>
				</nav>
				<nav aria-label='References' className='flex flex-wrap gap-x-4 gap-y-1'>
					<span className='text-muted-foreground'>References:</span>
					<a href='https://www.w3.org/WAI/WCAG21/quickref/' target='_blank' rel='noreferrer' className='hover:underline'>WCAG<span className={srOnly}> (opens in new tab)</span></a>
					<a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility' target='_blank' rel='noreferrer' className='hover:underline'>MDN Accessibility<span className={srOnly}> (opens in new tab)</span></a>
				</nav>
			</div>
		</footer>
	)
};

export default FooterSection;
