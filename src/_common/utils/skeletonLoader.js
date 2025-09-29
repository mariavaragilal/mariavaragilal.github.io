import React from "react";

const SkeletonLoader = ({ type = "text", width = "100%", height = "1rem", className = "", lines = 1, ...props }) => {
	let skeletonClasses = "animate-pulse bg-slate-200 dark:bg-slate-700 rounded";
	if (type === "text") skeletonClasses += " h-4";
	else if (type === "title") skeletonClasses += " h-8";
	else if (type === "avatar") skeletonClasses += " rounded-full";
	else if (type === "card") skeletonClasses += " h-48";
	else if (type === "button") skeletonClasses += " h-10";
	else if (type === "image") skeletonClasses += " h-32";

	return type === "text" && lines > 1 ? (
		<div className={className} {...props}>
			{Array.from({ length: lines }).map((_, index) => (
				<div key={index} className={skeletonClasses + " mb-2 " + (index === lines - 1 ? "w-3/4" : "w-full")} style={{ width: index === lines - 1 ? "75%" : width }} />
			))}
		</div>
	) : (
		<div className={skeletonClasses + " " + className} style={{ width, height }} {...props} />
	);
};

export default SkeletonLoader;
