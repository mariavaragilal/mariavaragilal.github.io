export const Header = ({ period, title, subtitle }) => (
	<div className='flex flex-col gap-1 min-w-0 max-w-full'>
		<p className='text-[.8em] font-mono text-current underline break-words'>{period}</p>
		<h1 className='font-mono font-medium text-2xl leading-snug break-words'>{title}</h1>
		<p className='text-[1rem] font-sans text-current/66 mt-1.5 break-words'>{subtitle}</p>
	</div>
);
