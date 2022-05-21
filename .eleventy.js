const lodash = require("lodash");
const slugify = require("slugify");
const markdownIt = require("markdown-it");

const utils = require("./src/_data/utils");
const config = require("./src/_data/config.json");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/img");

	eleventyConfig.addNunjucksFilter("head", (arr, len) => arr.slice(0, len));
	eleventyConfig.addNunjucksFilter("selectRandom", (arr, count) => lodash.sampleSize(arr, count));

	eleventyConfig.addCollection("styles", utils.getAllCSS);
	eleventyConfig.addCollection("categories", function (collectionApi) {
		const categories = [];
		const cats = {};

		collectionApi.getFilteredByTag("posts")
			.forEach(post => {
				if (!cats[post.data.category])
					cats[post.data.category] = [];

				cats[post.data.category].push(post);
			});

		Object.keys(cats).forEach(function (title) {
			const catPosts = cats[title];

			const chunks = lodash.chunk(catPosts, config.categoryItemSize);
			const pageSize = chunks.length;
			let pageNumber = 1;

			for (const chunk of chunks) {
				const slugTitle = slugify(title, { lower: true });
				const hasNext = pageNumber < pageSize;
				const hasPrev = pageNumber > 1;
				const slug = pageNumber !== 1 ? `/${pageNumber}` : "";
				const prevUrl = hasPrev ? (pageNumber - 1) === 1 ? "" : `/${pageNumber - 1}` : "#";
				const nextUrl = hasNext ? `/${pageNumber + 1}` : "#";

				categories.push({
					title,
					pageSize,
					pageNumber,
					hasNext,
					hasPrev,
					slug: `/category/${slugTitle}${slug}/`,
					prevUrl: `/category/${slugTitle}${prevUrl}/`,
					nextUrl: `/category/${slugTitle}${nextUrl}/`,
					items: chunk
				});

				pageNumber++;
			}
		});

		return categories;
	});

	eleventyConfig.setLibrary("md", markdownIt({ linkify: true }));

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		pathPrefix: process.env.mode === "dev" ? "/" : "/eleventy-blog/",
		dir: {
			input: "src",
			output: "docs"
		}
	};
}
