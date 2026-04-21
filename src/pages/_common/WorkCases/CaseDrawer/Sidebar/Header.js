export const Header = ({ period, title, subtitle }) => (
	<div className='flex flex-col gap-1'>
		<p className='text-[.8em] font-mono text-current underline'>{period}</p>
		<h1 className='font-mono font-medium text-2xl leading-snug'>{title}</h1>
		<p className='text-[1rem] font-sans text-current/66 mt-1.5'>{subtitle}</p>
	</div>
);
