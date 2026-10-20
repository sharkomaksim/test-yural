import { parseBody } from '@/lib/parse.js';

const KNOWN_API_ERRORS = {
	'Empty key!': 'Не указан ключ покупателя. Проверьте переменную VITE_FAVORIT_KEY в файле .env.',
	'Invalid key client!': 'Неверный ключ покупателя: сервис не нашёл такого клиента.',
	'Empty number goods!': 'Не указан артикул.',
	'Request quota exceeded!': 'Превышен лимит запросов к сервису. Попробуйте повторить позже.'
};

const GENERIC_ERROR = 'Не удалось получить данные от сервиса.';

export const UNEXPECTED_RESPONSE = 'Сервис вернул ответ в неизвестном формате.';

/**
 * Единая точка перевода ошибки в текст. Принимает и ошибку RTK Query (сеть, HTTP, парсинг),
 * и строку из `error` в ответе сервиса.
 */
export function describeError(source) {
	if (source == null || source === '') {
		return GENERIC_ERROR;
	}

	if (typeof source === 'string') {
		return describeApiError(source);
	}

	if (source.status === 'FETCH_ERROR') {
		return 'Не удалось связаться с сервисом. Проверьте подключение к сети. Если страница открыта по HTTPS, браузер блокирует запрос к HTTP-сервису.';
	}

	if (source.status === 'PARSING_ERROR') {
		return UNEXPECTED_RESPONSE;
	}

	const body = parseBody(source.data);

	if (body && typeof body === 'object' && body.error) {
		return describeApiError(body.error);
	}

	if (typeof source.status === 'number') {
		return `Сервис недоступен (HTTP ${source.status}). Попробуйте повторить позже.`;
	}

	return GENERIC_ERROR;
}

/**
 * Сервис может вернуть несколько ошибок одной строкой, поэтому ищем известный текст
 * не только полным совпадением, но и вхождением.
 */
function describeApiError(message) {
	const text = String(message ?? '').trim();

	if (!text) {
		return 'Сервис вернул ошибку без описания.';
	}

	if (text === UNEXPECTED_RESPONSE) {
		return text;
	}

	if (KNOWN_API_ERRORS[text]) {
		return KNOWN_API_ERRORS[text];
	}

	const knownKey = Object.keys(KNOWN_API_ERRORS).find(key => text.includes(key));

	if (knownKey) {
		return KNOWN_API_ERRORS[knownKey];
	}

	return `Сервис вернул ошибку: ${text}`;
}
