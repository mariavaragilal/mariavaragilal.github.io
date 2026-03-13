import { useMemo, createContext, useContext } from 'react';

const ChartContext = createContext({ config: {} });

export const useChart = () => useContext(ChartContext);

export const ChartContainer = ({ config = {}, className = '', children, ...props }) => {
	const style = useMemo(() => {
		const vars = {};
		Object.entries(config).forEach(([key, val]) => {
			if (val.color) vars['--color-' + key] = val.color;
		});
		return vars;
	}, [config]);

	return (
		<ChartContext.Provider value={{ config }}>
			<div data-chart className={'flex aspect-video justify-center text-xs ' + className} style={style} {...props}>
				{children}
			</div>
		</ChartContext.Provider>
	);
};

export const ChartTooltip = ({ active, payload, content }) => {
	if (!active || !payload) return null;
	if (content) return content({ active, payload });
	return null;
};

export const ChartTooltipContent = ({ active, payload, label, className = '', indicator = 'dot', hideLabel = false, hideIndicator = false, nameKey }) => {
	const { config } = useContext(ChartContext);
	if (!active || !payload || !payload.length) return null;
	return (
		<div className={'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl ' + className}>
			{!hideLabel && label && <div className='font-medium'>{label}</div>}
			<div className='grid gap-1.5'>
				{payload.map((item, i) => {
					const key = nameKey || item.name || item.dataKey;
					const cfgItem = config[key] || {};
					const indicatorStyle = { background: cfgItem.color || item.color || item.fill };
					return (
						<div key={i} className='flex w-full flex-wrap items-stretch gap-2'>
							{!hideIndicator && (
								<div
									className={'shrink-0 rounded-[2px] ' + (indicator === 'dot' ? 'h-2.5 w-2.5 translate-y-[2px]' : indicator === 'line' ? 'w-1' : 'w-2.5 rounded-[2px]')}
									style={indicatorStyle}
								/>
							)}
							<div className='flex flex-1 justify-between leading-none'>
								<span className='text-muted-foreground'>{cfgItem.label || item.name}</span>
								<span className='font-mono tabular-nums'>{item.value}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const ChartLegendContent = ({ payload, className = '', ...props }) => {
	const { config } = useContext(ChartContext);
	if (!payload || !payload.length) return null;
	return (
		<div className={'flex flex-wrap items-center gap-4 ' + className} {...props}>
			{payload.map((item, i) => {
				const cfgItem = config[item.dataKey || item.value] || {};
				return (
					<div key={i} className='flex items-center gap-1.5'>
						<div className='h-2 w-2 shrink-0 rounded-[2px]' style={{ background: cfgItem.color || item.color }} />
						<span className='text-muted-foreground'>{cfgItem.label || item.value}</span>
					</div>
				);
			})}
		</div>
	);
};

export const ChartLegend = ChartLegendContent;
