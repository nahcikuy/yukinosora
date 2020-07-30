export class TimeStamp {
	/**
	 * Parse a time stamp to a object
	 * @param {string|Date} timeStamp the time stamp to parse 
	 * @returns {{year,month,day,hour,minute,second}} the parsed object
	 */
	static parse(timeStamp) {
		const _timeStamp = new Date(timeStamp);
		return {
			year: _timeStamp.getFullYear(),
			month: _timeStamp.getMonth() + 1,
			day: _timeStamp.getDate(),
			hour: _timeStamp.getHours(),
			minute: _timeStamp.getMinutes(),
			second: _timeStamp.getSeconds()
		};
	}
	
	/**
	 * Stringify a time stamp object
	 * @param {object} _timeStamp the object to stringify
	 * @param {boolean} includeTime specify whether the result should contain time (or date only) 
	 */
	static stringify(_timeStamp, includeTime = false) {
		const f = num => ('0' + num).substr(-2);
		let timeStamp = `${_timeStamp.year}-${f(_timeStamp.month)}-${f(_timeStamp.day)}`;
		if (includeTime) timeStamp += ` ${f(_timeStamp.hour)}:${f(_timeStamp.minute)}:${f(_timeStamp.day)}`;
		return timeStamp;
	}
}



export class ScriptLoader {
	/**
	 * Load the static JS file
	 * 
	 * This will add a \<script\> tag to \<body\>, and it must only be called in client side.
	 * 
	 * @param {string} src the path to the source code
	 * @param {string} key the key (avoid duplicate loading)
	 * @param {boolean} async specify whether the code is loaded asynchronous
	 */
	static load(src, key, async = false) {
		if (!window[key]) {
			window[key] = true;
			const script = document.createElement('script');
			script.src = src;
			script.async = async;
			document.body.appendChild(script);
		}
	}
}
