import { useState, createContext, useContext, useId } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';
import { Button } from './Button';

const AccordionContext = createContext({ type: 'single', value: null, onValueChange: () => {} });
const AccordionItemContext = createContext({ value: null, isOpen: false, toggle: () => {}, triggerId: '', panelId: '' });

export const Accordion = ({ type = 'single', collapsible = false, value, defaultValue, onValueChange, className = '', children, ...props }) => {
	const [internal, setInternal] = useState(defaultValue || (type === 'multiple' ? [] : null));
	const isControlled = value !== undefined;
	const activeValue = isControlled ? value : internal;

	const handleChange = (itemValue) => {
		let next;
		if (type === 'multiple') {
			const arr = Array.isArray(activeValue) ? activeValue : [];
			next = arr.includes(itemValue) ? arr.filter(v => v !== itemValue) : [...arr, itemValue];
		} else {
			next = (collapsible && activeValue === itemValue) ? null : itemValue;
		}
		if (!isControlled) setInternal(next);
		if (onValueChange) onValueChange(next);
	};

	return (
		<AccordionContext.Provider value={{ type, value: activeValue, onValueChange: handleChange }}>
			<div className={className} {...props}>{children}</div>
		</AccordionContext.Provider>
	);
};

export const AccordionItem = ({ value, isExpanded: externalExpanded, onToggle: externalToggle, className = '', children, ...props }) => {
	const { value: activeValue, onValueChange, type } = useContext(AccordionContext);
	const uid = useId();
	const triggerId = 'acc-btn-' + uid;
	const panelId = 'acc-panel-' + uid;

	const isManaged = externalToggle !== undefined;
	const internalOpen = type === 'multiple'
		? Array.isArray(activeValue) && activeValue.includes(value)
		: activeValue === value;
	const isOpen = isManaged ? !!externalExpanded : internalOpen;
	const toggle = isManaged ? externalToggle : () => onValueChange(value);

	return (
		<AccordionItemContext.Provider value={{ value, isOpen, toggle, triggerId, panelId }}>
			<div className={cn('relative', className)} {...props}>{children}</div>
		</AccordionItemContext.Provider>
	);
};

const TRIGGER_BASE = 'flex min-w-0 flex-1 items-center justify-between gap-2 py-4 text-sm font-medium transition-all hover:underline text-left break-words cursor-default disabled:cursor-not-allowed data-[readonly=true]:cursor-default ' + focusRing;
const TRIGGER_GRID = 'flex w-full items-center gap-6 text-left grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:col-span-2 cursor-default disabled:cursor-not-allowed data-[readonly=true]:cursor-default ' + focusRing;

const DEFAULT_TRIGGER_PADDING = 'px-1 py-7';

export const AccordionTrigger = ({ className = '', gridCols, triggerGrid, icon, iconPosition = 'end', readOnly, triggerPadding = DEFAULT_TRIGGER_PADDING, children, ...props }) => {
	const { isOpen, toggle, triggerId, panelId } = useContext(AccordionItemContext);
	const [isHovered, setIsHovered] = useState(false);

	const gridLayout = triggerGrid !== undefined ? triggerGrid : TRIGGER_GRID;
	const layoutClass = gridCols ? gridLayout : TRIGGER_BASE;

	const chevronIcon = (
		<span aria-hidden='true' className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}>&#9662;</span>
	);

	const showRotated = isOpen || isHovered;
	const plusIcon = (
		<motion.span
			animate={{ rotate: showRotated ? 45 : 0 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
			className='font-mono font-thin text-xl leading-none'
			aria-hidden='true'
		>+</motion.span>
	);

	const hasIcon = icon !== false && icon !== null;
	const resolvedIconContent = icon === 'plus' ? plusIcon : icon === 'chevron' ? chevronIcon : (typeof icon === 'object' && icon !== null ? icon : chevronIcon);

	const handleClick = (e) => { toggle(); if (props.onClick) props.onClick(e); };
	const handleMouseEnter = (e) => { setIsHovered(true); if (props.onMouseEnter) props.onMouseEnter(e); };
	const handleMouseLeave = (e) => { setIsHovered(false); if (props.onMouseLeave) props.onMouseLeave(e); };

	const contentButtonProps = {
		...props,
		id: triggerId,
		type: 'button',
		'aria-expanded': isOpen,
		'aria-controls': panelId,
		className: cn(layoutClass, !hasIcon && 'cursor-pointer', className),
		'data-readonly': readOnly,
		onClick: handleClick,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
	};

	const iconButton = hasIcon ? (
		<Button variant='secondary' size='icon' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} readOnly={readOnly} aria-hidden='true' className='shrink-0 self-center'>
			{resolvedIconContent}
		</Button>
	) : null;

	const content = <div {...contentButtonProps}>{children}</div>;
	const iconFirst = iconPosition === 'start';

	return gridCols ? (
		<div className={cn('flex w-full min-w-0 items-center gap-6 md:grid', triggerPadding || undefined, gridCols)}>
			{iconFirst && iconButton}
			{content}
			{!iconFirst && iconButton}
		</div>
	) : (
		<h3 className='flex w-full min-w-0 items-center gap-2'>
			{iconFirst && iconButton}
			{content}
			{!iconFirst && iconButton}
		</h3>
	);
};

export const AccordionContent = ({ className = '', animate: shouldAnimate = true, ariaLabel, children, ...props }) => {
	const { isOpen, triggerId, panelId } = useContext(AccordionItemContext);
	const regionProps = ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-labelledby': triggerId };

	if (!shouldAnimate) return (
		<div id={panelId} role='region' className={isOpen ? '' : 'hidden'} data-print-expand {...regionProps}>
			{children}
		</div>
	);

	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<motion.div
					id={panelId}
					role='region'
					{...regionProps}
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
					className={cn('overflow-hidden text-sm', className)}
					{...props}
				>
					<div className='pb-4 pt-0'>{children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
