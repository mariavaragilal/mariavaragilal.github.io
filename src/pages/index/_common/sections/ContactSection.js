import React from 'react';
import { Link } from 'gatsby';
import { srOnly, focusRing } from '../../../../constants/utils/a11y';
import { Button } from '../../../../_common/components';

export const ContactSection = () => (
	<section id='contact' aria-labelledby='contact-heading' className='px-6 py-16 lg:px-12'>
		<div className='mx-auto max-w-full grid gap-x-10 gap-y-6 md:grid-cols-2'>
			<div>
				<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66 mb-3'>Get in touch</p>
				<h2 id='contact-heading' className='mb-4 font-mono text-[1.6rem] leading-tight text-foreground sm:text-[1.8rem]'>
					Let's build something that lasts.
				</h2>
				<p className='max-w-2xl mb-4 text-[1rem] leading-relaxed text-current/66'>
					From brand principles to production code — building unified experiences that create cohesion, scale with the business, and stay alive even as teams change.
				</p>
				<div className='flex flex-wrap gap-3'>
					<Button as='a' href='https://www.linkedin.com/in/mariavaragilal' variant='outline' size='label' target='_blank' rel='noreferrer'>
						LinkedIn ↗<span className={srOnly}> (opens in new tab)</span>
					</Button>
					<Button as={Link} to='/cv' variant='primary' size='label'>Full CV</Button>
				</div>
			</div>
			<nav className='p-0 mt-auto' aria-label='External profiles'>
				<a
					href='https://dribbble.com/mariavaragilal'
					target='_blank'
					rel='noreferrer'
					className={'flex items-center justify-between border-b border-border py-4 text-sm text-foreground ' + focusRing}
				>
					<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>Dribbble</span>
					<span className='text-[.8em] text-current'>dribbble.com/mariavaragilal →</span>
					<span className={srOnly}> (opens in new tab)</span>
				</a>
				<a
					href='https://codepen.io/mariavaragilal'
					target='_blank'
					rel='noreferrer'
					className={'flex items-center justify-between border-b border-border py-4 text-sm text-foreground ' + focusRing}
				>
					<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>CodePen</span>
					<span className='text-[.8em] text-current'>codepen.io/mariavaragilal →</span>
					<span className={srOnly}> (opens in new tab)</span>
				</a>
				<a
					href='https://be.net/mariavaragilal'
					target='_blank'
					rel='noreferrer'
					className={'flex items-center justify-between border-b border-border py-4 text-sm text-foreground ' + focusRing}
				>
					<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>Behance</span>
					<span className='text-[.8em] text-current'>be.net/mariavaragilal →</span>
					<span className={srOnly}> (opens in new tab)</span>
				</a>
			</nav>
		</div>
	</section>
);
