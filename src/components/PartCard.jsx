import { formatCount, formatPrice, getMinPrice } from '@/lib/format.js';

export default function PartCard({ part }) {
	const minPrice = getMinPrice(part);

	return (
		<div className='card mb-4'>
			<div className='card-body'>
				<div className='d-flex flex-wrap align-items-center gap-2 mb-1'>
					<span className='badge text-bg-primary'>{part.brand}</span>
					<span className='text-secondary'>артикул {part.number}</span>
					{part.notRefund && <span className='badge text-bg-warning'>без возврата</span>}
				</div>
				<h2 className='h5 mb-3'>{part.name || 'Без названия'}</h2>
				<div className='d-flex flex-wrap gap-4'>
					<div>
						<div className='text-secondary small'>Цена от</div>
						<div className='fs-5 fw-semibold'>{formatPrice(minPrice)}</div>
					</div>
					<div>
						<div className='text-secondary small'>Остаток на всех складах</div>
						<div className='fs-5 fw-semibold'>{formatCount(part.count)}</div>
					</div>
					<div>
						<div className='text-secondary small'>Предложений</div>
						<div className='fs-5 fw-semibold'>{formatCount(part.warehouses?.length)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
