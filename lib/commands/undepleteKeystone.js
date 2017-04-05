var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({ 
	name: "undepleteKey",
	desc: "Marks a keystone undepleted",
	fn: (argv, context) => { 
		return 'Keystone was marked as undepleted and updated';
	},
	args: [ 
		{
			name: "dungeon",
			desc: "The keystone's dungeon",
			type: "string",
			required: true
		},
		{
			name: "level",
			desc: "The keystone's level",
			type: "number",
			required: true
		},
		{
			name: "alt",
			desc: "The alternate character <optional",
			type: "string",
			required: false,
			default: ""
		}
	]
});