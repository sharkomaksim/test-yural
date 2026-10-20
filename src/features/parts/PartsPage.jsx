import { useSelector } from 'react-redux';

import ErrorAlert from '@/components/ErrorAlert.jsx';
import AnaloguesSection from '@/features/parts/AnaloguesSection.jsx';
import BrandsSection from '@/features/parts/BrandsSection.jsx';
import { API_KEY } from '@/features/parts/partsApi.js';
import { selectSelectedPart } from '@/features/parts/partsSlice.js';

export default function PartsPage() {
	const selectedPart = useSelector(selectSelectedPart);

	return (
		<>
			{!API_KEY && (
				<ErrorAlert message='Не задан ключ VITE_FAVORIT_KEY. Создайте файл .env по образцу .env.example и перезапустите dev-сервер.' />
			)}

			<section className='mb-4'>
				<BrandsSection />
			</section>

			{selectedPart && <AnaloguesSection part={selectedPart} />}
		</>
	);
}
