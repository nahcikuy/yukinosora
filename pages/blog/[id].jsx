import { Typography, Layout, Menu } from 'antd';
import MarkdownToHtml from '../../components/MarkdownToHtml';
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
	let paths = [];
	const blogs = await blogFetcher.getList();
	for (const blog of blogs)
		paths.push({ params: { id: blog._id } });
	return { paths, fallback: false };
}

export default (props) => (
	<Layout>
		<Sider breakpoint="lg">
			<BlogCategorizer />
		</Sider>
		<Content className="blog-body">
			<Title level={2} className="title">{props.blog.title}</Title>
			<MarkdownToHtml markdown={props.blog.content} />
		</Content>
	</Layout>
);