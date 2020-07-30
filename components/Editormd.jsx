/**
 * Encaposulate editor.md as a react component.
 * * Properties:
 * * markdown: the iniitial markdown
 * * options: the options object for editor.md
 * * onChange: callback(content): the callback when the cotent changes.
 * * onSave: callback(content): the callback when Ctrl+S is pressed.
*/

import Head from 'next/head';
import { ScriptLoader } from '../common/utils';

const conf = require('../common/conf');

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
		 * Load editor.
		 */
		const editorLoader = () => {
			if (!window.pageLoaded) return;
			this.setState({
				editormd: editormd({
					...conf.editormd,
					markdown: this.props.markdown,
					...this.props.options
				})
			});
			window.editorLoaded = true;
			clearInterval(_editorLoader);
		}
		const _editorLoader = setInterval(editorLoader, 50);

		/**
		 * Add onChange event listner.
		 */
		const onChangeListener = () => {
			if (!window.editorLoaded) return;
			const newContent = $('#editormd-content').val();
			if (newContent !== this.state.content) {
				this.setState({ content: newContent });
				if (this.props.onChange)
					this.props.onChange(newContent);
			}
		}
		setInterval(onChangeListener, 50);
	}

	handleKeyDown = (e) => {
		let keyCode = e.keyCode || e.which || e.charCode;
		let ctrlKey = e.ctrlKey || e.metaKey;
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
				<div id="editormd-editor" onKeyDown={this.handleKeyDown}>
					<textarea id="editormd-content"></textarea>
				</div>
			</div>
		);
	}
}