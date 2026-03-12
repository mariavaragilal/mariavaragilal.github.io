export const AspectRatio = ({ ratio = 1, className = '', children, style, ...props }) => (
	<div style={{ position: 'relative', paddingBottom: (1 / ratio * 100) + '%', ...style }} className={className} {...props}>
		<div style={{ position: 'absolute', inset: 0 }}>
			{children}
		</div>
	</div>
);
