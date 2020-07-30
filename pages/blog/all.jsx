import { Layout } from 'antd';
import BlogList from '../../components/BlogList';
import BlogCategorizer from '../../components/BlogCategorizer';

const { Sider, Content } = Layout;
const blogFetcher = require('../../common/blogFetcher');

export async function getStaticProps() {
	return {
		props: {
			blogs: await blogFetcher.getList()
		}
	}
}

export default (props) => (
	<Layout>
		<Sider>
			<BlogCategorizer />
		</Sider>
		<Content>
			<BlogList blogs={props.blogs} />
		</Content>
	</Layout>)