import { useDispatch, useSelector } from 'react-redux';

import { selectTheme, toggleTheme } from '@/app/themeSlice.js';

function SunIcon() {
	return (
		<svg className='theme-icon' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
			<circle cx='8' cy='8' r='3.1' fill='currentColor' />
			<g stroke='currentColor' strokeWidth='1.4' strokeLinecap='round'>
				<path d='M8 1.2v1.8M8 13v1.8M1.2 8h1.8M13 8h1.8' />
				<path d='m3.2 3.2 1.3 1.3M11.5 11.5l1.3 1.3M12.8 3.2l-1.3 1.3M4.5 11.5l-1.3 1.3' />
			</g>
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg className='theme-icon' viewBox='0 0 16 16' aria-hidden='true'>
			<path fill='currentColor' d='M13.6 9.7A6 6 0 0 1 6.3 2.4 6 6 0 1 0 13.6 9.7Z' />
		</svg>
	);
}

export default function ThemeToggle() {
	const dispatch = useDispatch();
	const isDark = useSelector(selectTheme) === 'dark';

	return (
		<button
			type='button'
			className='btn btn-outline-primary btn-sm theme-toggle'
			aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
			onClick={() => dispatch(toggleTheme())}
		>
			{isDark ? <MoonIcon /> : <SunIcon />}
		</button>
	);
}
