const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
];
export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return {
		day: date.getDate(),
		month: months[date.getMonth()],
		year: date.getFullYear()
	};
};
