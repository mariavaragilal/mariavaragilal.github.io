export const hasCaseStudy = (app) => !!(app.caseStudy && Object.keys(app.caseStudy).length > 0);

const CaseSectionHeading = ({ as: Tag = 'h1', children, className = '' }) => (
	<Tag className={'mb-4 text-xs md:text-sm uppercase tracking-[0.08em] font-semibold text-current/88 ' + className}>{children}</Tag>
);

export const CaseSection = ({ heading, children, as: Tag = 'div', headingAs = 'h3', className = '', classHeading = '' }) => (
	<Tag className={'relative ' + className}>
		<CaseSectionHeading as={headingAs} className={classHeading}>{heading}</CaseSectionHeading>
		{children}
	</Tag>
);
