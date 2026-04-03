import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../components';
import { useTheme } from '../../../hooks/useTheme';

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const dropdownRef = useRef(null);

	const handleThemeChange = (newTheme) => {
		setTheme(newTheme);
		setIsOpen(false);
	};

	const themes = [
		{ value: 'light', label: 'Light', icon: '☀️' },
		{ value: 'dark', label: 'Dark', icon: '🌙' },
		{ value: 'system', label: 'System', icon: '💻' },
	];

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
		};
		const handleEscape = (event) => {
			if (event.key === 'Escape') setIsOpen(false);
		};
		const handleKeyDown = (event) => {
			if (!isOpen) return;
			const options = Array.from(dropdownRef.current?.querySelectorAll('button[role=\'menuitem\']') || []);
			const currentIndex = options.findIndex((option) => option === document.activeElement);
			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					options[currentIndex < options.length - 1 ? currentIndex + 1 : 0]?.focus();
					break;
				case 'ArrowUp':
					event.preventDefault();
					options[currentIndex > 0 ? currentIndex - 1 : options.length - 1]?.focus();
					break;
				case 'Home':
					event.preventDefault();
					options[0]?.focus();
					break;
				case 'End':
					event.preventDefault();
					options[options.length - 1]?.focus();
					break;
				default:
					break;
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div className='relative ml-auto justify-end' ref={dropdownRef}>
			<Button type='button' variant='ghost' size='sm' onClick={() => setIsOpen(!isOpen)} className='group flex items-center gap-2 px-3 py-1 h-auto' aria-label='Theme selector' aria-expanded={isOpen} aria-haspopup='true'>
				<span className='text-current/66 group-hover:text-foreground transition-colors'>{theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}</span>
			</Button>
			<AnimatePresence>
				{isClient && isOpen && (
					<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className='absolute right-0 p-1 mt-2 w-48 border-0 bg-popover rounded-xl shadow-xl border border-border z-50 overflow-hidden' role='menu' aria-label='Theme selection menu'>
					{themes.map((themeOption, index) => (
						<Button key={themeOption.value} as='button' role='menuitem' variant='ghost' onClick={() => handleThemeChange(themeOption.value)} className={'w-full flex items-center gap-3 px-4 py-3 text-sm text-left justify-start h-auto rounded-none ' + (theme === themeOption.value ? 'bg-accent text-primary' : 'text-current/88 hover:bg-accent') + ' ' + (index === 0 ? 'rounded-t-lg' : '') + ' ' + (index === themes.length - 1 ? 'rounded-b-lg' : '')} aria-current={theme === themeOption.value ? 'true' : 'false'} aria-describedby={'theme-' + themeOption.value + '-description'}>
							<span className='text-lg' aria-hidden='true'>{themeOption.icon}</span>
							<div className='flex-1'>
								<div className='font-medium'>{themeOption.label}</div>
								<div id={'theme-' + themeOption.value + '-description'} className='text-xs text-current/66'>{themeOption.value === 'system' ? 'Use system preference' : 'Switch to ' + themeOption.label.toLowerCase() + ' theme'}</div>
							</div>
							{theme === themeOption.value && (
								<svg className='w-4 h-4 text-primary' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
									<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'/>
								</svg>
							)}
						</Button>
					))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ThemeToggle;
