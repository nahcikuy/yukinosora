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

				<Layout className="layout">
					<Header>
						<div className="logo">
							<span>Yuki's Secret Garden</span>
						</div>
						<Menu className="top-menu" mode="horizontal" theme="dark">
							<Menu.Item>
								<a href="/">Home</a>
							</Menu.Item>
							<Menu.Item>
								<a href="/blog/all">Archieves Hall</a>
							</Menu.Item>
							<Menu.Item>
								<a href="/profile">Information Center</a>
							</Menu.Item>
							<Menu.Item>
								<a href="/terminal">Terminal</a>
							</Menu.Item>
						</Menu>
					</Header>
					<Component {...this.props.pageProps} />
					<Footer className="footer">
						<p>Copyright &copy; 人工智障少女Yuki酱 2020. </p>
						
						<p>
							Powered by&nbsp;
							<a href="http://nextjs.org" target="_blank">Next.js</a> +&nbsp;
							<a href="http://ant.design" target="_blank">Antd</a> +&nbsp;
							<a href="http://couchdb.apache.org" target="_blank">CouchDB</a>.
						</p>
						<p>Deployed by <a href="http://vercel.com" target="_blank">Vercel</a>.</p>
						<p><a href="https://github.com/nahcikuy/yukinosora" target="_blank">Github Page</a></p>
					</Footer>
				</Layout>
			</div>
		);
	}
}