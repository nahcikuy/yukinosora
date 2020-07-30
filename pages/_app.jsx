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

export default class extends React.Component {
	render() {
		const Component = this.props.Component;
		return (
			<div onLoad={this.handlePageLoaded}>
				<Head>
					<title key="page-title"> {this.props.pageProps.title} </title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewpoint" />

					{/**
				 	  * Import Editor.md
				 	  */}

					<link rel="stylesheet" href="/libs/editor.md/css/editormd.min.css" key="editormd-css" />
					<link rel="stylesheet" href="/libs/editor.md/css/editormd.preview.css" key="editormd-preview-css" />
					<script src="/libs/jquery/jquery.min.js" key="jquery" />
					<script src="/libs/editor.md/lib/raphael.min.js" key="raphel"></script>
					<script src="/libs/editor.md/lib/underscore.min.js" key="underscore"></script>
					<script src="/libs/editor.md/lib/sequence-diagram.min.js" key="sequence-diagram"></script>
					<script src="/libs/editor.md/lib/flowchart.min.js" key="flowchart"></script>
					<script src="/libs/editor.md/lib/jquery.flowchart.min.js" key="jquery-flowchart"></script>
					<script src="/libs/editor.md/lib/marked.min.js" key="marked"></script>
					<script src="/libs/editor.md/lib/prettify.min.js" key="prettify"></script>
					<script src="/libs/editor.md/editormd.min.js" key="editormd" />

					{/**
					  * Page loaded indicator
					  */}
					<script src="/javascripts/pageLoaded.js" key="pageLoaded" />
				</Head>

				<Layout id="layout">
					<Header>
						<div id="logo">
							<span>Yuki's Secret Garden</span>
						</div>
						<Menu id="top-menu" mode="horizontal" theme="dark">
							<Menu.Item>
								<a href="/">Home</a>
							</Menu.Item>
							<Menu.Item>
								<a href="/blog/page/1">Blog</a>
							</Menu.Item>
							<Menu.Item>
								<a href="/profile">Profile</a>
							</Menu.Item>
							<Menu.Item>
								<a href="/info">Info</a>
							</Menu.Item>
						</Menu>
					</Header>
					<Component {...this.props.pageProps} />
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
}