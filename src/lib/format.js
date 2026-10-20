const priceFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
	maximumFractionDigits: 2
});

const countFormatter = new Intl.NumberFormat('ru-RU');

export function formatPrice(value) {
	return typeof value === 'number' && value > 0 ? priceFormatter.format(value) : '—';
}

export function formatCount(value) {
	return countFormatter.format(Number(value) || 0);
}

/**
 * shipmentDate — дата отгрузки и время, до которого нужно оформить заказ.
 */
export function formatShipmentDate(value) {
	if (!value) {
		return '—';
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return '—';
	}

	const day = date.toLocaleDateString('ru-RU');
	const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

	return `${day}, заказ до ${time}`;
}

/**
 * Цена по документации берётся только со склада: goods.price устарел.
 */
export function getMinPrice(item) {
	const prices = (item?.warehouses ?? []).map(warehouse => warehouse.price).filter(price => Number(price) > 0);

	return prices.length > 0 ? Math.min(...prices) : null;
}
