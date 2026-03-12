import React from 'react';

// Link card (live work)
export const LinkCard = ({ url, label, role, featured = false }) => (
	<a href={url} target='_blank' rel='noopener noreferrer' className={'block rounded-lg border p-4 transition-colors hover:bg-accent ' + (featured ? 'border-primary/50 bg-accent/50' : 'border-border')}>
		<p className='font-[Rubik] font-medium text-base text-foreground'>{label}</p>
		{role && <p className='text-sm text-muted-foreground mt-0.5'>{role}</p>}
		<span className='text-xs text-muted-foreground mt-1 inline-block' aria-hidden>↗</span>
	</a>
);

// Portfolio link (Dribbble / Behance)
export const PortLink = ({ url, label, platform }) => (
	<a href={url} target='_blank' rel='noopener noreferrer' className='no-underline inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary'>
		<span className='text-xs uppercase tracking-wider text-muted-foreground underline underline-offset-2'>{platform}</span>
		{label}
		<span aria-hidden>↗</span>
	</a>
);

// Section helpers
export const CaseSectionHeading = ({ children, className = '' }) => (
	<p className={'mb-1 text-xs uppercase tracking-[0.18em] font-semibold text-current/66 ' + className}>{children}</p>
);

export const CaseSection = ({ heading, children }) => (
	<section className='relative'>
		<CaseSectionHeading>{heading}</CaseSectionHeading>
		{children}
	</section>
);
