import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Button, Sheet, SheetClose, SheetContent } from '../../../../../../_common/components';
import { DrawerSidebar } from './DrawerSidebar';
import { DrawerMain } from './DrawerMain';

export const CaseDrawer = ({ open, onClose, app, cases = [], onSelectCase }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const idx = cases.findIndex((c) => c.title === app?.title);
	const hasPrev = idx > 0;
	const hasNext = idx >= 0 && idx < cases.length - 1;

	return (
		<Sheet open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
			<SheetContent
				side='right'
				closeButton={false}
				wrapperClassName='full lg:max-w-full top-4 left-4 bottom-4 right-4 rounded-xl'
				className='p-0! overflow-hidden! w-full'
				aria-label={app ? (ui.caseStudyPrefix + ' ' + app.title) : ui.caseStudy}
			>
				{app && (
					<div className='flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-y-hidden'>
						<nav className='sticky z-10 top-0 left-0 flex flex-wrap lg:flex-col lg:h-full gap-5 items-center shrink-0 bg-secondary/50 p-4 justify-between'>
							<SheetClose asChild>
								<Button variant='secondary' size='icon' className='size-8'>
									<motion.span animate={{ rotate: 45 }} className='font-mono font-thin text-xl leading-none' aria-hidden='true'>+</motion.span>
								</Button>
							</SheetClose>
							<div className='flex lg:flex-col gap-2'>
								<Button variant='secondary' size='icon' className='size-8' onClick={() => hasPrev && onSelectCase?.(cases[idx - 1])} disabled={!hasPrev} aria-label={ui.previousCase}>←</Button>
								<Button variant='secondary' size='icon' className='size-8' onClick={() => hasNext && onSelectCase?.(cases[idx + 1])} disabled={!hasNext} aria-label={ui.nextCase}>→</Button>
							</div>
						</nav>
						<DrawerSidebar app={app} ui={ui} />
						<DrawerMain app={app} />
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};
