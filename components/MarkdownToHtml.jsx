/**
 * Transform markdown to HTML using editor.md
 * Properties:
 * * markdown: the markdown to transform
 * * options: the options object for editor.md
 */

const conf = require('../common/conf');

export default class extends React.Component {
	componentDidMount() {
		const markdownToHtml = () => {
			if (!window.pageLoaded) return;
			$('#html-rendered').html(editormd.markdownToHTML('markdown-content', {
				...conf.markdownToHtml,
				...this.props.options
			}));
			clearInterval(_markdownToHtml);
		}
		const _markdownToHtml = setInterval(markdownToHtml, 50);
	}

	render() {
		return (
			<div>
				<div id="markdown-content">
					<textarea className="invisible" defaultValue={this.props.markdown}></textarea>
				</div>
				<div id="html-rendered"></div>
			</div>
		)
	}
}