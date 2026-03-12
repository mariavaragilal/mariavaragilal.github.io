import React from 'react';
import { Link } from 'gatsby';
import Languages from './languages';
import ThemeToggle from './themeToggle';

const LayoutHeader = ({ pathname, isLandingPage }) => {
	if (isLandingPage) return null;
	const linkClass = 'mx-3 text-[11px] uppercase tracking-[0.22em] transition hover:bg-accent hover:text-primary ';
	const activeClass = 'text-blue-600 dark:text-blue-400';
	const inactiveClass = 'text-current';
	const divider = <span className='hidden sm:block w-px h-4 bg-border sm:mx-2 self-center' aria-hidden='true'/>;
	return (
		<header className='flex flex-wrap justify-between align-center gap-2 z-110 print:hidden' role='banner'>
			<h1 className='sr-only'>Maria Varagilal</h1>
			<nav className='flex items-center gap-2' role='navigation' aria-label='Primary navigation'>
				<h1 className='sr-only'>Navigation</h1>
				<Link to='/' className={linkClass + (pathname === '/' ? activeClass : inactiveClass)}>#MVP</Link>
				{divider}
				<Link to='/cv' className={linkClass + (pathname === '/cv' || pathname.startsWith('/cv/') ? activeClass : inactiveClass)}>CV</Link>
			</nav>
			<nav className='flex items-center gap-2' role='navigation' aria-label='Theme and language'>
				<h1 className='sr-only'>Theme and language</h1>
				<ThemeToggle/>
				{divider}
				<Languages/>
			</nav>
		</header>
	);
};

export default LayoutHeader;
