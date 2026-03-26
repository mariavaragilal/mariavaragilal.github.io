import { cn } from '../../../constants/utils/cn';

const BASE = 'animate-pulse rounded-md bg-muted';

export const Skeleton = ({ className = '', ...props }) => (
	<div className={cn(BASE, className)} {...props}/>
);
