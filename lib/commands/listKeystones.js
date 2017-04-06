const Clapp = require('../modules/clapp-discord');
const mysql = require('mysql');
const config = require('../../config.js');

module.exports = new Clapp.Command({
	name: "list",
	desc: "Lists the current active and depleted keystones",
	fn: (argv, context) => { 
		listKeys(context);
	}	
});

var listKeys = function(context) { 
	var connection = mysql.createConnection({
		host: config.db_host,
		user: config.db_user,
		password: config.db_password,
		database: config.db_name
	});
	
	connection.connect();
	
	// Get all the keys in the database and format the output string
	connection.query('SELECT * FROM keystones WHERE status IN ("Active", "Depleted")', function(error, results) { 
		if (error) throw error;
		connection.end();
		var outString = "***Current Keystones***\n\n";
		if (results.length > 0) { 
			for(var i = 0; results.length > i; i++) { 
				outString += '**Level ' + results[i].level + ' ' + results[i].dungeon + '** - ' + results[i].user;
				if (results[i].alt != '') { 
					outString += ' (' + results[i].alt.charAt(0).toUpperCase() + results[i].alt.slice(1).toLowerCase() + ')';
				}
				if (results[i].status == 'Depleted') { 
					outString += ' - Depleted';
				}
				outString += '\n';
			}
			outString += '\n\n';
		}
		context.msg.channel.sendMessage(outString);
	})
}