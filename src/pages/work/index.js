import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../../_common/layout';
import { srOnly } from '../../constants/utils/a11y';
import { Card, Separator } from '../../_common/components';
import { toSlug } from '../../constants/utils/structuredData';
import { CaseCard } from '../_common/WorkCases/CaseCard';
import { Link } from 'gatsby';
import { flattenWorkCasesOrdered } from '../../constants/utils/structuredData';
import { getAbsoluteUrl } from '../../constants/utils/index';

const caseSlug = (app) => app.slug || toSlug(app.title);

const CasesIndexPage = () => {
	const { t } = useTranslation();
	const workCases = t('mv.workCases', { returnObjects: true }) || {};
	const ws = t('mv.workSection', { returnObjects: true }) || {};
	const title = ws.kicker + ' — ' + ws.heading;

	return (
		<Layout title={title} description={ws.p1} className='text-foreground flex-1 min-h-0 overflow-y-auto h-full'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>{t('home.skipToMain')}</a>
			<Card as='section' id='main-content' className='flex-1 rounded-xl px-6 py-12 lg:px-10 space-y-10'>
				<div className='flex flex-col relative'>
					<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66'>{ws.kicker}</p>
					<h1 className='font-mono font-medium text-[clamp(1.5rem,4vw,2.5rem)] tracking-tight text-foreground mt-2'>{ws.heading}</h1>
					<p className='text-[1.125rem] leading-relaxed text-current/88 mt-4 max-w-3xl'>{ws.p1}</p>
					<nav aria-label={ws.browseAllCases} className={srOnly}>
						<h1><Link to={getAbsoluteUrl('/work')} className='text-current/88 hover:underline'>{ws.browseAllCases}</Link></h1>
						<ul>
							{flattenWorkCasesOrdered(workCases).map((app) => {
								const slug = caseSlug(app);
								return <li key={slug}><Link className='font-mono' to={getAbsoluteUrl('/work/' + slug)}><h2 className='fs-[.5rem] inline-block fs-inherit'>[{app.title}] url: {getAbsoluteUrl('/work/' + slug + '/')}</h2></Link></li>;
							})}
						</ul>
					</nav>
				</div>
				<div className='relative flex flex-col gap-8'>
					{Object.entries(workCases).map(([groupName, group]) => (
						<React.Fragment key={groupName}>
							<Separator decorative />
							<section className='flex flex-col gap-4' aria-labelledby={'cases-group-' + toSlug(groupName)}>
								<div className='flex w-full min-w-0 items-center gap-6 text-left grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:col-span-2 px-1 py-7 items-start'>
									<div className='flex flex-col'>
										<span className='uppercase tracking-[0.16em] text-current/22 font-medium' aria-hidden='true'>{group.period}</span>
										<h2 id={'cases-group-' + toSlug(groupName)} className='font-mono text-[clamp(1.2rem,2.5vw,1.5rem)] leading-8 font-medium text-current mb-0'>{groupName}</h2>
									</div>
									<div className='relative w-full max-w-3xl flex flex-col gap-2'>
										{group.context && <p className='leading-relaxed text-current/66'>{group.context}</p>}
										{group.contextNote && <p className='leading-relaxed text-current/66 text-sm italic'>{group.contextNote}</p>}
									</div>
								</div>
								<div className='px-1 pb-6 -mx-3 lg:mx-0' role='region' aria-label={groupName + ' case studies'}>
									<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]'>
										{group.cases.map((app) => {
											const slug = caseSlug(app);
											return <CaseCard className='border border-border/50' key={app.title} id={'case-' + slug} app={app} isSelected={false} to={getAbsoluteUrl('/work/' + slug)} as='h4' />;
										})}
									</div>
								</div>
							</section>
						</React.Fragment>
					))}
				</div>
			</Card>
		</Layout>
	);
};

export default CasesIndexPage;
