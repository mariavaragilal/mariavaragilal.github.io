import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { motion } from 'motion/react';

import logo from '../../../assets/images/avatar.png';

export const SECTIONS = [
	{ id: 'framework', label: 'Playbook' },
	{ id: 'work', label: 'Work' },
	// { id: 'ai-exploration', label: 'AI' },
];

export const StickyNav = ({ showScrollTop, isScrolled, activeSection, onScrollToSection, navOpen, setNavOpen, isAnimated }) => {
	// const navMenuResponsive = navOpen ? 'flex-col absolute top-full right-0 mt-1 rounded-2xl bg-background/95 backdrop-blur-md p-2 shadow-lg gap-0 md:static md:flex-row md:mt-0 md:min-w-0 md:rounded-none md:bg-transparent md:backdrop-blur-none md:p-0 md:shadow-none md:gap-1' : 'hidden';
	return (
		<motion.nav initial={isAnimated ? { y: -100 } : { y: 0 }} animate={isAnimated ? { y: 0 } : { y: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className={'md:max-w-[25.5em] lg:mx-auto justify-center items-center text-center rounded-full sticky z-100 transition-all duration-300 translate-y-0 opacity-100 print:hidden ' + (showScrollTop ? ' mx-6 bg-background/80 backdrop-blur-md border border-border my-3 px-5 top-3' : ' mx-auto text-current p-6 pb-0')} aria-label='Section navigation'>
			<h1 className='sr-only'>Navigation</h1>
			<div className='relative mx-auto py-2.5 flex flex-wrap justify-between items-center justify-between'>
				<Link to='/' className={'font-medium text-[.725rem] uppercase sm:tracking-[.2em]' + (isScrolled ? ' text-foreground' : ' text-current')}>
					<img src={logo} alt='Maria Varagilal' className='w-8 sm:w-4.5 rounded-sm sm: rounded-xs aspect-square inline-block' />
					<span className='hidden sm:inline ml-2'>MariaVaragilal</span>
				</Link>
				<button type='button' onClick={() => setNavOpen(!navOpen)} className='hidden p-2 -m-2 rounded-lg' aria-expanded={navOpen} aria-controls='nav-menu'>
					<span className='sr-only'>{navOpen ? 'Close menu' : 'Open menu'}</span>
					<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
						{navOpen ? <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /> : <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />}
					</svg>
				</button>
				<div id='nav-menu' className='flex flex-wrap justify-center items-center mt-0 min-w-0 rounded-none bg-transparent backdrop-blur-none p-0 shadow-none sm:gap-1'>
					{SECTIONS.map((s) => (
						<a
							key={s.id}
							href={'#' + s.id}
							onClick={(e) => { e.preventDefault(); onScrollToSection(s.id); setNavOpen(false); }}
							className={'relative px-2.5 py-2 md:px-4 rounded-full text-[.725rem] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ' + (activeSection === s.id ? 'text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground')}
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
