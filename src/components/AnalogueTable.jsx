import { Fragment, useState } from 'react';

import { formatCount, formatPrice, formatShipmentDate, getMinPrice } from '../lib/format.js';

function WarehouseList({ warehouses }) {
	if (!warehouses || warehouses.length === 0) {
		return <div className='text-secondary small'>Предложений по складам нет.</div>;
	}

	return (
		<div className='table-responsive bg-body-tertiary rounded'>
			<table className='table table-sm align-middle mb-0'>
				<thead>
					<tr>
						<th scope='col'>Склад</th>
						<th scope='col' className='text-end'>
							Цена
						</th>
						<th scope='col' className='text-end'>
							Остаток
						</th>
						<th scope='col'>Отгрузка</th>
						<th scope='col'>Возврат</th>
					</tr>
				</thead>
				<tbody>
					{warehouses.map(warehouse => (
						<tr key={`${warehouse.id}|${warehouse.shipmentDate}|${warehouse.price}`}>
							<td>{warehouse.code || warehouse.id}</td>
							<td className='text-end text-nowrap'>{formatPrice(warehouse.price)}</td>
							<td className='text-end text-nowrap'>{formatCount(warehouse.stock)}</td>
							<td className='text-nowrap'>{formatShipmentDate(warehouse.shipmentDate)}</td>
							<td>
								{warehouse.notRefund ? (
									<span className='badge text-bg-warning'>без возврата</span>
								) : (
									<span className='text-secondary'>да</span>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function AnalogueTable({ analogues }) {
	const [expanded, setExpanded] = useState(() => new Set());

	const toggle = key => {
		setExpanded(current => {
			const next = new Set(current);

			if (next.has(key)) {
				next.delete(key);
			} else {
				next.add(key);
			}

			return next;
		});
	};

	if (analogues.length === 0) {
		return <div className='alert alert-secondary mb-0'>Аналогов для этой детали сервис не вернул.</div>;
	}

	return (
		<div className='table-responsive'>
			<table className='table table-hover align-middle mb-0'>
				<thead>
					<tr>
						<th scope='col'>Производитель</th>
						<th scope='col'>Название</th>
						<th scope='col'>Артикул</th>
						<th scope='col' className='text-end'>
							Цена от
						</th>
						<th scope='col' className='text-end'>
							Остаток
						</th>
						<th scope='col' className='text-end'>
							Склады
						</th>
					</tr>
				</thead>
				<tbody>
					{analogues.map(analogue => {
						const key = analogue.goodsID || `${analogue.brand}|${analogue.number}`;
						const isOpen = expanded.has(key);

						return (
							<Fragment key={key}>
								<tr>
									<td className='fw-semibold'>{analogue.brand}</td>
									<td>{analogue.name}</td>
									<td className='text-nowrap'>{analogue.number}</td>
									<td className='text-end text-nowrap'>{formatPrice(getMinPrice(analogue))}</td>
									<td className='text-end text-nowrap'>{formatCount(analogue.count)}</td>
									<td className='text-end'>
										<button
											type='button'
											className={`btn btn-sm ${isOpen ? 'btn-primary' : 'btn-outline-primary'}`}
											aria-expanded={isOpen}
											onClick={() => toggle(key)}
										>
											{isOpen ? 'Скрыть' : 'Склады'}
										</button>
									</td>
								</tr>
								{isOpen && (
									<tr key={`${key}-warehouses`}>
										<td colSpan={6} className='p-2'>
											<WarehouseList warehouses={analogue.warehouses} />
										</td>
									</tr>
								)}
							</Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
