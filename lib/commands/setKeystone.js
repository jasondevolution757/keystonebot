const Clapp = require('../modules/clapp-discord');
const KeystonePlugin = require('../modules/keystonePlugin.js');

module.exports = new Clapp.Command({
	name: "setKey",
	desc: "Sets a keystone for a user",
	fn: (argv, context) => { 		
		KeystonePlugin.setKeystone();
		
		return 'Keystone was set!';
	},
	args: [
		{
			name:     "dungeon",
			desc:     "The keyston\'s dungeon",
			type:     "string",
			required: true
		},
		{
			name:     "level",
			desc:     "The keystone\'s level",
			type:     "number",
			required: true
		},
		{
			name:     "alt",
			desc:     "The alternate character <optional>",
			type:     "string",
			required: false,
			default:  ""
		}
	]	
});