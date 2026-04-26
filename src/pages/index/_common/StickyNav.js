import { Link } from 'gatsby';
import { motion } from 'motion/react';
import logo from '../../../assets/images/avatar.png';
import { srOnly } from '../../../constants/utils/a11y';

export const StickyNav = ({ showScrollTop, isScrolled, activeSection, onScrollToSection, navOpen: _navOpen, setNavOpen, isAnimated, stickyNav }) => {
	return (
		<motion.nav initial={isAnimated ? { y: -100 } : { y: 0 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className={'md:max-w-[28em] lg:mx-auto justify-center items-center text-center rounded-full sticky z-100 transition-all duration-300 translate-y-0 opacity-100 print:hidden ' + (showScrollTop ? ' mx-6 bg-background/80 backdrop-blur-md border border-border my-3 px-5 top-3' : ' mx-auto text-current p-6 pb-0')} aria-label={stickyNav?.ariaLabel}>
			<h3 className={srOnly}>{stickyNav?.ariaLabel}</h3>
			<div className='relative mx-auto py-2.5 flex flex-wrap justify-between items-center justify-between'>
				<Link to='/' className={'font-medium text-[.725rem] uppercase sm:tracking-[.2em]' + (isScrolled ? ' text-foreground' : ' text-current')}>
					<img src={logo} alt={stickyNav?.logoAlt} className='w-8 sm:w-4.5 rounded-sm sm: rounded-xs aspect-square inline-block' />
					<span className='hidden sm:inline ml-2'>{stickyNav?.brandName}</span>
				</Link>
				<div id='nav-menu' className='flex flex-wrap justify-center items-center mt-0 min-w-0 rounded-none bg-transparent backdrop-blur-none p-0 shadow-none sm:gap-1'>
					{(stickyNav?.sections || []).map((s) => (
						<a
							key={s.id}
							href={'#' + s.id}
							onClick={(e) => { e.preventDefault(); onScrollToSection(s.id); setNavOpen(false); }}
							className={'relative px-2.5 py-2 md:px-4 rounded-full text-[.725rem] tracking-[0.15em] uppercase font-bold whitespace-nowrap transition-all duration-300 ' + (activeSection === s.id ? 'text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground')}
						>
							{activeSection === s.id && (
								<motion.div layoutId='activeNavBackground' className='absolute inset-0 bg-primary rounded-full' />
							)}
							<span className='relative z-10'>{s.label}</span>
						</a>
					))}
				</div>
			</div>
		</motion.nav>
	);
};
