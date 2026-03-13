import { focusRing } from '../../../constants/utils/a11y';

const HANDLE = 'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 cursor-col-resize data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:cursor-row-resize data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 ' + focusRing;

export const ResizablePanelGroup = ({ direction = 'horizontal', className = '', children, ...props }) => (
	<div
		data-panel-group
		data-panel-group-direction={direction}
		className={(direction === 'vertical' ? 'flex-col ' : '') + 'flex h-full w-full ' + className}
		{...props}
	>
		{children}
	</div>
);

export const ResizablePanel = ({ defaultSize, className = '', style, children, ...props }) => (
	<div
		data-panel
		className={'overflow-hidden ' + className}
		style={{ flex: defaultSize ? defaultSize + ' 1 0' : '1 1 0', ...style }}
		{...props}
	>
		{children}
	</div>
);

export const ResizableHandle = ({ withHandle = false, className = '', ...props }) => (
	<div
		data-panel-resize-handle-id
		role='button'
		aria-label='Resize panel'
		tabIndex={0}
		className={HANDLE + ' ' + className}
		{...props}
	>
		{withHandle && (
			<div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
				<span aria-hidden='true' className='text-[.5rem] leading-none'>⋮</span>
			</div>
		)}
	</div>
);
