require("babel-register")({
	presets: ['env'],
	plugins: ['transform-decorators-legacy']
});
module.export = require("./server/index.js")