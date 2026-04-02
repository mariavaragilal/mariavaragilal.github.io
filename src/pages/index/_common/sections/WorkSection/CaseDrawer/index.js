import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, navigate } from 'gatsby';
import { Button } from '../../../../../../_common/components';
import { toSlug } from '../../../../../../constants/utils/structuredData';
import { DrawerSidebar } from './DrawerSidebar';
import { DrawerMain } from './DrawerMain';

const caseSlug = (c) => c.slug || toSlug(c.title);

/** Full case study layout for `/cases/:slug/` — no Sheet; scroll is contained in columns (main column on desktop). */
export const CaseStudyView = ({ app, cases = [] }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const ws = t('mv.workSection', { returnObjects: true }) || {};

	if (!app) return null;

	const idx = cases.findIndex((c) => caseSlug(c) === caseSlug(app));
	const hasPrev = idx > 0;
	const hasNext = idx >= 0 && idx < cases.length - 1;

	const goPrev = () => {
		if (!hasPrev) return;
		navigate('/cases/' + caseSlug(cases[idx - 1]) + '/');
	};
	const goNext = () => {
		if (!hasNext) return;
		navigate('/cases/' + caseSlug(cases[idx + 1]) + '/');
	};

	return (

		<React.Fragment>
			{/* <div className='flex flex-1 min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background w-full' aria-label={ui.caseStudyPrefix + ' ' + app.title} id='main-content'> */}
			<div className='flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-hidden lg:h-full'>
				<nav className='sticky z-10 top-0 left-0 flex flex-wrap lg:flex-col lg:h-full gap-5 items-center shrink-0 bg-secondary/50 p-4 justify-between'>
					<Button as={Link} to='/#work' variant='secondary' size='icon' className='size-8' aria-label={'Back to ' + (ws.heading || '')}>
						<motion.span animate={{ rotate: 45 }} className='font-mono font-thin text-xl leading-none' aria-hidden='true'>+</motion.span>
					</Button>
					<div className='flex lg:flex-col gap-2'>
						<Button variant='secondary' size='icon' className='size-8' onClick={goPrev} disabled={!hasPrev} aria-label={ui.previousCase}>←</Button>
						<Button variant='secondary' size='icon' className='size-8' onClick={goNext} disabled={!hasNext} aria-label={ui.nextCase}>→</Button>
					</div>
				</nav>
				<DrawerSidebar app={app} ui={ui} />
				<DrawerMain app={app} />
			</div>
			{/*</div> */}
		</React.Fragment>
	);
};
