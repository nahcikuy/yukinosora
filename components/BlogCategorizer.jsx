/**
 * The blog categorizer component
 * 
 * Properties:
 * * selectedKeys: the selected keys in the menu
 */

import { Menu } from 'antd';
import { FolderTwoTone, FolderOpenTwoTone, FileZipTwoTone } from '@ant-design/icons';
const blogFetcher = require('../common/blogFetcher');

export default class BlogCategorizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupedBlogs: [],
			timeline: [],
			openKeys: [],
			selectedKeys: props.selectedKeys || []
		};
		const openKeys = ['categories', 'timeline'];
		blogFetcher.getGroupedBlogsList()
			.then((groupedBlogs) => this.setState({ groupedBlogs }));
		blogFetcher.timelineGenerator()
			.then((timeline) => {
				for (const year of Object.keys(timeline)) openKeys.push(`${year}`);
				this.setState({ timeline, openKeys });
			});
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

		const groupedBlogs = this.state.groupedBlogs;
		const timeline = this.state.timeline;
		const openKeys = this.state.openKeys;
		const selectedKeys = this.state.selectedKeys;
		const menuIconStyle = { fontSize: '1.25em' };
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