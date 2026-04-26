import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, navigate } from 'gatsby';
import { Button } from '../../../../_common/components';
import { toSlug } from '../../../../constants/utils/structuredData';
import { Sidebar } from './Sidebar';
import { Main } from './Main';
import { normalizeCaseApp } from './schema';

const caseSlug = (c) => c.slug || toSlug(c.title);

export const CaseStudyView = ({ app, cases = [] }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const w = t('mv.work', { returnObjects: true }) || {};
	const ws = w.intro || {};

	if (!app) return null;
	const normalizedApp = normalizeCaseApp(app);

	const idx = cases.findIndex((c) => caseSlug(c) === caseSlug(normalizedApp));
	const hasPrev = idx > 0;
	const hasNext = idx >= 0 && idx < cases.length - 1;

	const goPrev = () => {
		if (!hasPrev) return;
		navigate('/work/' + caseSlug(cases[idx - 1]) + '/');
	};
	const goNext = () => {
		if (!hasNext) return;
		navigate('/work/' + caseSlug(cases[idx + 1]) + '/');
	};

	return (
		<div className='flex flex-col xl:flex-row flex-1 min-h-0 min-w-0 w-full overflow-y-auto overflow-x-hidden xl:overflow-hidden xl:h-full'>
			<nav className='sticky z-10 top-0 left-0 flex flex-wrap xl:flex-col xl:h-full gap-5 items-center shrink-0 min-w-0 max-w-full bg-secondary/50 p-4 justify-between' aria-label={ui.caseNavAria || 'Case navigation'}>
				<Button as={Link} to='/#work' variant='secondary' size='icon' className='size-8' aria-label={'Back to ' + (ws.heading || 'work')}>
					<motion.span animate={{ rotate: 45 }} className='font-mono font-thin text-xl leading-none' aria-hidden='true'>+</motion.span>
				</Button>
				<div className='flex xl:flex-col gap-2'>
					<Button variant='secondary' size='icon' className='size-8' onClick={goPrev} disabled={!hasPrev} aria-label={ui.previousCase || 'Previous case'}>
						<span aria-hidden='true'>←</span>
					</Button>
					<Button variant='secondary' size='icon' className='size-8' onClick={goNext} disabled={!hasNext} aria-label={ui.nextCase || 'Next case'}>
						<span aria-hidden='true'>→</span>
					</Button>
				</div>
			</nav>
			<Sidebar app={normalizedApp} ui={ui}/>
			<Main app={normalizedApp}/>
		</div>
	);
};
