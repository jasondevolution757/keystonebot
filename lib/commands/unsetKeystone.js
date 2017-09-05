const Clapp = require('../modules/clapp-discord');
const mysql = require('mysql');
const config = require('../../config.js');

module.exports = new Clapp.Command({
	name: "unset",
	desc: "Unsets a keystone for a user",
	fn: (argv, context) => {
		var user = context.msg.author.username;
		var alt = argv.args.alt;
		var guildId = context.msg.guild.id;
		unsetKey(user, alt, guildId, context);
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

var unsetKey = function(user, alt, guildId, context) { 
	var connection = mysql.createConnection({
		host: config.db_host,
		user: config.db_user,
		password: config.db_password,
		database: config.db_name
	});
	
	connection.connect();
	
	// Update the key to unset, in this case we're just marking it "Inactive"
	connection.query('UPDATE keystones SET status = "Inactive", updated_at = NOW() WHERE user = ? AND alt = ? AND guild_id = ?', [user, alt, guildId], function(error, results) {
		if (error) throw error;
		connection.end();
		displayKeys(guildId, context);		
	});
}

var displayKeys = function(guildId, context) {
    var connection = mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    });

    connection.connect();

    // Get all the keys stored in the database and format the output string
    connection.query('SELECT * FROM keystones WHERE status IN ("Active", "Depleted") AND guild_id = ? ORDER BY level DESC, dungeon', [guildId], function(error, results) {
        if (error) throw error;
        connection.end();
        var outString = "***Current Keystones***\n\n";
        if (results.length > 0) {
            for(var i = 0; results.length > i; i++) {
                outString += '**Level ' + results[i].level + ' ' + results[i].dungeon + '** - ' + results[i].user;
                if (results[i].alt != '') {
                    outString += ' *(' + results[i].alt.charAt(0).toUpperCase() + results[i].alt.slice(1).toLowerCase() + ')*';
                }
                if (results[i].status == 'Depleted') {
                    outString += ' - __**Depleted**__';
                }
                outString += '\n';
            }
            outString += '\n\n';
        }
        context.msg.channel.sendMessage(outString);
    });
}