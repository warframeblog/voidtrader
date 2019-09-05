const axios = require('axios');

const PLATFORMS = [
	{id: 'pc', name: 'PC'}, 
	{id: 'ps4', name: 'PS4'}, 
	{id: 'xb1', name: 'XBox One'},
	{id: 'swi', name: 'Nintendo Switch'}
];

module.exports = async () => {
	const promises = PLATFORMS.map(p => axios.get(`${process.env.VOIDTRADER_API_URL}${p.id}/voidTrader`));
	try {
		const result = await Promise.all(promises);
		return result.map((res, i) => {
			const platform = PLATFORMS[i];
			return Object.assign({}, res.data, {platform});
		});
	} catch (err) {
		throw err;
	}
}