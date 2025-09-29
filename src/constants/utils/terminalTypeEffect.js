import React, { useState, useEffect, useRef, useCallback, useMemo, cloneElement, isValidElement, lazy, Suspense } from "react";

const TerminalTypeEffect = ({ children, className = "", animationType = "shuffle", triggerOnLoad = true, triggerOnHover = false, duration, delay = 0, element = "span", rel, ...others }) => {
	// Default props:
	// - className: '' (empty string)
	// - animationType: 'shuffle' (options: shuffle, cursor, futuristic, line)
	// - triggerOnLoad: true (animation starts on mount)
	// - triggerOnHover: false (animation starts on hover, auto-enabled for links)
	// - duration: undefined (no default, must be provided)
	// - delay: 0 (no delay before animation)
	// - element: 'span' (HTML element to render: span, h1, h2, p, etc.)
	// - href, target, rel: for link elements only
	// - children: required, text or JSX to animate
	// - Auto-enable hover animation for link elements (element === 'a' or 'Link')

	// Auto-enable hover animation for link elements
	const isLinkElement = element === "a" || element === "Link";
	const shouldTriggerOnHover = triggerOnHover || isLinkElement;
	const [isAnimating, setIsAnimating] = useState(false);
	const [displayText, setDisplayText] = useState(children || "");
	const [hasMouseLeft, setHasMouseLeft] = useState(true);
	const textRef = useRef(null);
	const animationRef = useRef(null);

	// Helper function to extract text content from JSX
	const extractTextFromJSX = useCallback((element) => {
		if (typeof element === "string") {
			return element;
		}
		if (isValidElement(element)) {
			if (element.type === "br") {
				return "\n";
			}
			if (element.props && element.props.children) {
				if (Array.isArray(element.props.children)) {
					return element.props.children.map((child) => extractTextFromJSX(child)).join("");
				}
				return extractTextFromJSX(element.props.children);
			}
		}
		if (Array.isArray(element)) {
			return element.map((child) => extractTextFromJSX(child)).join("");
		}
		return String(element || "");
	}, []);

	// Helper function to create animated JSX with opacity-based styling
	const createAnimatedJSX = useCallback(
		(originalElement, animatedText, currentIndex = -1, textArray = []) => {
			// Handle string elements
			if (typeof originalElement === "string") {
				if (currentIndex === -1) return animatedText;

				// Create JSX with opacity styling for each character
				return animatedText.split("").map((char, index) => {
					const opacity = index < currentIndex ? "opacity-100" : index === currentIndex ? "opacity-100" : "opacity-0";
					return (
						<span key={index} className={opacity}>
							{char}
						</span>
					);
				});
			}

			// Handle React elements
			if (isValidElement(originalElement)) {
				if (originalElement.type === "br") return originalElement;
				if (originalElement.props && originalElement.props.children) {
					const newProps = {
						...originalElement.props,
						children: createAnimatedJSX(originalElement.props.children, animatedText, currentIndex, textArray),
					};
					return cloneElement(originalElement, newProps);
				}
			}

			// Handle arrays of children
			if (Array.isArray(originalElement)) {
				let textIndex = 0;
				return originalElement.map((child, _childIndex) => {
					if (typeof child === "string") {
						const textLength = child.length;
						const textSlice = animatedText.slice(textIndex, textIndex + textLength);
						textIndex += textLength;

						if (currentIndex === -1) return textSlice;

						// Create JSX with opacity styling for each character
						return textSlice.split("").map((char, charIndex) => {
							const globalIndex = textIndex - textLength + charIndex;
							const opacity = globalIndex < currentIndex ? "opacity-100" : globalIndex === currentIndex ? "opacity-100" : "opacity-0";
							return (
								<span key={globalIndex} className={opacity}>
									{char}
								</span>
							);
						});
					} else if (isValidElement(child) && child.type === "br") {
						return child;
					} else if (isValidElement(child)) {
						const childText = extractTextFromJSX(child);
						const textLength = childText.length;
						const textSlice = animatedText.slice(textIndex, textIndex + textLength);
						textIndex += textLength;
						return createAnimatedJSX(child, textSlice, currentIndex, textArray);
					}
					return child;
				});
			}

			// Handle other cases
			if (typeof originalElement === "string") return animatedText;
			if (isValidElement(originalElement)) return createAnimatedJSX(originalElement, animatedText, currentIndex, textArray);

			return animatedText;
		},
		[extractTextFromJSX]
	);

	// Memoize character sets for better performance
	const characters = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?", []);
	const terminalChars = useMemo(() => "01!@#$%^&*()_+-=[]{}|;:,.<>?", []);
	const similarChars = useMemo(() => "il1|_-.·•", []);

	const getRandomChar = useCallback(
		(type = "shuffle") => {
			switch (type) {
				case "cursor": {
					return similarChars[Math.floor(Math.random() * similarChars.length)];
				}
				case "futuristic": {
					return terminalChars[Math.floor(Math.random() * terminalChars.length)];
				}
				case "line": {
					return Math.random() > 0.5 ? similarChars[Math.floor(Math.random() * similarChars.length)] : characters[Math.floor(Math.random() * characters.length)];
				}
				default: {
					const charSet = Math.random() > 0.7 ? characters : similarChars;
					return charSet[Math.floor(Math.random() * charSet.length)];
				}
			}
		},
		[characters, terminalChars, similarChars]
	);

	const animateText = useCallback(
		(originalChildren, type) => {
			if (!originalChildren) return;

			setIsAnimating(true);
			const textContent = extractTextFromJSX(originalChildren);
			const textArray = textContent.split("");
			let currentIndex = 0;
			let characterFrames = 0;

			const animate = () => {
				if (currentIndex < textArray.length) {
					// Create animated text maintaining original characters for width
					const animatedText = textArray
						.map((char, index) => {
							if (index < currentIndex) return char;
							if (index === currentIndex) return getRandomChar(type);
							return char; // Keep original character for width preservation
						})
						.join("");

					// Create JSX with opacity-based styling
					const animatedJSX = createAnimatedJSX(originalChildren, animatedText, currentIndex, textArray);
					setDisplayText(animatedJSX);

					characterFrames++;
					if (characterFrames >= 12) {
						currentIndex++;
						characterFrames = 0;
					}
				} else {
					// Final reveal - show original text
					setDisplayText(originalChildren);
					setTimeout(() => setIsAnimating(false), 500);
					return;
				}

				animationRef.current = requestAnimationFrame(animate);
			};

			animationRef.current = requestAnimationFrame(animate);
		},
		[createAnimatedJSX, extractTextFromJSX, getRandomChar]
	);

	const handleMouseEnter = () => {
		if (shouldTriggerOnHover) {
			// If mouse has left before, reset and start animation
			if (hasMouseLeft) {
				setDisplayText(children);
				setHasMouseLeft(false);
				setTimeout(() => animateText(children, animationType), 50);
			}
		}
	};

	const handleMouseLeave = () => {
		if (shouldTriggerOnHover) {
			// Mark that mouse has left - this will allow restart on next hover
			setHasMouseLeft(true);
		}
	};

	useEffect(() => {
		setDisplayText(children || "");
	}, [children]);

	useEffect(() => {
		if (triggerOnLoad) {
			const timer = setTimeout(() => {
				animateText(children, animationType);
			}, delay);

			return () => clearTimeout(timer);
		}
	}, [children, animationType, triggerOnLoad, delay, animateText]);

	useEffect(() => {
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	const Element = element;

	return (
		<Element
			ref={textRef}
			rel={rel}
			className={"relative transition-all ease-in-out " + (duration ? "duration-500 " : "duration-500 ") + (isAnimating ? "" : "drop-shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] ") + className}
			style={duration ? { transitionDuration: duration + "ms" } : {}}
			{...(shouldTriggerOnHover && { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave })}
			{...others}>
			{displayText}
		</Element>
	);
};

// Lazy loading wrapper component
const LazyTerminalTypeEffect = ({ children, fallback, ...props }) => {
	const fallbackElement = fallback || children;

	return (
		<Suspense fallback={fallbackElement}>
			<TerminalTypeEffect {...props}>{children}</TerminalTypeEffect>
		</Suspense>
	);
};

export default TerminalTypeEffect;
export { LazyTerminalTypeEffect };
