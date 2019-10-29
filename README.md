# Classy Components <🎩>

inspired by [styled components](https://www.styled-components.com/)

Classy Components creates React components that have certain CSS classes.

```javascript
import classy from 'classy-components';
import './style.css';

const Red = classy.div`red-bg`

export default () => <Red>I have a red background!</Red>
// => <div class="red-bg">I have a red background!</div>
```

```css
.red-bg {
  background: red;
}
```

## Installation
Use `yarn` or `npm` to include it into your React project.

```
yarn add classy-components
```

## Usage
Using template literals, you can spread a list of classes over many lines.
This comes in useful when you're using some CSS framework like
[Tailwind CSS](https://tailwindcss.com/).

```javascript
const Toolbar = classy.button`
	bg-blue-500
	hover:bg-blue-600
	text-white
	font-bold
	py-2
	px-4
	rounded
`;
```