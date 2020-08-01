import {Layout} from 'antd';

const {Content} = Layout;
export async function getStaticProps()
{
	return {
		props: {
			title: 'Information Center -  Yukiの秘密の花園'
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