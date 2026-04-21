import { useTranslation } from 'react-i18next';
import { LabelSection } from './LabelSection';
import { Header } from './Header';
import { Skills } from './Skills';
import { References } from './References';

export const Sidebar = ({ app, ui }) => {
	const { t } = useTranslation();
	const opensNewTab = t('mv.contact.opensNewTab');

	return (
		<aside aria-label={ui.sidebarAria || 'Case details'} className='relative w-full xl:w-96 shrink-0 flex flex-col md:border-b md:border-border xl:border-b-0 xl:border-r p-4 sm:p-6 mb:pb-0 xl:p-12 space-y-8'>
			<Header period={app.period} title={app.title} subtitle={app.subtitle}/>

			<section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 md:gap-x-16 xl:gap-y-8 xl:overflow-y-auto space-y-8 xl:space-y-0'>
				{app.role ? (
					<LabelSection heading={ui.role} headingAs='h3'>
						<p className='text-[.8em] font-mono text-current'>{app.role}</p>
					</LabelSection>
				) : null}

				{app.tools ? (
					<LabelSection className='xl:order-last' heading={ui.tools} headingAs='h3'>
						<p className='text-[.8em] font-mono text-current'>{app.tools}</p>
					</LabelSection>
				) : null}

				<Skills caseStudy={app.caseStudy} ui={ui}/>
				<References app={app} ui={ui} opensNewTab={opensNewTab}/>
			</section>
		</aside>
	);
};
