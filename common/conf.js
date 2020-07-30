module.exports = {
	database: {
		host: 'localhost',
		username: 'root',
		password: 'root',
		port: 5984
	},
	editormd: {
		//id: 'editormd-editor',
		height: 330,
		htmlDecode: 'style,script,iframe',
		//theme: 'dark',  // this won't work. why?
		editorTheme: 'blackboard',
		previewTheme: 'dark',
		//imageUpload: true,
		//imageUploadURL: '',
		//crossDomainUpload: true,
		//uploadCallbackURL: true,
		path: '/libs/editor.md/lib/',
		emoji: true,
		tex: true,
		flowChart: true,
		sequenceDiagram: true,
	},
	markdownToHtml: {
		htmlDecode: 'style,script,iframe',
		emoji: true,
		tasklist: true,
		tex: true,
		flowChart: true,
		sequenceDiagram: true
	},
	jwt:
	{
		secret: '19260817',
		options:
		{
			expiresIn: '30d'
		}
	}
};