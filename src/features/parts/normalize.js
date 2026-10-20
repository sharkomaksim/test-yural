import { UNEXPECTED_RESPONSE } from '@/constants/errors.js';

/**
 * Нулевой UUID — так сервис помечает пустую структуру ответа (подтверждено на живом API).
 * Проверки brand/number обычно достаточно; UUID страхует от частично заполненной структуры.
 */
export const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000';

export function isEmptyGoods(item) {
	return !item || !item.brand || !item.number || item.goodsID === EMPTY_GOODS_ID;
}

/**
 * Приводит ответ поиска по артикулу к одному из трёх состояний:
 * ok — есть детали, empty — сервис не нашёл ничего, error — сервис вернул ошибку.
 */
export function normalizeGoodsList(raw) {
	if (raw && typeof raw === 'object' && raw.error) {
		return { status: 'error', error: String(raw.error) };
	}

	if (!Array.isArray(raw?.goods)) {
		return { status: 'error', error: UNEXPECTED_RESPONSE };
	}

	const goods = raw.goods.filter(item => !isEmptyGoods(item));

	if (goods.length === 0) {
		return { status: 'empty' };
	}

	return { status: 'ok', goods };
}

/**
 * Ответ поиска аналогов: сама деталь лежит в goods[0], аналоги — в goods[0].analogues.
 * Если деталь не найдена, сервис отдаёт один структурно пустой элемент.
 */
export function normalizeAnalogues(raw) {
	if (raw && typeof raw === 'object' && raw.error) {
		return { status: 'error', error: String(raw.error) };
	}

	if (!Array.isArray(raw?.goods)) {
		return { status: 'error', error: UNEXPECTED_RESPONSE };
	}

	const [first] = raw.goods;

	if (isEmptyGoods(first)) {
		return { status: 'empty' };
	}

	const { analogues = [], ...part } = first;

	return {
		status: 'ok',
		part,
		analogues: Array.isArray(analogues) ? analogues.filter(item => !isEmptyGoods(item)) : []
	};
}
