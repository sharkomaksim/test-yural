import { useState } from 'react';

import AnalogueRow from '@/components/AnalogueRow.jsx';

function getKey(analogue) {
	return analogue.goodsID || `${analogue.brand}|${analogue.number}`;
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
						const key = getKey(analogue);

						return (
							<AnalogueRow
								key={key}
								analogue={analogue}
								isOpen={expanded.has(key)}
								onToggle={() => toggle(key)}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
