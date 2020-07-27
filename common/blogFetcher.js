const covi = require('./covi');

async function getList(query) {
	query = {
		selector: {
			$not: { _id: 'nextBlogId' }
		},
		fields: ['_id', 'category', 'createdTime', 'title'],
		...query
	};
	return (await covi('/blogs/_find', 'POST', query)).docs;
}

async function getBlog(id) {
	return new Promise((resolve, reject) => {
		covi('/blogs/' + id)
			.then((blog) => resolve(blog))
			.catch((err) => resolve(null))
	});
}

async function generatePaths(extras) {
	let paths = [];
	const blogs = await getList();
	console.log(blogs);
	for (const blog of blogs)
		if (blog._id != 'nextBlogId') paths.push({ params: { id: blog._id } });
	if (extras instanceof Array)
		for (const extra of extras) paths.push({ params: { id: extra } });
	return { paths, fallback: false };
}

async function updateBlog(blog) {
	const _blog = blog._id ? await getBlog(blog._id) : null;
	if (!_blog) {
		const nextBlogId = await getBlog('nextBlogId');
		blog._id = nextBlogId.value.toString();
		nextBlogId.value++;
		await covi('/blogs/nextBlogId?rev=' + nextBlogId._rev, 'PUT', nextBlogId);
		await covi('/blogs/' + blog._id, 'PUT', blog);
	}
	else
		await covi('/blogs/' + blog._id + '?rev=' + _blog._rev, 'PUT', blog);
	return blog._id;
}

module.exports = { getList, getBlog, generatePaths, updateBlog };