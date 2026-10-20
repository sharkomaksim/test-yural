import { Fragment } from 'react';

import WarehouseTable from '@/components/WarehouseTable.jsx';
import { formatCount, formatPrice, getMinPrice } from '@/lib/format.js';

export default function AnalogueRow({ analogue, isOpen, onToggle }) {
	const hasWarehouses = Boolean(analogue.warehouses?.length);

	return (
		<Fragment>
			<tr>
				<td className='fw-semibold'>{analogue.brand}</td>
				<td>{analogue.name}</td>
				<td className='text-nowrap'>{analogue.number}</td>
				<td className='text-end text-nowrap'>{formatPrice(getMinPrice(analogue))}</td>
				<td className='text-end text-nowrap'>{formatCount(analogue.count)}</td>
				<td className='text-end'>
					{hasWarehouses ? (
						<button
							type='button'
							className={`btn btn-sm ${isOpen ? 'btn-primary' : 'btn-outline-primary'}`}
							aria-expanded={isOpen}
							onClick={onToggle}
						>
							{isOpen ? 'Скрыть' : 'Склады'}
						</button>
					) : (
						<span className='text-secondary'>нет</span>
					)}
				</td>
			</tr>
			{isOpen && (
				<tr>
					<td colSpan={6} className='p-2'>
						<WarehouseTable warehouses={analogue.warehouses} />
					</td>
				</tr>
			)}
		</Fragment>
	);
}
