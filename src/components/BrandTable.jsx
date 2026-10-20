import { formatCount, formatPrice, getMinPrice } from '../lib/format.js';

export default function BrandTable({ goods, selectedKey, onSelect }) {
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
							Аналоги
						</th>
					</tr>
				</thead>
				<tbody>
					{goods.map(item => {
						const key = `${item.brand}|${item.number}`;
						const isSelected = key === selectedKey;

						return (
							<tr
								key={item.goodsID || key}
								className={isSelected ? 'table-active brand-row' : 'brand-row'}
								onClick={() => onSelect(item)}
							>
								<td className='fw-semibold'>{item.brand}</td>
								<td>{item.name}</td>
								<td className='text-nowrap'>{item.number}</td>
								<td className='text-end text-nowrap'>{formatPrice(getMinPrice(item))}</td>
								<td className='text-end text-nowrap'>{formatCount(item.count)}</td>
								<td className='text-end'>
									<button
										type='button'
										className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline-primary'}`}
										onClick={event => {
											event.stopPropagation();
											onSelect(item);
										}}
									>
										Показать
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
