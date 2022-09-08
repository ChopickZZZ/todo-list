export const timestampToDate = (timestamp: number) => {
	const date = new Date();
	date.setTime(timestamp);
	return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
}