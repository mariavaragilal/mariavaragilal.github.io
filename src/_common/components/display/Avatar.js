const ROOT = 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full';
const IMAGE = 'aspect-square h-full w-full object-cover';
const FALLBACK = 'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium';

export const Avatar = ({ className = '', ...props }) => (
	<span className={ROOT + ' ' + className} {...props}/>
);

export const AvatarImage = ({ alt = '', className = '', ...props }) => (
	<img alt={alt} className={IMAGE + ' ' + className} {...props}/>
);

export const AvatarFallback = ({ className = '', ...props }) => (
	<span aria-hidden='true' className={FALLBACK + ' ' + className} {...props}/>
);
