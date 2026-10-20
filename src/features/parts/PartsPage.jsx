import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AnalogueTable from '../../components/AnalogueTable.jsx';
import BrandTable from '../../components/BrandTable.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import ErrorAlert from '../../components/ErrorAlert.jsx';
import Loader from '../../components/Loader.jsx';
import PartCard from '../../components/PartCard.jsx';
import SearchForm from '../../components/SearchForm.jsx';
import { describeQueryError, mapApiError } from '../../constants/errors.js';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.js';
import { API_KEY, useGetAnaloguesQuery, useGetBrandsQuery } from './partsApi.js';
import { selectInput, selectPart, selectQuery, selectSelectedPart, setInput, setQuery } from './partsSlice.js';

export default function PartsPage() {
	const dispatch = useDispatch();
	const input = useSelector(selectInput);
	const query = useSelector(selectQuery);
	const selectedPart = useSelector(selectSelectedPart);
	const debouncedInput = useDebouncedValue(input, 500);
	const trimmedInput = debouncedInput.trim();

	useEffect(() => {
		dispatch(setQuery(trimmedInput));
	}, [trimmedInput, dispatch]);

	const brandsQuery = useGetBrandsQuery(query.length >= 2 ? query : skipToken);
	const analoguesQuery = useGetAnaloguesQuery(
		selectedPart ? { number: selectedPart.number, brand: selectedPart.brand } : skipToken
	);

	const brands = brandsQuery.data;
	const analogues = analoguesQuery.data;
	const displayedPart = analogues?.status === 'ok' ? analogues.part : selectedPart;

	return (
		<>
			{!API_KEY && (
				<ErrorAlert message='Не задан ключ VITE_FAVORIT_KEY. Создайте файл .env по образцу .env.example и перезапустите dev-сервер.' />
			)}

			<section className='mb-4'>
				<SearchForm
					value={input}
					onChange={value => dispatch(setInput(value))}
					onSubmit={() => dispatch(setQuery(input.trim()))}
				/>

				{query.length < 2 ? (
					<p className='text-secondary mb-0'>Введите минимум 2 символа артикула.</p>
				) : brandsQuery.isFetching ? (
					<Loader label='Ищем производителей…' />
				) : brandsQuery.isError ? (
					<ErrorAlert message={describeQueryError(brandsQuery.error)} onRetry={brandsQuery.refetch} />
				) : brands?.status === 'error' ? (
					<ErrorAlert message={mapApiError(brands.error)} onRetry={brandsQuery.refetch} />
				) : brands?.status === 'empty' ? (
					<EmptyState>По артикулу «{query}» ничего не найдено. Проверьте номер детали.</EmptyState>
				) : brands?.status === 'ok' ? (
					<>
						<p className='text-secondary small mb-2'>Найдено производителей: {brands.goods.length}</p>
						<BrandTable
							goods={brands.goods}
							selectedKey={selectedPart ? `${selectedPart.brand}|${selectedPart.number}` : ''}
							onSelect={item => dispatch(selectPart(item))}
						/>
					</>
				) : null}
			</section>

			{selectedPart && (
				<section>
					<h2 className='h5 mb-3'>Аналоги и предложения</h2>
					<PartCard part={displayedPart} />

					{analoguesQuery.isFetching ? (
						<Loader label='Ищем аналоги…' />
					) : analoguesQuery.isError ? (
						<ErrorAlert
							message={describeQueryError(analoguesQuery.error)}
							onRetry={analoguesQuery.refetch}
						/>
					) : analogues?.status === 'error' ? (
						<ErrorAlert message={mapApiError(analogues.error)} onRetry={analoguesQuery.refetch} />
					) : analogues?.status === 'empty' ? (
						<EmptyState>Сервис не нашёл эту деталь. Попробуйте выбрать другого производителя.</EmptyState>
					) : analogues?.status === 'ok' ? (
						<AnalogueTable analogues={analogues.analogues} />
					) : null}
				</section>
			)}
		</>
	);
}
