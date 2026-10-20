import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BrandTable from '@/components/BrandTable.jsx';
import EmptyState from '@/components/EmptyState.jsx';
import ErrorAlert from '@/components/ErrorAlert.jsx';
import Loader from '@/components/Loader.jsx';
import SearchForm from '@/components/SearchForm.jsx';
import { describeError } from '@/constants/errors.js';
import { API_KEY, useGetBrandsQuery } from '@/features/parts/partsApi.js';
import {
	choosePart,
	selectInput,
	selectQuery,
	selectSelectedPart,
	setInput,
	setQuery
} from '@/features/parts/partsSlice.js';
import { useDebouncedValue } from '@/hooks/useDebouncedValue.js';

export default function BrandsSection() {
	const dispatch = useDispatch();
	const input = useSelector(selectInput);
	const query = useSelector(selectQuery);
	const selectedPart = useSelector(selectSelectedPart);
	const trimmedInput = useDebouncedValue(input, 500).trim();

	useEffect(() => {
		dispatch(setQuery(trimmedInput));
	}, [trimmedInput, dispatch]);

	const { data, error, isError, isFetching, refetch } = useGetBrandsQuery(
		API_KEY && query.length >= 2 ? query : skipToken
	);

	const submit = () => {
		const nextQuery = input.trim();

		if (nextQuery !== query) {
			dispatch(setQuery(nextQuery));
		} else if (API_KEY && query.length >= 2) {
			refetch();
		}
	};

	let result = <p className='text-secondary mb-0'>Введите минимум 2 символа артикула.</p>;

	if (query.length >= 2) {
		if (isFetching) {
			result = <Loader label='Ищем производителей…' />;
		} else if (isError) {
			result = <ErrorAlert message={describeError(error)} onRetry={refetch} />;
		} else if (data?.status === 'error') {
			result = <ErrorAlert message={describeError(data.error)} onRetry={refetch} />;
		} else if (data?.status === 'empty') {
			result = <EmptyState>По артикулу «{query}» ничего не найдено. Проверьте артикул.</EmptyState>;
		} else if (data?.status === 'ok') {
			result = (
				<>
					<p className='text-secondary small mb-2'>Найдено деталей: {data.goods.length}</p>
					<BrandTable
						goods={data.goods}
						selectedKey={selectedPart ? `${selectedPart.brand}|${selectedPart.number}` : ''}
						onSelect={item => dispatch(choosePart(item))}
					/>
				</>
			);
		} else {
			result = null;
		}
	}

	return (
		<>
			<SearchForm value={input} onChange={value => dispatch(setInput(value))} onSubmit={submit} />
			{result}
		</>
	);
}
