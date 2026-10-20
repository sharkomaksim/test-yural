import { skipToken } from '@reduxjs/toolkit/query';

import AnalogueTable from '@/components/AnalogueTable.jsx';
import EmptyState from '@/components/EmptyState.jsx';
import ErrorAlert from '@/components/ErrorAlert.jsx';
import Loader from '@/components/Loader.jsx';
import PartCard from '@/components/PartCard.jsx';
import WarehouseTable from '@/components/WarehouseTable.jsx';
import { describeError } from '@/constants/errors.js';
import { API_KEY, useGetAnaloguesQuery } from '@/features/parts/partsApi.js';

export default function AnaloguesSection({ part }) {
	const { data, error, isError, isFetching, refetch } = useGetAnaloguesQuery(
		API_KEY ? { number: part.number, brand: part.brand } : skipToken
	);

	const displayedPart = data?.status === 'ok' ? data.part : part;

	let analoguesView = null;

	if (isFetching) {
		analoguesView = <Loader label='Ищем аналоги…' />;
	} else if (isError) {
		analoguesView = <ErrorAlert message={describeError(error)} onRetry={refetch} />;
	} else if (data?.status === 'error') {
		analoguesView = <ErrorAlert message={describeError(data.error)} onRetry={refetch} />;
	} else if (data?.status === 'empty') {
		analoguesView = <EmptyState>Сервис не нашёл эту деталь. Попробуйте выбрать другого производителя.</EmptyState>;
	} else if (data?.status === 'ok') {
		analoguesView = <AnalogueTable analogues={data.analogues} />;
	}

	return (
		<section>
			<h2 className='h5 mb-3'>Аналоги и предложения</h2>
			<PartCard part={displayedPart} />

			<div className='mb-4'>
				<h3 className='h6 text-secondary mb-2'>Предложения по складам</h3>
				<WarehouseTable warehouses={displayedPart.warehouses} />
			</div>

			{analoguesView}
		</section>
	);
}
