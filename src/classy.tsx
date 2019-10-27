import React from 'react';
import domElements from './domElements';
import { mergeProps, templateInterleave } from './utils';

type BaseTag = typeof domElements[number];
type PropForTag<TTag extends BaseTag> = JSX.IntrinsicElements[TTag];
type ComponentForTag<TTag extends BaseTag> = ( props: PropForTag<TTag> ) => React.ReactElement<PropForTag<TTag>>;
type ClassyComponent<TTag extends BaseTag> = ( strings: TemplateStringsArray, ...placeholders: string[] ) => ComponentForTag<TTag>;

type Classy = { [T in BaseTag]: ClassyComponent<T> };

function makeTemplateForComponent<T extends BaseTag>( tag: T ): ClassyComponent<T> {
	return ( strings: TemplateStringsArray, ...placeholders: string[] ): ComponentForTag<T> => {
		const tailwindClass = templateInterleave( strings, ...placeholders );

		return ( props: JSX.IntrinsicElements[T] ) => React.createElement( tag, mergeProps( props, tailwindClass ), props.children );
	};
}

function makeClassy(): Classy {
	const intermediate: any = {};

	domElements.forEach( <T extends BaseTag>( tag: T ) => intermediate[tag] = makeTemplateForComponent( tag ) );

	return intermediate as Classy;
}

const classy = makeClassy();

export default classy;
