import { parseBody } from '../features/parts/normalize.js';

const KNOWN_API_ERRORS = {
	'Empty key!': 'Не указан ключ покупателя. Проверьте переменную VITE_FAVORIT_KEY в файле .env.',
	'Invalid key client!': 'Неверный ключ покупателя: сервис не нашёл такого клиента.',
	'Empty number goods!': 'Не указан номер детали.',
	'Request quota exceeded!': 'Превышен лимит запросов к сервису. Попробуйте повторить позже.'
};

/**
 * Сервис может вернуть несколько ошибок одной строкой, поэтому ищем известный текст
 * не только полным совпадением, но и вхождением.
 */
export function mapApiError(message) {
	const text = String(message ?? '').trim();

	if (!text) {
		return 'Сервис вернул ошибку без описания.';
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

/**
 * Превращает ошибку RTK Query (сеть, HTTP, сбой парсинга) в понятный текст.
 * Тело ошибочного ответа приходит как text/plain, но содержит JSON — парсим его сами.
 */
export function describeQueryError(error) {
	if (!error) {
		return 'Не удалось получить данные от сервиса.';
	}

	if (error.status === 'FETCH_ERROR') {
		return 'Не удалось связаться с сервисом. Проверьте подключение к сети и повторите попытку.';
	}

	if (error.status === 'PARSING_ERROR') {
		return 'Сервис вернул ответ в неизвестном формате.';
	}

	const body = parseBody(error.data);

	if (body && typeof body === 'object' && body.error) {
		return mapApiError(body.error);
	}

	if (typeof error.status === 'number') {
		return `Сервис недоступен (HTTP ${error.status}). Попробуйте повторить позже.`;
	}

	return 'Не удалось получить данные от сервиса.';
}
