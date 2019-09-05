const axios = require('axios');
const Octokit = require('@octokit/rest');
const Matter = require('gray-matter');

const PATH_TO_POST = 'content/baro-kiteer-void-trader.md';

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
});

const get = async () => {
	try {
		const contents = await octokit.repos.getContents({
			owner: 'warframeblog',
			repo: 'warframeblog',
			path: PATH_TO_POST
		});
		return transformToPost(contents.data);
	} catch(err) {
		throw(err);
	}
}

const transformToPost = ({sha, content}) => {
	const contentAsString = Buffer.from(content, 'base64').toString();
	const matter = Matter(contentAsString)
	return {
		sha,
		matter
	};
}

const update = async () => {

}

module.exports = {
	get, update
}