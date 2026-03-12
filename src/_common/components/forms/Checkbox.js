import { focusRing } from '../../../constants/utils/a11y';

const BASE = 'h-4 w-4 rounded border border-primary accent-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const Checkbox = ({ className = '', ...props }) => (
	<input type='checkbox' className={BASE + ' ' + className} {...props}/>
);
