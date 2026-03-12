import { useState } from 'react';

const TRACK = 'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50';
const THUMB = 'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform';

export const Switch = ({ checked, defaultChecked, onChange, onCheckedChange, id, disabled = false, className = '', ...props }) => {
	const [internal, setInternal] = useState(defaultChecked || false);
	const isControlled = checked !== undefined;
	const isChecked = isControlled ? checked : internal;

	const handleChange = (e) => {
		if (!isControlled) setInternal(e.target.checked);
		if (onChange) onChange(e);
		if (onCheckedChange) onCheckedChange(e.target.checked);
	};

	return (
		<label className={'relative inline-flex items-center cursor-pointer' + (disabled ? ' opacity-50 cursor-not-allowed' : '')}>
			<input
				type='checkbox'
				id={id}
				checked={isChecked}
				onChange={handleChange}
				disabled={disabled}
				className='sr-only peer'
				role='switch'
				aria-checked={isChecked}
				{...props}
			/>
			<span className={TRACK + ' ' + (isChecked ? 'bg-primary' : 'bg-switch-background') + ' ' + className}>
				<span className={THUMB + ' ' + (isChecked ? 'translate-x-4' : 'translate-x-0')}/>
			</span>
		</label>
	);
};
