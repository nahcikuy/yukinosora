import { Layout } from 'antd';

const { Content } = Layout;

export async function getStaticProps() {
	return {
		props: {
			title: 'Terminal -  Yukiの秘密の花園'
		}
	}
}

export default (props) => {
	return (
		<Layout>
			<Content>
				Being constructed...
			</Content>
		</Layout>
	)
}