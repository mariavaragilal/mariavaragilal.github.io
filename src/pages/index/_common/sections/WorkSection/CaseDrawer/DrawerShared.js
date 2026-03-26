export const hasCaseStudy = (app) => !!(app.caseStudy && Object.keys(app.caseStudy).length > 0);

const CaseSectionHeading = ({ as: Tag = 'h1', children, className = '' }) => (
	<Tag className={'mb-1 text-xs uppercase tracking-[0.18em] font-semibold text-current/44 ' + className}>{children}</Tag>
);

export const CaseSection = ({ heading, children, as: Tag = 'div', headingAs = 'h1', className = '', classHeading = '' }) => (
	<Tag role='region' className={'relative ' + className} aria-label={heading + ' section'}>
		<CaseSectionHeading as={headingAs} className={classHeading}>{heading}</CaseSectionHeading>
		{children}
	</Tag>
);
