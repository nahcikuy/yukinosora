import { Layout } from 'antd';
import BlogList from '../../../components/BlogList';
import BlogCategorizer from '../../../components/BlogCategorizer';

const { Sider, Content } = Layout;
const blogFetcher = require('../../../common/blogFetcher');

export async function getStaticPaths() {
	return {
		paths: (await blogFetcher.getCategories()).map(category => ({ params: { category } })),
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	return {
		props: {
			title: `${params.category} - Yukiの秘密の花園`,
			blogs: await blogFetcher.getList(false, {
				selector: {
					$and: [
						{ $not: { _id: 'nextBlogId' } },
						{ visibility: true },
						{ category: params.category }
					]
				}
			}),
			category: params.category,
			pageIdStorage: `pageIdIn${params.category}`,
			...await BlogCategorizer.initialize()
		}
	}
}

export default (props) => (
	<Layout>
		<Sider>
			<BlogCategorizer
				groupedBlogs={props.groupedBlogs}
				timeline={props.timeline}
				selectedKeys={[`category-${props.category}`]}
			/>
		</Sider>
		<Content>
			<BlogList blogs={props.blogs} pageIdStorage={props.pageIdStorage} />
		</Content>
	</Layout>
);