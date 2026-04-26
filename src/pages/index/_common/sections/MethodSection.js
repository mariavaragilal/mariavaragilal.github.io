import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loop } from '../../../../_common/components';
import { RichText } from '../../../_common/RichText';

export const MethodSection = () => {
	const { t } = useTranslation();
	const method = t('mv.method', { returnObjects: true }) || {};
	const howBlock = method.howBlock || {};
	const numbered = howBlock.numbered || [];
	const loopBlock = method.loopBlock || {};
	const doSection = method.doSection || {};

	return (
		<React.Fragment>
			<section className='pt-16 lg:py-24 pb-16'>
				<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10'>
					<div className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{howBlock.kicker}</div>
					<h2 className='font-mono font-medium text-[clamp(1.625rem,3.5vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-foreground mb-16'>
						{howBlock.openingTitle}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
						{numbered.map((item) => (
							<div key={item.n}>
								<div className='font-mono font-bold uppercase tracking-[0.06em] text-[0.6875rem] text-brand mb-2'>{item.n}</div>
								<h3 className='font-mono font-medium text-[1.625rem] leading-[1.1] tracking-[-0.015em] text-foreground'>{item.title}</h3>
								<p className='mt-3.5 text-[0.9375rem] leading-[1.6] text-current/88'>{item.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='py-24 lg:py-32 text-center border-t border-border'>
				<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10'>
					<div className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{loopBlock.kicker}</div>
					<h2 className='font-mono font-medium text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.03em] text-foreground'>{loopBlock.heading}</h2>
					<div className='mt-10'>
						<Loop size={420} labels={loopBlock.labels} blurbs={loopBlock.blurbs} centerLabel={loopBlock.centerLabel} />
					</div>
					<p className='max-w-3xl mx-auto mt-8 text-[1.0625rem] leading-[1.55] text-current/88'>{loopBlock.body}</p>
				</div>
			</section>

			<section className='pt-16 lg:py-24 pb-16 border-t border-border'>
				<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10'>
					<div className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{doSection.kicker}</div>
					<RichText as='h2' className='font-mono font-medium text-[clamp(1.625rem,3.5vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-foreground' text={doSection.heading} />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-7'>
						<p className='text-[0.96875rem] leading-[1.65] text-current/88'>{doSection.col1}</p>
						<RichText as='p' className='text-[0.96875rem] leading-[1.65] text-current/88' text={doSection.col2} />
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};
