export default function SearchForm({ value, onChange, onSubmit }) {
	return (
		<form
			className='mb-4'
			onSubmit={event => {
				event.preventDefault();
				onSubmit();
			}}
		>
			<label className='form-label' htmlFor='part-number'>
				Артикул детали
			</label>
			<div className='input-group'>
				<input
					id='part-number'
					type='text'
					className='form-control'
					placeholder='Например, 0189'
					autoComplete='off'
					value={value}
					onChange={event => onChange(event.target.value)}
				/>
				<button type='submit' className='btn btn-primary' disabled={value.trim().length < 2}>
					Найти
				</button>
			</div>
			<div className='form-text'>Поиск запускается автоматически после паузы в 500 мс, Enter — сразу.</div>
		</form>
	);
}
