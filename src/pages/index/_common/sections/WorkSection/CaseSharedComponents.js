export const CaseLink = ({ url, label, role, featured = false, platform }) => {
	const linkProps = { href: url, target: '_blank', rel: 'noopener noreferrer' };
	if (platform) {
		return (
			<a {...linkProps} className='no-underline inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary'>
				<span className='text-xs uppercase tracking-wider text-muted-foreground underline underline-offset-2'>{platform}</span>
				{label}
				<span aria-hidden>↗</span>
			</a>
		);
	}
	return (
		<a {...linkProps} className={'block rounded-lg border p-4 transition-colors hover:bg-accent ' + (featured ? 'border-primary/50 bg-accent/50' : 'border-border')}>
			<p className='font-mono text-base text-foreground'>{label}</p>
			{role && <p className='text-sm text-muted-foreground mt-0.5'>{role}</p>}
			<span className='text-xs text-muted-foreground mt-1 inline-block' aria-hidden>↗</span>
		</a>
	);
};

// Section helpers
export const CaseSectionHeading = ({ as: Tag = 'h1', children, className = '' }) => (
	<Tag className={'mb-1 text-xs uppercase tracking-[0.18em] font-semibold text-current/44 ' + className}>{children}</Tag>
);

export const CaseSection = ({ heading, children, as: Tag = 'div', headingAs = 'h1', className = '', classHeading = '' }) => (
	<Tag role='region' className={'relative ' + className} aria-label={heading + ' section'}>
		<CaseSectionHeading as={headingAs} className={classHeading}>{heading}</CaseSectionHeading>
		{children}
	</Tag>
);
