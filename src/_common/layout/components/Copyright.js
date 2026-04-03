import { useSiteMetadata } from '../../../hooks/useSiteMetadata';

export const Copyright = () => {
	const { author } = useSiteMetadata();
	return (
		<div className='flex align-center justify-start'>
			<p className='text-xs text-current/66 my-auto'>&copy; {new Date().getFullYear()} {author}. All rights reserved.</p>
		</div>
	);
};
