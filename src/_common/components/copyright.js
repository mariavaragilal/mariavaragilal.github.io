import React from "react";

const Copyright = () => {
	return (
		<div className="flex align-center justify-start">
			<p className="text-xs text-slate-600 dark:text-slate-300 my-auto">© {new Date().getFullYear()} Maria Varagilal. All rights reserved.</p>
		</div>
	);
};

export default Copyright;
