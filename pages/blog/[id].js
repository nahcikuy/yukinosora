import ReactMarkdown from 'react-markdown';
import { Typography, Layout, Menu } from 'antd';
import BlogCategorizer from '../../components/BlogCategorizer';

const { Title } = Typography;
const { Sider, Content } = Layout;
const blogFetcher = require('../../common/blogFetcher')

export async function getStaticProps({ params }) {
	const blog = await blogFetcher.getBlog(params.id);
	return {
		props: {
			blog: blog,
			title: blog ? blog.title : 'Failed to load blog'
		}
	};
}

export async function getStaticPaths() {
	return await blogFetcher.generatePaths();
}

export default (props) => {
	return (
		<Layout>
			<Sider breakpoint="lg">
				<BlogCategorizer />
			</Sider>
			<Content id="blog-body">
				<Title level={2} className="title">{props.blog.title}</Title>
				<ReactMarkdown source={props.blog.content}></ReactMarkdown>
			</Content>
		</Layout>
	)
}