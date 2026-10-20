import PartsPage from './features/parts/PartsPage.jsx';

export default function App() {
	return (
		<div className='container py-4'>
			<header className='mb-4'>
				<h1 className='h3 mb-1'>Подбор автозапчастей</h1>
				<p className='text-secondary mb-0'>
					Поиск производителей по артикулу и подбор аналогов через сервис «Проценка».
				</p>
			</header>
			<PartsPage />
		</div>
	);
}
