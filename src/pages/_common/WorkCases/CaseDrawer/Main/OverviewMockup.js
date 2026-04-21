import { useState } from 'react';
import { Media, MediaUrlLink, Switch } from '../../../../../_common/components';
import { useTheme } from '../../../../../hooks/useTheme';

const CAPTION_CLASS = 'mt-2 text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono';
const LABEL_CLASS = 'mt-2 text-editorial-eyebrow-sm text-current/66 tracking-[0.1em] max-w-full select-text';

export const OverviewMockup = ({ image, imageMap, fallback, labels = {} }) => {
	const { resolvedTheme } = useTheme();
	const [override, setOverride] = useState(null);

	const resolved = image || fallback;
	const hasToggle = !!(image && image.src && image.srcDark);
	const mode = override ?? (resolvedTheme === 'dark' ? 'dark' : 'light');

	if (!hasToggle) {
		if (!resolved || !resolved.src) return null;
		return <Media image={resolved} imageMap={imageMap} variant='annotated' className='my-0' opensNewTabLabel={labels.opensNewTab} />;
	}

	const activeSrc = mode === 'dark' ? image.srcDark : image.src;
	const mediaImage = { ...image, src: activeSrc, caption: undefined, label: undefined };

	const captionText = image.caption || image.label;
	const captionClassName = image.caption ? CAPTION_CLASS : LABEL_CLASS;
	const switchLabel = labels.themePreview || 'Preview theme';
	const stateLabel = mode === 'dark' ? (labels.darkMode || 'Dark mode') : (labels.lightMode || 'Light mode');

	return (
		<div className='my-0'>
			<Media image={mediaImage} imageMap={imageMap} variant='annotated' className='my-0' hideUrlLink={true} />
			<div className='flex items-start justify-between gap-4'>
				<div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0'>
					{captionText ? <p className={captionClassName}>{captionText}</p> : null}
					{image.url ? <MediaUrlLink url={image.url} opensNewTabLabel={labels.opensNewTab} /> : null}
					{!captionText && !image.url ? <span aria-hidden='true' /> : null}
				</div>
				<div className='shrink-0 mt-2 flex items-center gap-2'>
					<span className='text-xs text-current/66 tracking-[0.02em] font-mono' aria-hidden='true'>{stateLabel}</span>
					<Switch
						checked={mode === 'dark'}
						onCheckedChange={(next) => setOverride(next ? 'dark' : 'light')}
						aria-label={switchLabel}
					/>
				</div>
			</div>
		</div>
	);
};
