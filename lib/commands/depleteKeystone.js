var Clapp = require('../modules/clapp-discord');
var KeystonePlugin = require('../modules/keystonePlugin.js');

module.exports = new Clapp.Command({
	name: "depleteKey",
	desc: "Marks a keystone as depleted",
	fn: (argv, context) => { 		
		return 'Keystone marked as depleted';
	},
	args: [ 
		{
			name: "alt",
			desc: "The alternate character <optional>",
			type: "string",
			required: false,
			default: ""
		}
	]	
});