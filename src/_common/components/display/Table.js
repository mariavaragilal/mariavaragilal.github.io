const WRAPPER = 'relative w-full overflow-auto';
const TABLE = 'w-full caption-bottom text-sm';
const HEADER = '[&_tr]:border-b';
const BODY = '[&_tr:last-child]:border-0';
const FOOTER = 'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0';
const ROW = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';
const HEAD = 'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]';
const CELL = 'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]';
const CAPTION = 'mt-4 text-sm text-muted-foreground';

export const Table = ({ className = '', ...props }) => (
	<div className={WRAPPER}>
		<table className={TABLE + ' ' + className} {...props}/>
	</div>
);

export const TableHeader = ({ className = '', ...props }) => (
	<thead className={HEADER + ' ' + className} {...props}/>
);

export const TableBody = ({ className = '', ...props }) => (
	<tbody className={BODY + ' ' + className} {...props}/>
);

export const TableFooter = ({ className = '', ...props }) => (
	<tfoot className={FOOTER + ' ' + className} {...props}/>
);

export const TableRow = ({ className = '', ...props }) => (
	<tr className={ROW + ' ' + className} {...props}/>
);

export const TableHead = ({ className = '', ...props }) => (
	<th className={HEAD + ' ' + className} {...props}/>
);

export const TableCell = ({ className = '', ...props }) => (
	<td className={CELL + ' ' + className} {...props}/>
);

export const TableCaption = ({ className = '', ...props }) => (
	<caption className={CAPTION + ' ' + className} {...props}/>
);
