import Head from 'next/head';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;


export default () => {
	const style = {
		Menu: {
			fontWeight: 'bold',
		}
	}
	
	return (
		<Layout>
			<Header>
				<div id="logo">
					<span>Yuki's Secret Garden</span>
				</div>
				<Menu mode="horizontal" theme="dark" style={style.Menu}>
					<Menu.Item>
						<a href="#">Home</a>
					</Menu.Item>
					<Menu.Item>
						<a href="./diary">Diary</a>
					</Menu.Item>
					<Menu.Item>
						<a href="./profile">Profile</a>
					</Menu.Item>
					<Menu.Item>
						<a href="./info">Info</a>
					</Menu.Item>
				</Menu>
			</Header>
			<Layout>
				<Sider>
				</Sider>
				<Content>

				</Content>
			</Layout>
			<Footer>Footer</Footer>
		</Layout>
	);
}