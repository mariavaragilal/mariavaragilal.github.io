import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const BASE = 'w-full h-2 cursor-pointer accent-primary rounded-lg appearance-none bg-secondary ' + focusRing;

export const Slider = ({ className = '', ...props }) => (
	<input type='range' className={cn(BASE, className)} {...props}/>
);
