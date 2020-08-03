const covi = require('./covi');

/**
 * Fetch a list of blogs.
 * @param {object|null} [query] the query object that will be sent to CouchDB. 
 * There's a default value, see the implementation for details.
 * @returns {Array<object>} the list of the blogs
 */

async function getList(query) {
	query = {
		selector: {
			$and: [
				{ $not: { _id: 'nextBlogId' } },
				{ visibility: true }
			]
		},
		//sort: ['_id'],
		limit: 8192,
		fields: ['_id', 'category', 'createdTime', 'lastUpdatedTime', 'title'],
		...query
	};
	const blogs = (await covi('/blogs/_find', 'POST', query)).docs;
	blogs.sort((a, b) => Number(a._id) - Number(b._id));
	return blogs;
}

/**
 * Fetch a specified blog
 * @param {number|string} id the id of the blog
 * @returns {object|null} the blog fetched if succeed, or null otherwise
 */

async function getBlog(id) {
	return new Promise((resolve, reject) => {
		covi(`/blogs/${id}`)
			.then((blog) => resolve(blog))
			.catch((err) => resolve(null))
	});
}

/**
 * Fetch the categories.
 * @returns {Array<string>} an array contains the categories.
 */

async function getCategories() {
	let categories = [];
	const blogs = await getList();
	for (const blog of blogs) {
		if (!categories.includes(blog.category))
			categories.push(blog.category);
	}
	categories.sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
	return categories;
}

/**
 * Group the blogs by their categories and returns the result
 * @returns {object} an object containing the grouped list of blogs. For each key/value pair:
 * * key: the name of the category
 * * value: an array containing the blogs of the corresponding category
 */

async function getGroupedBlogsList() {
	let groupedBlogs = {};
	const blogs = await getList();
	for (const blog of blogs) {
		if (!groupedBlogs[blog.category])
			groupedBlogs[blog.category] = [];
		groupedBlogs[blog.category].push(blog);
	}
	return groupedBlogs;
}

/**
 * Genereate the timeline
 * @returns {object} the timeline generated. For each key/value pair:
 * * key: the year
 * * value: the object indicating the timeline for the corresponding year. For each key/value pair:
 * * * key: the month
 * * * value: an array containing the list of the blogs of the corresponding year and month
 */

async function timelineGenerator() {
	let timeline = {};
	const blogs = await getList();
	for (const blog of blogs) {
		const createdTime = blog.createdTime;
		const year = createdTime.year;
		const month = createdTime.month;
		if (!timeline[year]) timeline[year] = {};
		if (!timeline[year][month]) timeline[year][month] = [];
		timeline[year][month].push(blog);
	}
	return timeline;
}

/**
 * Update a blog. If it doesn't exist. create it.
 * @param {object} blog the blog to update
 * @returns {object} the updated blog
 */

async function updateBlog(blog) {
	const _blog = blog._id ? await getBlog(blog._id) : null;
	if (!_blog) {
		const nextBlogId = await getBlog('nextBlogId');
		blog._id = nextBlogId.value.toString();
		nextBlogId.value++;
		await covi(`/blogs/nextBlogId?rev=${nextBlogId._rev}`, 'PUT', nextBlogId);
		await covi(`/blogs/${blog._id}`, 'PUT', blog);
	}
	else
		await covi(`/blogs/${blog._id}?rev=${_blog._rev}`, 'PUT', blog);
	return blog;
}

module.exports = { getList, getBlog, updateBlog, getCategories, getGroupedBlogsList, timelineGenerator };