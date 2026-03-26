import { useMemo, useState } from 'react';
import { cva } from 'class-variance-authority';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const weekdayShortLabels = (locale) => {
	const out = [];
	for (let i = 0; i < 7; i++) {
		const d = new Date(2024, 0, 7 + i);
		out.push(d.toLocaleDateString(locale, { weekday: 'short' }));
	}
	return out;
};

const NAV_BTN = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 ' + focusRing;

const calendarDayVariants = cva('p-0 font-normal inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 max-w-full shrink-0 ' + focusRing, {
	variants: {
		dayState: {
			plain: '',
			selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
			today: 'bg-accent text-accent-foreground',
			disabled: 'text-muted-foreground opacity-50 pointer-events-none',
		},
	},
	defaultVariants: {
		dayState: 'plain',
	},
});

const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const getDaysInMonth = (year, month) => {
	const days = [];
	const firstDay = new Date(year, month, 1).getDay();
	const total = new Date(year, month + 1, 0).getDate();
	for (let i = 0; i < firstDay; i++) days.push(null);
	for (let d = 1; d <= total; d++) days.push(new Date(year, month, d));
	return days;
};

export const Calendar = ({ selected, defaultMonth, onSelect, disabled, fromDate, toDate, className = '', locale = 'en-US', ...props }) => {
	const today = new Date();
	const initial = defaultMonth || (selected instanceof Date ? selected : today);
	const [viewDate, setViewDate] = useState(initial);
	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();
	const monthYearTitle = useMemo(() => new Date(year, month, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' }), [year, month, locale]);
	const dayHeaders = useMemo(() => weekdayShortLabels(locale), [locale]);
	const prevMonthAria = locale.indexOf('pt') === 0 ? 'Ir para o mês anterior' : 'Go to previous month';
	const nextMonthAria = locale.indexOf('pt') === 0 ? 'Ir para o mês seguinte' : 'Go to next month';
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

	const dayStateFor = (day) => {
		if (isDisabled(day)) return 'disabled';
		if (isSelected(day)) return 'selected';
		if (isSameDay(day, today)) return 'today';
		return 'plain';
	};

	return (
		<div className={cn('w-full min-w-0 p-3', className)} {...props}>
			<div className='flex w-full min-w-0 flex-col space-y-4'>
				<div className='relative flex w-full items-center justify-center pt-1'>
					<div className='text-sm font-medium'>{monthYearTitle}</div>
					<div className='absolute flex items-center justify-between inset-x-0'>
						<button type='button' aria-label={prevMonthAria} className={NAV_BTN} onClick={() => setViewDate(new Date(year, month - 1, 1))}>
							<span aria-hidden='true'>‹</span>
						</button>
						<button type='button' aria-label={nextMonthAria} className={NAV_BTN} onClick={() => setViewDate(new Date(year, month + 1, 1))}>
							<span aria-hidden='true'>›</span>
						</button>
					</div>
				</div>
				<table role='grid' aria-label={monthYearTitle} className='w-full min-w-0 border-collapse'>
					<thead>
						<tr className='flex w-full'>
							{dayHeaders.map((d, hi) => (
								<th key={hi} scope='col' className='flex-1 min-w-0 rounded-md px-0.5 font-normal text-[0.8rem] text-muted-foreground'>
									<span aria-hidden='true' className='block truncate text-center'>{d}</span>
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
										<td key={di} className='relative flex-1 min-w-0 p-0 text-center text-sm'>
											{day ? (
												<div className='flex h-9 w-full items-center justify-center'>
													<button
														type='button'
														aria-label={day.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
														aria-pressed={isSelected(day)}
														aria-current={isSameDay(day, today) ? 'date' : undefined}
														disabled={isDisabled(day)}
														className={calendarDayVariants({ dayState: dayStateFor(day) })}
														onClick={() => handleSelect(day)}
													>
														{day.getDate()}
													</button>
												</div>
											) : (
												<span className='invisible block h-9' aria-hidden='true'/>
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
