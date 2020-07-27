/**
 * Encaposulate editor.md as a react component.
*/
import Head from 'next/head';

export default class extends React.Component {
	state = { editormd: null, content: '' };

	getEditormd() {
		return this.state.editormd;
	}

	getMarkdown() {
		return this.state.editormd.getMarkdown();
	}

	componentDidMount() {
		/**
		 * Load scripts.
		 */
		const createScriptTag = (src) => {
			const script = document.createElement('script');
			script.src = src;
			script.async = false;
			document.body.appendChild(script);
		}

		if (!window.editormdLoaded) {
			createScriptTag('/libs/jquery/jquery.min.js');
			createScriptTag('/libs/editor.md/editormd.min.js');
			createScriptTag('/javascripts/editormdLoaded.js');
		}

		/**
		 * Load editor.
		 */
		const editormdLoader = () => {
			if (window.editormdLoaded) {
				this.setState({
					editormd: editormd({
						id: 'editor',
						height: 330,
						//theme: ''
						//editorTheme: 'default'
						//previewTheme: '',
						//imageUpload: true,
						//imageUploadURL: '',
						//crossDomainUpload: true,
						//uploadCallbackURL: true,
						//htmlDecode: false,
						path: '/libs/editor.md/lib/',
						emoji: true,
						tex: true,
						flowChart: true,
						sequenceDiagram: true,
						markdown: this.props.markdown,
						...this.props.options
					})
				});
				clearInterval(_editormdLoader);
			}
		};
		const _editormdLoader = setInterval(editormdLoader, 50);

		/**
		 * Add onChange event listner.
		 */
		const onChangeListener = () => {
			let newContent = window.$('#content').val();
			if (newContent !== this.state.content) {
				if (this.props.onChange)
					this.props.onChange(this.getEditormd())
				this.setState({ content: newContent });
			}
		}
		setInterval(onChangeListener, 50);
	}

	handleKeyDown = (e) => {
		let keyCode = e.keyCode || e.which || e.charCode;
		let ctrlKey = e.ctrlKey || e.metaKey;
		console.log(keyCode, ctrlKey);
		if (ctrlKey && keyCode == 83 && this.props.onSave) {
			e.preventDefault();
			this.props.onSave(this.state.editormd);
		}
	}

	render() {
		return (
			<div>
				<Head>
					<link rel="stylesheet" href="/libs/editor.md/css/editormd.min.css" key="editormd-css" />
				</Head>
				<div id="editor" onKeyDown={this.handleKeyDown}>
					<textarea id="content"></textarea>
				</div>
			</div>
		);
	}
}