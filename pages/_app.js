/**
 * Global stylesheets.
 */

import '../styles.less';

/**
 * Default layout.
 */

import Head from 'next/head';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title> {pageProps.title} </title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<Layout id = "layout">
				<Header>
					<div id="logo">
						<span>Yuki's Secret Garden</span>
					</div>
					<Menu id="top-menu" mode="horizontal" theme="dark">
						<Menu.Item>
							<a href="/">Home</a>
						</Menu.Item>
						<Menu.Item>
							<a href="/diary">Diary</a>
						</Menu.Item>
						<Menu.Item>
							<a href="/profile">Profile</a>
						</Menu.Item>
						<Menu.Item>
							<a href="/info">Info</a>
						</Menu.Item>
					</Menu>
				</Header>
				<Component {...pageProps} />
				<Footer className="footer">
					Copyright @人工智障少女Yuki酱 2020. Powered by&nbsp;
					<a href="http://nextjs.org" target="_blank">Next.js</a> +&nbsp;
					<a href="http://ant.design" target="_blank">Antd</a> +&nbsp;
					<a href="http://couchdb.apache.org" target="_blank">CouchDB</a>.
				</Footer>
			</Layout>
		</div>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps };
// }

export default MyApp;