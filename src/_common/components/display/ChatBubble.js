const WIDTH_CLASSES = { 'fit-content': 'w-fit', full: 'w-full', auto: 'w-auto' };

const VARIANTS = {
	default: 'bg-primary/10 text-primary',
	primary: 'bg-primary text-primary-foreground',
	inverse: 'bg-primary-foreground text-primary',
	secondary: 'bg-secondary text-secondary-foreground',
	muted: 'bg-muted text-primary',
	accent: 'bg-accent text-accent-foreground',
	outline: 'border border-foreground/20 bg-transparent text-foreground',
};

const TYPE_DEFAULTS = {
	question: 'bg-primary/10 text-primary',
	answer: 'bg-muted text-muted-foreground',
};

export function ChatBubble({ type, children, show, delayClass, width, variant = 'default' }) {
	const base = 'transition-all duration-400 rounded-2xl text-[0.88rem] leading-relaxed';
	const question = 'self-end max-w-[85%] py-2.5 px-4 rounded-[16px_16px_4px_16px]';
	const answer = 'self-start max-w-[92%] w-[auto] py-3 px-4 rounded-[16px_16px_16px_4px]';
	const colorClass = VARIANTS[variant] || TYPE_DEFAULTS[type];
	const visible = show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';
	const widthClass = width && WIDTH_CLASSES[width] ? WIDTH_CLASSES[width] : '';
	return (
		<div className={base + ' ' + (type === 'question' ? question : answer) + ' ' + colorClass + ' ' + visible + (widthClass ? ' ' + widthClass : '') + (delayClass ? ' ' + delayClass : '')}>
			{children}
		</div>
	);
}

export function ChatBubbleQuestion({ children, width, variant = 'default' }) {
	return <ChatBubble type='question' show={true} width={width} variant={variant}>{children}</ChatBubble>;
}

export function ChatBubbleAnswer({ children, width, variant = 'muted' }) {
	return <ChatBubble type='answer' show={true} width={width} variant={variant}>{children}</ChatBubble>;
}
