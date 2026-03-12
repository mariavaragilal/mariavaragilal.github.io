import React from 'react';
import { Button } from '../../_common/components';

export const ScrollToTop = ({ visible }) => {
	if (!visible) return null;
	return (
		<Button
			variant='default'
			size='fab'
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			aria-label='Scroll to top'
			className='fixed bottom-6 right-6 z-40 shadow-lg print:hidden'
		>
			<span className='text-lg leading-none' aria-hidden='true'>↑</span>
		</Button>
	);
};
