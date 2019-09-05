const axios = require('axios');

const PLATFORMS = ['PC'];

module.exports = async () => {
	const promises = PLATFORMS.map(p => axios.get(`${process.env.VOIDTRADER_API_URL}${p}/voidTrader`));
	try {
		const result = await Promise.all(promises);
		return result.map((res, i) => {
			return {[PLATFORMS[i]]: res.data};
		});
	} catch (err) {
		throw err;
	}
}