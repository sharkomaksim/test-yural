/**
 * Сервис отдаёт JSON с заголовком text/plain, поэтому тело успешного ответа приходит строкой.
 */
export function parseBody(data) {
	if (typeof data !== 'string') {
		return data;
	}

	try {
		return JSON.parse(data);
	} catch {
		return data;
	}
}
