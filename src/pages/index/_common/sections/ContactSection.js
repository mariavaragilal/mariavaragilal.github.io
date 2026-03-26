import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { srOnly } from '../../../../constants/utils/a11y';
import { Button } from '../../../../_common/components';

export const ContactSection = () => {
	const { t } = useTranslation();
	const c = t('mv.contact', { returnObjects: true }) || {};
	const profiles = Array.isArray(c.profiles) ? c.profiles : [];
	return (
		<section id='contact' aria-labelledby='contact-heading' className='px-6 py-16 lg:px-12'>
			<div className='mx-auto max-w-full grid gap-x-10 gap-y-6 md:grid-cols-2'>
				<div>
					<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66 mb-3'>{c.kicker}</p>
					<h2 id='contact-heading' className='mb-4 font-mono font-medium text-[1.6rem] leading-tight text-foreground sm:text-[1.8rem]'>
						{c.heading}
					</h2>
					<p className='max-w-2xl mb-4 text-[1rem] leading-relaxed text-current/66'>
						{c.body}
					</p>
					<div className='flex flex-wrap gap-3'>
						<Button as='a' href='https://www.linkedin.com/in/mariavaragilal' variant='outline' size='label' target='_blank' rel='noreferrer'>
							{c.linkedin}<span className={srOnly}> {c.opensNewTab}</span>
						</Button>
						<Button as={Link} to='/cv' variant='primary' size='label'>{c.fullCv}</Button>
					</div>
				</div>
				<nav className='p-0 mt-auto' aria-label={c.profilesNavAria}>
					{profiles.map((row) => (
						<Button key={row.href} as='a' href={row.href} target='_blank' rel='noreferrer' variant='ghost' size='unset' className='w-full inline-flex flex-row justify-between items-center rounded-none border-0 border-b border-border py-4 h-auto min-h-0 text-sm text-foreground font-normal hover:bg-secondary/50 hover:px-5'>
							<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>{row.name}</span>
							<span className='text-[.8em] text-current'>{row.line}</span>
							<span className={srOnly}> {c.opensNewTab}</span>
						</Button>
					))}
				</nav>
			</div>
		</section>
	);
};
