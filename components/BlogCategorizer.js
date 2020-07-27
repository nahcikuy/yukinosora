import { Menu } from 'antd'
const covi = require('../common/covi');

export default class BlogCategorizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { blogs: [] };
		covi('/blogs/_find', 'POST', {
			selector: { _id: { "$gte": 0 } },
			fields: ['_id', 'category', 'createdTime']
		}).then((response) => {
			if (response.statusCode == 200)
				this.setState({ blogs: response.body.docs });
			else
				throw 'Error: couchDB returns a status code of ' + response.statusCode + '.';
		});
	}
	group(blogs) {
		let groupedBlogs = {};
		for (const blog of blogs) {
			const category = blog.category || "未分类";
			if (!groupedBlogs[category])
				groupedBlogs[category] = 0;
			groupedBlogs[category]++;
		}
		return groupedBlogs;
	}
	timelineGenerator(blogs) {
		let timeline = [];
		for (const blog of blogs) {
			const createdTime = new Date(blog.createdTime);
			const year = createdTime.getFullYear();
			const month = createdTime.getMonth();
			if (!timeline[year]) timeline[year] = {};
			if (!timeline[year][month]) timeline[year][month] = 0;
			timeline[year][month]++;
		}
		return timeline;
	}

	render() {
		const groupedBlogs = this.group(this.state.blogs);
		const timeline = this.timelineGenerator(this.state.blogs);
		return (
			<Menu mode="inline">
				<Menu.SubMenu title="Categories"> {
					Object.keys(groupedBlogs).map((category) => (
						<Menu.Item>
							<a href={'/blog/category/' + category}>
								{category + ' (' + groupedBlogs[category] + ')'}
							</a>
						</Menu.Item>
					))}
				</Menu.SubMenu>
				<Menu.SubMenu title="Timeline"> {
					Object.keys(timeline).map((year) => (
						<Menu.SubMenu title={year}> {
							Object.keys(timeline[year]).map((month) => (
								<Menu.Item>
									<a href={'/blog/timeline/' + year + '/' + month}>
										{year + '.' + month}
									</a>
								</Menu.Item>
							))}
						</Menu.SubMenu>
					))}
				</Menu.SubMenu>
			</Menu>
		)
	}
}