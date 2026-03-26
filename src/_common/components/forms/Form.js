import React, { createContext, useContext } from 'react';
import { cn } from '../../../constants/utils/cn';

const FormFieldContext = createContext(null);
const useFormField = () => useContext(FormFieldContext);

export const Form = ({ onSubmit, className = '', ...props }) => (
	<form onSubmit={onSubmit} className={className} noValidate {...props}/>
);

export const FormField = ({ name, error, children, ...props }) => (
	<FormFieldContext.Provider value={{ name, error }}>
		<div {...props}>{children}</div>
	</FormFieldContext.Provider>
);

export const FormItem = ({ className = '', ...props }) => (
	<div className={cn('space-y-2', className)} {...props}/>
);

export const FormLabel = ({ className = '', htmlFor, children, ...props }) => {
	const ctx = useFormField();
	const hasError = ctx && ctx.error;
	return (
		<label htmlFor={htmlFor} className={cn('text-sm font-medium leading-none', hasError && 'text-destructive', className)} {...props}>{children}</label>
	);
};

export const FormControl = ({ className = '', children, id, ...props }) => {
	const ctx = useFormField();
	const fieldName = ctx && ctx.name;
	const fieldError = ctx && ctx.error;
	const fieldId = id || fieldName;
	const descId = fieldError ? fieldId + '-error' : undefined;
	return (
		<div className={className} {...props}>
			{React.Children.map(children, child =>
				React.isValidElement(child) ? React.cloneElement(child, {
					id: child.props.id || fieldId,
					'aria-describedby': child.props['aria-describedby'] || descId,
					'aria-invalid': fieldError ? true : undefined,
				}) : child
			)}
		</div>
	);
};

export const FormDescription = ({ className = '', ...props }) => (
	<p className={cn('text-sm text-muted-foreground', className)} {...props}/>
);

export const FormMessage = ({ className = '', children, ...props }) => {
	const ctx = useFormField();
	const fieldName = ctx && ctx.name;
	const fieldError = ctx && ctx.error;
	if (!fieldError && !children) return null;
	return (
		<p
			id={fieldName ? fieldName + '-error' : undefined}
			role='alert'
			className={cn('text-sm font-medium text-destructive', className)}
			{...props}
		>
			{children || fieldError}
		</p>
	);
};
