import { useRef } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const CONTAINER = 'flex items-center gap-2';
const SLOT = 'relative flex h-9 w-9 items-center justify-center rounded-md border border-input bg-input-background text-sm font-medium shadow-sm';
const INPUT_CLS = 'absolute inset-0 h-full w-full opacity-0 text-center cursor-text ' + focusRing;

export const InputOtp = ({ length = 6, value = '', onChange, className = '', ...props }) => {
	const refs = useRef([]);
	const vals = (value + '').split('').concat(Array(length).fill('')).slice(0, length);

	const handleInput = (e, i) => {
		const char = e.target.value.slice(-1);
		const next = vals.slice();
		next[i] = char;
		if (onChange) onChange(next.join(''));
		if (char && refs.current[i + 1]) refs.current[i + 1].focus();
	};

	const handleKeyDown = (e, i) => {
		if (e.key === 'Backspace' && !vals[i] && refs.current[i - 1]) refs.current[i - 1].focus();
	};

	return (
		<div className={CONTAINER + ' ' + className} role='group' aria-label='One-time password input' {...props}>
			{vals.map((v, i) => (
				<div key={i} className={SLOT + (v ? ' ring-1 ring-ring' : '')}>
					<span aria-hidden='true'>{v}</span>
					<input
						ref={el => { refs.current[i] = el; }}
						type='text'
						inputMode='numeric'
						maxLength={1}
						value={v}
						onChange={e => handleInput(e, i)}
						onKeyDown={e => handleKeyDown(e, i)}
						aria-label={'Digit ' + (i + 1) + ' of ' + length}
						className={INPUT_CLS}
					/>
				</div>
			))}
		</div>
	);
};

export const InputOtpGroup = ({ className = '', ...props }) => (
	<div className={'flex items-center ' + className} {...props}/>
);

export const InputOtpSeparator = ({ className = '', ...props }) => (
	<div role='separator' className={className} {...props}><span aria-hidden='true'>–</span></div>
);
