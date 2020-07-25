import React from 'react';
import domElements from './domElements';
import { mergeProps, templateInterleave } from './utils';

type BaseTag = typeof domElements[number];
type PropForTag<TTag extends BaseTag> = JSX.IntrinsicElements[TTag];
type ComponentForTag<TTag extends BaseTag> = ( props: PropForTag<TTag> ) => React.ReactElement<PropForTag<TTag>>;
type ClassyBaseComponent<TTag extends BaseTag> = ClassyComponent<PropForTag<TTag>>;

type ClassyComponent<TProps> = ( strings: TemplateStringsArray, ...placeholders: string[] ) => React.ComponentType<TProps>;

type ExpectedProps = { className?: string; children?: React.ReactNode; };
type ClassyFn = <TProps extends ExpectedProps>( component: React.ComponentType<TProps> ) => ClassyComponent<TProps>;

type Classy = {	[T in BaseTag]: ClassyBaseComponent<T> } & ClassyFn;

function makeTemplateForComponent<T extends BaseTag>( tag: T ): ClassyBaseComponent<T> {
	return ( strings: TemplateStringsArray, ...placeholders: string[] ): ComponentForTag<T> => {
		const tailwindClass = templateInterleave( strings, ...placeholders );

		return ( props: JSX.IntrinsicElements[T] ) => React.createElement( tag, mergeProps( props, tailwindClass ), props.children );
	};
}

function makeClassy(): Classy {
	const intermediate: any = {};

	domElements.forEach( <T extends BaseTag>( tag: T ) => intermediate[tag] = makeTemplateForComponent( tag ) );

	const classyFn =  <TProps extends ExpectedProps>( component: React.ComponentType<TProps> ) => {
		return ( strings: TemplateStringsArray, ...placeholders: string[] ) => {
			const tailwindClass = templateInterleave( strings, ...placeholders );

			return ( props: TProps ) => React.createElement( component, mergeProps( props, tailwindClass ), props.children );
		}
	};

	return Object.assign(
		classyFn,
		intermediate,
	) as Classy;
}

const classy = makeClassy();

export default classy;
