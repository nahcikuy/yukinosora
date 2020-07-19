import Head from 'next/head';
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class extends React.Component {
	render() {
		return (
			<Layout>
				<Header>Header</Header>
				<Layout>
					<Sider>Sider</Sider>
					<Content>Content</Content>
				</Layout>
				<Footer>Footer</Footer>
			</Layout>
		);
	}
};