'use strict';

const getTraderData = require('./lib/trader-data');
const Post = require('./lib/post');

module.exports.update = async (event) => {
	try {
		const traderData = await getTraderData();
		// console.log(traderData);
		const post = await Post.get();

		await Post.update(post, traderData);
	} catch (err) {
		throw err;
	}
};
