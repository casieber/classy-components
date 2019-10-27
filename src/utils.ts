/**
 * Interleaves a tagged template placeholders into the template string.
 */
export function templateInterleave( strings: TemplateStringsArray, ...placeholders: string[] ) {
	return strings.map( ( str, i, arr ) =>
		i === arr.length - 1 ?
			str :			// Last element is the closing string, so nothing to append to it
			str + placeholders[i] 	// Otherwise we append one of the placeholders to the string
	).join( '' );
}

/**
 * Merges a classname string into a props object
 */
export function mergeProps<T extends { className?: string }>( props: T, className: string ): T {
	return { ...props, className: `${className || ''} ${props.className || ''}` };
}
