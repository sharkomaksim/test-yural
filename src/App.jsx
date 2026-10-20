import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectTheme } from '@/app/themeSlice.js';
import ThemeToggle from '@/components/ThemeToggle.jsx';
import PartsPage from '@/features/parts/PartsPage.jsx';

export default function App() {
	const theme = useSelector(selectTheme);

	useEffect(() => {
		document.documentElement.dataset.bsTheme = theme;

		try {
			localStorage.setItem('theme', theme);
		} catch {
			// Приватный режим может запрещать запись — тема просто не запомнится.
		}
	}, [theme]);

	return (
		<div className='container py-4'>
			<header className='d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4'>
				<div>
					<h1 className='h3 mb-1'>Подбор автозапчастей</h1>
					<p className='text-secondary mb-0'>
						Поиск производителей по артикулу и подбор аналогов через сервис «Проценка».
					</p>
				</div>
				<ThemeToggle />
			</header>
			<PartsPage />
		</div>
	);
}
