const BASE = 'animate-pulse rounded-md bg-muted';

export const Skeleton = ({ className = '', ...props }) => (
	<div className={BASE + ' ' + className} {...props}/>
);
