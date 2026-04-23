import { useTranslation } from 'react-i18next';
import { MediaA11yProvider } from '../../../../../_common/components';
import { CASE_IMAGES } from './_common/caseImages';
import { OverviewMockup } from './OverviewMockup';
import { Hero } from './Hero';
import { CaseStudy } from './CaseStudy';

export const Main = ({ app }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const projectColor = app.caseStudy?.projectColor;

	return (
		<MediaA11yProvider opensNewTabLabel={ui.opensNewTab}>
			<main
				id='main-content'
				tabIndex={0}
				className='min-w-0 min-h-0 w-full max-w-7xl mx-auto flex-1 xl:overflow-y-auto xl:overscroll-y-contain overscroll-y-contain p-2 sm:p-4 xl:p-12 xl:pb-0 2xl:px-24 2xl:pt-16 flex flex-col gap-12 lg:gap-16 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary'
				aria-label={ui.caseStudyPrefix + ' ' + app.title}
			>
				<Hero app={app} kicker={ui.caseStudy} projectColor={projectColor} />
				<OverviewMockup
					image={app.overviewMockup}
					imageMap={CASE_IMAGES}
					fallback={{ label: ui.overviewLabel || ui.caseStudy, title: app.title, frame: 'browser', ratio: '16 / 9' }}
					labels={{ themePreview: ui.overviewMockup?.previewTheme, lightMode: ui.overviewMockup?.lightMode, darkMode: ui.overviewMockup?.darkMode, opensNewTab: ui.opensNewTab }}
				/>

				{app.caseStudy ? <CaseStudy caseStudy={app.caseStudy} outcomes={app.results} /> : null}
			</main>
		</MediaA11yProvider>
	);
};
