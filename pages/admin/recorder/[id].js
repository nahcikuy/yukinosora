import dynamic from 'next/dynamic';
import { Layout, Form, Input, Button } from 'antd';
import { updateBlog } from '../../../common/blogFetcher';

const { Content } = Layout;
const blogFetcher = require('../../../common/blogFetcher');
const Editormd = dynamic(import('../../../components/Editormd'), { ssr: false });

export async function getStaticProps({ params }) {
	return {
		props: {
			id: params.id == 'new' ? null : params.id,
			blog: params.id == 'new' ? null : await blogFetcher.getBlog(params.id)
		}
	}
}

export async function getStaticPaths() {
	return await blogFetcher.generatePaths(['new']);
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			title: this.blog ? this.blog.title : '',
			content: this.blog ? this.blog.content : '',
			status: ''
		};
	}

	async componentDidMount() {
		if (this.state.id) {
			const doc = await blogFetcher.getBlog(this.state.id);
			if (doc) this.setState({ textValue: doc.content });
		}
	}

	handleTitleChange = (e) => {
		this.setState({
			title: e.target.value
		});
	}

	handleContentChange = (editormd) => {
		this.setState({
			content: editormd.getMarkdown()
		})
	}

	save = () => {
		console.log(this.state.content);
		blogFetcher.updateBlog({
			_id: this.state.id,
			title: this.state.title,
			content: this.state.content
		}).then((_id) => {
			this.setState({
				id: _id,
				status: 'Saved successfully'
			});
		}).catch((err) => {
			this.setState({
				status: 'Faild to save: ' + err
			});
		}).finally(() => {
			setTimeout(() => {
				this.setState({
					status: ''
				});
			}, 2000)
		});
	}

	render() {
		return (
			<Layout>
				<Content id="editor-body">
					<div>
						<p>Title</p>
						<Input id="title-input" value={this.state.title} onChange={this.handleTitleChange} />
					</div>
					<div>
						<p>Content</p>
						<Editormd
							markdown={this.state.content}
							onChange={this.handleContentChange}
							onSave={this.save}
						/>
					</div>
					<div>
						<p className="align-text-right">{this.state.status}</p>
						<Button className="align-right" type="primary" onClick={this.save}>Save</Button>
					</div>
				</Content>
			</Layout>
		)
	}
}