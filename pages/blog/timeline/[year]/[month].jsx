import { Layout } from 'antd';
import BlogList from '../../../../components/BlogList';
import BlogCategorizer from '../../../../components/BlogCategorizer';

const { Sider, Content } = Layout;
const blogFetcher = require('../../../../common/blogFetcher');

export async function getStaticPaths() {
	let paths = [];
	const timeline = await blogFetcher.timelineGenerator();
	for (const year in timeline)
		for (const month in timeline[year])
			paths.push({ params: { year, month } });
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	return {
		props: {
			blogs: await blogFetcher.getList({
				selector: {
					$and: [
						{ $not: { _id: 'nextBlogId' } },
						{
							createdTime: {
								year: Number(params.year),
								month: Number(params.month)
							}
						},
						{ visibility: true }
					]
				}
			}),
			year: params.year,
			month: params.month,
			pageIdStorage: `pageIdIn${params.year}${params.month}`
		}
	}
}

export default (props) => (
	<Layout>
		<Sider>
			<BlogCategorizer selectedKeys={[`${props.year}.${props.month}`]} />
		</Sider>
		<Content>
			<BlogList blogs={props.blogs} pageIdStorage={props.pageIdStorage} />
		</Content>
	</Layout>
);