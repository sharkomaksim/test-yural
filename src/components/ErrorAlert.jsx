export default function ErrorAlert({ message, onRetry }) {
	return (
		<div
			className='alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3'
			role='alert'
		>
			<span className='me-3'>{message}</span>
			{onRetry && (
				<button type='button' className='btn btn-sm btn-outline-danger' onClick={onRetry}>
					Повторить
				</button>
			)}
		</div>
	);
}
