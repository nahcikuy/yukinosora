import dynamic from 'next/dynamic';
import { TimeStamp, ScriptLoader } from '../../../common/utils';
import { Layout, Form, Input, Button, Row, Col, Cascader } from 'antd';
import { map } from 'jquery';

const { Content } = Layout;
const blogFetcher = require('../../../common/blogFetcher');
const Editormd = dynamic(import('../../../components/Editormd'), { ssr: false });

export async function getStaticProps({ params }) {
	const blog = params.id == 'new' ? null : await blogFetcher.getBlog(params.id)
	return {
		props: {
			blog,
			title: `Recorder - ${blog ? blog.title : 'new'} -  Yukiの秘密の花園`,
			id: params.id == 'new' ? null : params.id,
			categories: await blogFetcher.getCategories(true)
		}
	}
}

export async function getStaticPaths() {
	const blogs = await blogFetcher.getList(true);
	let paths = [{ params: { id: 'new' } }];
	for (const blog of blogs)
		paths.push({ params: { id: blog._id } });
	return { paths, fallback: false };
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			title: this.props.blog ? this.props.blog.title : '',
			category: this.props.blog ? this.props.blog.category : 'default',
			content: this.props.blog ? this.props.blog.content : '',
			visibility: this.props.blog ? this.props.blog.visibility : false,
			createdTime: this.props.blog ? this.props.blog.createdTime : null
		};
	}

	handleTitleChange = (e) => {
		this.setState({
			title: e.target.value
		});
	}

	handleContentChange = (content) => {
		this.setState({ content });
	}

	handleVisibilityChange = () => {
		this.setState({ visibility: Number($('#visibility-selector :selected').val()) ? true : false });
	}

	handleCategoryChange = () => {
		const addCategory = () => {
			let canceled = false;
			const newCategory = prompt('Enter the name of category: ');
			if (!newCategory)
				canceled = true;
			if (newCategory == '') {
				alert('Category name can\'t be empty!');
				canceled = true;
			}
			const categories = $('#category-selector option').map(function () {
				return $(this).val();
			}).get();
			if (categories.includes(newCategory)) {
				alert('Category name already exists!');
				canceled = true;
			}
			if (!newCategory || newCategory == '') {
				$('#category-selector').val(this.state.category);
				return;
			}

			const _newCategory = document.createElement('option');
			_newCategory.value = _newCategory.text = newCategory;
			$('#category-add-new').before(_newCategory);

			$('#category-selector').val(newCategory);
			this.setState({ category: newCategory });
		}

		const selected = $('#category-selector :selected');
		if (selected.val() == '!add-new') addCategory();
		else this.setState({ category: selected.val() });
	}

	save = () => {
		if (this.state.title == "") {
			$('#title-input').val('This field is required!');
			return;
		}
		blogFetcher.updateBlog({
			_id: this.state.id,
			title: this.state.title,
			content: this.state.content,
			category: this.state.category,
			visibility: this.state.visibility,
			createdTime: this.state.createdTime || TimeStamp.parse(Date()),
			lastUpdatedTime: TimeStamp.parse(Date())
		}).then((blog) => {
			this.setState({
				id: blog._id,
				createdTime: blog.createdTime,
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
				<Content className="editor-body">
					<Row gutter={16}>
						<Col span={20}>
							<p className="bold">Title</p>
							<Input id="title-input" value={this.state.title} onChange={this.handleTitleChange} />
						</Col>
						<Col span={2}>
							<p className="bold">Category</p>
							<select
								id="category-selector"
								value={this.state.category}
								onChange={this.handleCategoryChange}
							>
								{this.props.categories.map((category) => (
									<option
										value={category}
										id={'category-' + category}
										key={'category-' + category}
									>
										{category}
									</option>
								))}
								<option
									value="!add-new"
									id="category-add-new"
									key="category-add-new"
								>
									Add new...
								</option>
							</select>
						</Col>
						<Col span={2}>
							<p className="bold">Visibility</p>
							<select
								value={this.state.visibility ? '1' : '0'}
								id="visibility-selector"
								onChange={this.handleVisibilityChange}
							>
								<option value={0} key="invisible">Only me</option>
								<option value={1} key="visible">Everyone</option>
							</select>
						</Col>
					</Row>

					<div>
						<p className="bold">Content</p>
						<Editormd
							markdown={this.state.content}
							onChange={this.handleContentChange}
							onSave={this.save}
						/>
					</div>
					<div>
						<p className="align-text-right bold">{this.state.status}</p>
						<Button className="align-right" type="primary" onClick={this.save}>Save</Button>
					</div>
				</Content>
			</Layout>
		)
	}
}