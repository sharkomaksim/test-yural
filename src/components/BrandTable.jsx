import BrandRow from '@/components/BrandRow.jsx';

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

						return (
							<BrandRow
								key={item.goodsID || key}
								item={item}
								isSelected={key === selectedKey}
								onSelect={onSelect}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
