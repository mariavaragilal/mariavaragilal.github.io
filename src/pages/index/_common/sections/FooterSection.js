import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Copyright } from '../../../../_common/layout/components/Copyright';
import Languages from '../../../../_common/layout/components/languages';
import { srOnly } from '../../../../constants/utils/a11y';

export const FooterSection = () => {
	const { t } = useTranslation();
	const f = t('mv.footer', { returnObjects: true }) || {};
	const opensNewTab = t('mv.contact.opensNewTab');
	const items = f.builtWithItems || [];
	return (
		<footer className='relative rounded-b-lg w-full bg-background border-t border-border py-5 text-current/88'>
			<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10 space-y-4'>
				<div className='flex flex-col justify-between gap-2 sm:flex-row text-[0.8rem] '>
					<Copyright />
					<Languages />
				</div>
				<div className='mx-auto flex max-w-full flex-col gap-1 text-[0.8rem] '>
					<nav aria-label={f.builtWithNavAria} className='flex flex-wrap gap-x-4 gap-y-1'>
						<h3 className={srOnly}>{f.builtWithNavAria}</h3>
						<span className='text-muted-foreground'>{f.builtWithLabel}</span>
						<div className='flex flex-wrap items-center gap-x-3 text-current/88'>
							{items.map((item, i) => (
								<React.Fragment key={item}>
									{i > 0 ? <span className='shrink-0 text-current/66' aria-hidden='true'>·</span> : null}
									<span>{item}</span>
								</React.Fragment>
							))}
							<span>.</span>
							{' '}
							<Link to='/work/' className='hover:underline'>{f.caseStudiesIndex}</Link>
							<span className='shrink-0 text-current/66' aria-hidden='true'>·</span>
							<a href='https://github.com/mariavaragilal/mariavaragilal.github.io' target='_blank' rel='noopener noreferrer' className='hover:underline'>{f.viewSource}</a>
						</div>
					</nav>
					<nav aria-label={f.referencesNavAria} className='flex flex-wrap gap-x-4 gap-y-1'>
						<h3 className={srOnly}>{f.referencesNavAria}</h3>
						<span className='text-muted-foreground'>{f.referencesLabel}</span>
						<a href='https://www.w3.org/WAI/WCAG21/quickref/' target='_blank' rel='noreferrer' className='hover:underline'>{f.wcag}<span className={srOnly}> {opensNewTab}</span></a>
						<a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility' target='_blank' rel='noreferrer' className='hover:underline'>{f.mdnA11y}<span className={srOnly}> {opensNewTab}</span></a>
					</nav>
				</div>
			</div>
		</footer>
	);
};
