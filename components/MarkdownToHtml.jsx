/**
 * Transform markdown to HTML using editor.md
 * Properties:
 * * markdown: the markdown to transform
 * * markdownContainerId: the id of the container to store initial markdown
 * * options: the options object for editor.md
 */

const conf = require('../common/conf');

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.markdownContainerId = this.props.markdownCotainerId || 'markdown-container';
	}

	componentDidMount() {
		const markdownToHtml = () => {
			if (!window.pageLoaded) return;
			editormd.markdownToHTML(this.markdownContainerId, {
				...conf.markdownToHtml,
				...this.props.options
			});
			clearInterval(_markdownToHtml);
		}
		const _markdownToHtml = setInterval(markdownToHtml, 50);
	}

	render() {
		return (
			<div>
				<div id={this.markdownContainerId}>
					<textarea className="invisible" defaultValue={this.props.markdown}></textarea>
				</div>
			</div>
		)
	}
}