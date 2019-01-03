require("babel-register")({
	presets: ['env']
});
module.export = require("./server/index.js")