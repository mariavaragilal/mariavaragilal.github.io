import { useState } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const NAV_BTN = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 ' + focusRing;
const DAY_BASE = 'h-8 w-8 p-0 font-normal inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ' + focusRing;
const DAY_SELECTED = 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground';
const DAY_TODAY = 'bg-accent text-accent-foreground';
const DAY_DISABLED = 'text-muted-foreground opacity-50 pointer-events-none';

const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const getDaysInMonth = (year, month) => {
	const days = [];
	const firstDay = new Date(year, month, 1).getDay();
	const total = new Date(year, month + 1, 0).getDate();
	for (let i = 0; i < firstDay; i++) days.push(null);
	for (let d = 1; d <= total; d++) days.push(new Date(year, month, d));
	return days;
};

export const Calendar = ({ selected, defaultMonth, onSelect, disabled, fromDate, toDate, className = '', ...props }) => {
	const today = new Date();
	const initial = defaultMonth || (selected instanceof Date ? selected : today);
	const [viewDate, setViewDate] = useState(initial);
	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();
	const days = getDaysInMonth(year, month);
	const weeks = [];
	for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

	const isSelected = (d) => {
		if (!d || !selected) return false;
		if (selected instanceof Date) return isSameDay(d, selected);
		if (Array.isArray(selected)) return selected.some(s => isSameDay(d, s));
		return false;
	};

	const isDisabled = (d) => {
		if (!d) return true;
		if (typeof disabled === 'function' && disabled(d)) return true;
		if (fromDate && d < fromDate) return true;
		if (toDate && d > toDate) return true;
		return false;
	};

	const handleSelect = (d) => {
		if (!d || isDisabled(d)) return;
		if (onSelect) onSelect(d);
	};

	return (
		<div className={'p-3 ' + className} {...props}>
			<div className='flex flex-col space-y-4'>
				<div className='relative flex items-center justify-center pt-1'>
					<div className='text-sm font-medium'>{MONTHS[month] + ' ' + year}</div>
					<div className='absolute flex items-center justify-between inset-x-0'>
						<button type='button' aria-label='Go to previous month' className={NAV_BTN} onClick={() => setViewDate(new Date(year, month - 1, 1))}>
							<span aria-hidden='true'>‹</span>
						</button>
						<button type='button' aria-label='Go to next month' className={NAV_BTN} onClick={() => setViewDate(new Date(year, month + 1, 1))}>
							<span aria-hidden='true'>›</span>
						</button>
					</div>
				</div>
				<table role='grid' aria-label={MONTHS[month] + ' ' + year} className='w-full border-collapse space-y-1'>
					<thead>
						<tr className='flex'>
							{DAYS.map(d => (
								<th key={d} scope='col' className='rounded-md w-8 font-normal text-[0.8rem] text-muted-foreground'>
									<span aria-hidden='true'>{d}</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{weeks.map((week, wi) => (
							<tr key={wi} className='flex w-full mt-2'>
								{Array(7).fill(null).map((_, di) => {
									const day = week[di] || null;
									return (
										<td key={di} className='h-8 w-8 text-center text-sm p-0 relative'>
											{day ? (
												<button
													type='button'
													aria-label={day.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
													aria-pressed={isSelected(day)}
													aria-current={isSameDay(day, today) ? 'date' : undefined}
													disabled={isDisabled(day)}
													className={DAY_BASE + ' ' + (isSelected(day) ? DAY_SELECTED : isSameDay(day, today) ? DAY_TODAY : '') + (isDisabled(day) ? ' ' + DAY_DISABLED : '')}
													onClick={() => handleSelect(day)}
												>
													{day.getDate()}
												</button>
											) : (
												<span className='invisible' aria-hidden='true'/>
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
