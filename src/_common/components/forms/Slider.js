import { focusRing } from '../../../constants/utils/a11y';

const BASE = 'w-full h-2 cursor-pointer accent-primary rounded-lg appearance-none bg-secondary ' + focusRing;

export const Slider = ({ className = '', ...props }) => (
	<input type='range' className={BASE + ' ' + className} {...props}/>
);
