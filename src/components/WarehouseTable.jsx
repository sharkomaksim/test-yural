import { formatCount, formatPrice, formatShipmentDate } from '@/lib/format.js';

export default function WarehouseTable({ warehouses }) {
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
					{warehouses.map((warehouse, index) => (
						<tr key={`${warehouse.id}|${warehouse.shipmentDate}|${warehouse.price}|${index}`}>
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
