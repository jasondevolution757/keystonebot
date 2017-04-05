var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
	name: "unsetKey",
	desc: "Unsets a keystone for a user",
	fn: (argv, context) => { 
		return 'Keystone was unset!';
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