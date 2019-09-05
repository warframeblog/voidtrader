const axios = require('axios');
const Octokit = require('@octokit/rest');
const Matter = require('gray-matter');

const OWNER = 'warframeblog';
const REPO = 'warframeblog';
const PATH_TO_POST = 'content/baro-kiteer-void-trader.md';
const BASE64_ENCODING = 'base64';

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
});

const get = async () => {
	try {
		const contents = await octokit.repos.getContents({
			owner: OWNER,
			repo: REPO,
			path: PATH_TO_POST
		});
		return transformToPost(contents.data);
	} catch(err) {
		throw(err);
	}
}

const transformToPost = ({sha, content}) => {
	const contentAsString = Buffer.from(content, BASE64_ENCODING).toString();
	const matter = Matter(contentAsString)
	return {
		sha,
		matter
	};
}

const update = async (post, traderData) => {
	try {
		const updatedMatter = updateMatter(post.matter, traderData);
		const content = Matter.stringify(updatedMatter.content, updatedMatter.data);
		const base64Content = Buffer.from(content).toString(BASE64_ENCODING);
		const result = await octokit.repos.createOrUpdateFile({
			owner: OWNER,
			repo: REPO,
			path: PATH_TO_POST,
			sha: post.sha,
			message: `Updated void trader inventory`,
			content: base64Content
		});
		return result.status === 200 ? true : false;
	} catch (err) {
		throw err;
	}
}

const updateMatter = (matter, traderData) => {
	matter.data.dynamicData = traderData;
	matter.data.date = new Date();

	return matter;
};

module.exports = {
	get, update
}