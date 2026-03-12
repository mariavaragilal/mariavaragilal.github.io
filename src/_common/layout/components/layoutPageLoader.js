import React from 'react';
import { motion } from 'motion/react';

const LayoutPageLoader = () => (
	<div className='flex flex-col justify-center items-center relative h-[100vh]' role='status' aria-live='polite'>
		<div className='relative' aria-hidden='true'>
			<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className='rounded-full h-12 w-12 border-4 border-border'/>
			<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className='rounded-full h-12 w-12 border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 absolute top-0 left-0'/>
		</div>
		<p className='mt-4 text-sm text-current/88 font-medium' aria-label='Loading page content'>Loading…</p>
	</div>
);

export default LayoutPageLoader;
