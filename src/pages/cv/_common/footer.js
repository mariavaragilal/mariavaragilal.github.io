import React from 'react';
import { Copyright } from '../../../_common/layout/components/Copyright';
import { srOnly } from '../../../constants/utils/a11y';

const CVFooter = () => (
	<footer className='border-t border-border px-6 py-5  text-current/88 lg:px-8'>
		<div className='mx-auto flex max-w-full flex-col gap-1'>
			<div className='flex flex-col justify-between gap-2 sm:flex-row text-[0.8rem]'>
				<Copyright />
			</div>
			<nav aria-label='References' className='flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem]'>
				<span className='text-muted-foreground'>References:</span>
				<a href='https://www.w3.org/WAI/WCAG21/quickref/' target='_blank' rel='noreferrer' className='hover:underline'>WCAG<span className={srOnly}> (opens in new tab)</span></a>
				<a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility' target='_blank' rel='noreferrer' className='hover:underline'>MDN Accessibility<span className={srOnly}> (opens in new tab)</span></a>
			</nav>
		</div>
	</footer>
);

export default CVFooter;
