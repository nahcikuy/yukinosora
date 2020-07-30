/**
 * The blog list component
 * 
 * Properties:
 * * blogs: the list of blogs
 * * pageIdStorage: specify the key of localStorage to store the page ID.
 */

import { Row, Col, Table, Pagination } from 'antd';
import { TimeStamp } from '../common/utils';

export default class extends React.Component {
	
	state = {
		currentPage: 1,
		pageSize: 8
	}

	componentDidMount() {
		const pageIdStorage = this.props.pageIdStorage;
		if (localStorage[pageIdStorage])
			this.setState({ currentPage: Number(localStorage[pageIdStorage]) });
		else
			localStorage[pageIdStorage] = this.state.currentPage;

		if (localStorage.pageSizeInBlogList)
			this.setState({ pageSize: Number(localStorage.pageSizeInBlogList) });
		else
			localStorage.pageSizeInBlogList = this.state.pageSize;
	}

	generateData = () => {
		const start = (this.state.currentPage - 1) * this.state.pageSize;
		const end = Math.min(start + this.state.pageSize, this.props.blogs.length);
		const data = this.props.blogs.slice(start, end).map(blog => ({
			id: blog._id,
			key: blog._id,
			title: blog.title,
			category: blog.category,
			createdDate: TimeStamp.stringify(blog.createdTime),
			lastUpdatedDate: TimeStamp.stringify(blog.lastUpdatedTime)
		}));
		return data;
	}

	handleChange = (current, pageSize) => {
		this.setState({
			currentPage: current,
			pageSize: pageSize
		});
		localStorage[this.props.pageIdStorage] = current;
		localStorage.pageSizeInBlogList = pageSize;
	}

	render() {
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				width: '5%',
				render: (id) => <a href={"/blog/" + id}>{id}</a>
			},
			{
				title: 'Title',
				dataIndex: 'title',
				key: 'title',
				width: '65%',
				render: (title, blog) => <a href={"/blog/" + blog.id}>{title}</a>
			},
			{
				title: 'Category',
				dataIndex: 'category',
				key: 'category',
				width: '10%',
				render: (category) => <a href={"/blog/categories/" + category}>{category}</a>
			},
			{
				title: 'Created On',
				dataIndex: 'createdDate',
				key: 'createdDate',
				width: '10%'
			},
			{
				title: 'Updated On',
				dataIndex: 'lastUpdatedDate',
				key: 'lastUpdatedDate',
				width: '10%'
			}
		];

		return (
			<div>
				<Table columns={columns} dataSource={this.generateData()} pagination={false} />
				<Pagination
					key="blog-list-pagination"
					className="align-text-center pagination"
					total={this.props.blogs.length}
					current={this.state.currentPage}
					pageSize={this.state.pageSize}
					pageSizeOptions={[2, 4, 8, 16, 32, 64]}
					showSizeChanger={true}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					onChange={this.handleChange}
					onShowSizeChange={this.handleChange}
				/>
			</div>
		);
	}
}