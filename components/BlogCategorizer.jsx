/**
 * The blog categorizer component
 * 
 * Properties:
 * * groupedBlogs: the list of grouped blogs
 * * timeline: the generated timeline
 * * selectedKeys: the selected keys in the menu
 */

import { Menu } from 'antd';
import { FolderTwoTone, FolderOpenTwoTone, FileZipTwoTone } from '@ant-design/icons';
const blogFetcher = require('../common/blogFetcher');

export default class BlogCategorizer extends React.Component {
	/**
	 * Fetch the list of the grouped blogs and timeline.
	 * Please call this function in *getStaticProps* and covery the result as *prop* to this component, e.g:
	 * 
	 * ```
	 * 	// in getStaticProps()
	 * 	return { 
	 * 		props: {
	 * 			...await BlogCategorizer.initialize()
	 * 		}
	 *	}
	 * ```
	 * 
	 * and then use *BlogCategorizer* with
	 * 
	 * ```
	 * 	<BlogCategorizer
	 * 		groupedBlogs={props.groupedBlogs}
	 * 		timeline={props.timeline}
	 *	/>
	 * ```
	 * 
	 * @returns {object}
	 * * groupedBlogs: the list of the grouped blogs
	 * * timeline: the timeline generated
	 */

	static async initialize() {
		const groupedBlogs = await blogFetcher.getGroupedBlogsList();
		const timeline = await blogFetcher.timelineGenerator();
		return { groupedBlogs, timeline };
	}

	constructor(props) {
		super(props);
		const openKeys = ['categories', 'timeline'];
		const selectedKeys = props.selectedKeys;
		for (const year of Object.keys(props.timeline)) openKeys.push(`${year}`);

		this.state = {
			openKeys,
			selectedKeys
		};
	}

	handleOpenChange = (openKeys) => {
		this.setState({ openKeys });
	}

	render() {
		/**
		 * Keys:
		 * * Categories: categories
		 * * Categories/[category]: category-[category]
		 * * Timeline: timeline
		 * * Timeline/[year]/[month]: [year].[month]
		 */

		const groupedBlogs = this.props.groupedBlogs;
		const timeline = this.props.timeline;
		const menuIconStyle = { fontSize: '1.25em' };
		const openKeys = this.state.openKeys;
		const selectedKeys = this.state.selectedKeys;

		return (
			<Menu
				mode="inline"
				className="blog-categorizer"
				onOpenChange={this.handleOpenChange}
				openKeys={openKeys}
				selectedKeys={selectedKeys}
			>
				<Menu.SubMenu
					title="Categories"
					key="categories"
					icon={openKeys.includes('categories') ?
						<FolderOpenTwoTone style={menuIconStyle} /> :
						<FolderTwoTone style={menuIconStyle} />}
				>

					{Object.keys(groupedBlogs).map((category) => (
						<Menu.Item
							key={`category-${category}`}
							icon={<FileZipTwoTone style={menuIconStyle} />}
						>
							<a href={`/blog/categories/${category}`}>
								{category + ' (' + groupedBlogs[category].length + ')'}
							</a>
						</Menu.Item>
					))}

				</Menu.SubMenu>

				<Menu.SubMenu
					title="Timeline"
					key="timeline"
					icon={openKeys.includes('timeline') ?
						<FolderOpenTwoTone style={menuIconStyle} /> :
						<FolderTwoTone style={menuIconStyle} />}
				>

					{Object.keys(timeline).map((year) => (
						<Menu.SubMenu
							title={`${year}`}
							key={`${year}`}
							icon={openKeys.includes(year.toString()) ?
								<FolderOpenTwoTone style={menuIconStyle} /> :
								<FolderTwoTone style={menuIconStyle} />}
						>

							{Object.keys(timeline[year]).map((month) => (
								<Menu.Item
									key={`${year}.${month}`}
									icon={<FileZipTwoTone style={menuIconStyle} />}
								>
									<a href={`/blog/timeline/${year}/${month}`}>
										{year + '.' + (month < 10 ? '0' : '') + month + ' (' + timeline[year][month].length + ')'}
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