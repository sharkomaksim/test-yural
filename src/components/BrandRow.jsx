import { formatCount, formatPrice, getMinPrice } from '@/lib/format.js';

export default function BrandRow({ item, isSelected, onSelect }) {
	return (
		<tr
			className={isSelected ? 'table-active brand-row' : 'brand-row'}
			tabIndex={0}
			onClick={() => onSelect(item)}
			onKeyDown={event => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					onSelect(item);
				}
			}}
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
}
