import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Languages from './languages';
import ThemeToggle from './themeToggle';
import { srOnly } from '../../../constants/utils/a11y';

const LayoutHeader = ({ pathname, isLandingPage }) => {
	const { t } = useTranslation();
	const casesNav = t('mv.caseUi.liveWorkNav');
	if (isLandingPage) return null;
	const linkClass = 'mx-3 text-[.72em] uppercase tracking-[0.22em] font-bold transition hover:bg-accent hover:text-primary ';
	const activeClass = 'text-brand dark:text-brand/75';
	const inactiveClass = 'text-current';
	const divider = <span className='hidden sm:block w-px h-4 bg-border sm:mx-2 self-center' aria-hidden='true' />;
	const casesActive = pathname.startsWith('/work');
	return (
		<header className='flex flex-wrap justify-between align-center gap-2 z-110 print:hidden shrink-0' role='banner'>
			<h1 className={srOnly}>Maria Varagilal</h1>
			<nav className='flex items-center gap-2' role='navigation' aria-label='Primary navigation'>
				<h2 className={srOnly}>Primary navigation</h2>
				<Link to='/' className={linkClass + (pathname === '/' ? activeClass : inactiveClass)}>#MVP</Link>
				{divider}
				<Link to='/work/' className={"sr-only " + linkClass + (casesActive ? activeClass : inactiveClass)}>{casesNav}</Link>
				<Link to='/cv' className={linkClass + (pathname === '/cv' || pathname.startsWith('/cv/') ? activeClass : inactiveClass)}>CV</Link>
			</nav>
			<nav className='flex items-center gap-2' role='navigation' aria-label='Theme and language'>
				<h2 className={srOnly}>Theme and language</h2>
				<ThemeToggle />
				{divider}
				<Languages />
			</nav>
		</header>
	);
};

export default LayoutHeader;
