const Clapp = require('../modules/clapp-discord');
const fs = require('fs');
const mysql = require('mysql');
const config = require('../../config.js');

module.exports = new Clapp.Command({
	name: "setKey",
	desc: "Sets a keystone for a user",
	fn: (argv, context) => {
		var user = context.msg.author.username;
		var alt = argv.args.alt;
		var dungeon = argv.args.dungeon;
		var level = argv.args.level;
		setKeystone(user, alt, dungeon, level);
        var output = displayKeys();
		return "Keystone set!\n" + output;
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

const dungeonConfig = {
	MoS:   "Maw of Souls",
	CoS:   "Court of Stars",
	LKara: "Lower Karazhan",
	UKara: "Upper Karazhan",
	HoV:   "Halls of Valor",
	DHT:   "Darkheart Thicket",
	NL:    "Neltharion's Lair",
	BRH:   "Black Rook Hold",
	Arc:   "The Arcway",
	VotW:  "Vault of the Wardens",
	EoA:   "Eye of Azshara",
	CoEN:  "Cathedral of Eternal Night"
}

var setKeystone = function(user, alt, dungeon, level) { 
	var dungeon = getDungeon(dungeon);
	console.log(dungeon);
	console.log(user);
	console.log(alt);
	console.log(level);	
	if (dungeon != 'None') { 
            var status = 'active';
		addKeyToDataStore(user, alt, dungeon, level, status);
	} 		
}

var getDungeon = function(dungeon) {	
	if (dungeon == '') { 
		return "No dungeon was provided. You are bad and should feel bad.";
	} else { 
		// Test for a match against the dungeons available
		// Full string match and abbreviations are both valid
		var longRe = new RegExp(dungeonConfig.MoS, 'i');
		var shortRe = new RegExp('mos', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.MoS;
		} 
		var longRe = new RegExp(dungeonConfig.CoS, 'i');
		var shortRe = new RegExp('cos', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.CoS;
		} 
		var longRe = new RegExp(dungeonConfig.LKara, 'i');
		var shortRe = new RegExp('lkara', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.LKara;
		} 
		var longRe = new RegExp(dungeonConfig.UKara, 'i');
		var shortRe = new RegExp('ukara', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.UKara;
		} 
		var longRe = new RegExp(dungeonConfig.HoV, 'i');
		var shortRe = new RegExp('hov', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.HoV;
		} 
		var longRe = new RegExp(dungeonConfig.DHT, 'i');
		var shortRe = new RegExp('dht', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.DHT;
		} 
		var longRe = new RegExp(dungeonConfig.NL, 'i');
		var shortRe = new RegExp('nl', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.NL;
		} 
		var longRe = new RegExp(dungeonConfig.BRH, 'i');
		var shortRe = new RegExp('brh', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.BRH;
		} 
		var longRe = new RegExp(dungeonConfig.Arc, 'i');
		var shortRe = new RegExp('arc', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.Arc;
		} 
		var longRe = new RegExp(dungeonConfig.VotW, 'i');
		var shortRe = new RegExp('votw', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.VotW;
		} 
		var longRe = new RegExp(dungeonConfig.EoA, 'i');
		var shortRe = new RegExp('eoa', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.EoA;
		} 
		var longRe = new RegExp(dungeonConfig.CoEN, 'i');
		var shortRe = new RegExp('coen', 'i');
		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
			return dungeonConfig.CoEN;
		} 
	}	
}
var addKeyToDataStore = function(user, alt, dungeon, level, status) { 
    var connection = mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    });

    connection.connect();

    var queryData = {};
    // Check to see if the user already has a key present
    connection.query('SELECT * FROM keystones WHERE user = ? AND alt = ?', [user, alt], function(error, results, fields) { 
    	if (error) throw error;
    	if (results.length == 0) { 
    		queryData.currentKey = true;
    	}
    });
    
    // If the user and alt combination already has a key, update it. Otherwise insert a new key
    if (queryData.currentKey == true) { 
    	connection.query('UPDATE keystones SET dungeon = ?, level = ? WHERE user = ? AND alt = ?, updated_at = NOW()', [dungeon, level, user, alt], function(error, results, fields) { 
    		if (error) throw error;    		
    	});
    } else { 
    	connection.query('INSERT INTO keystones VALUES (NULL, ?, ?, ?, ?, "Active", NOW(), NOW()', [user, dungeon, level, alt], function(error, results, fields) { 
    		if (error) throw error;
    	});
    }

    connection.end();
}

var displayKeys = function() { 
	var connection = mysql.createConnection({
		host: config.db_host,
		user: config.db_user,
		password: config.db_password,
		database: config.db_name
	});
	
	connection.connect();
	
	var queryData = {};
	// Get all the keys stored in the database and format the output string
	connection.query('SELECT * FROM keystones', function(error, results, fields) { 
		if (error) throw error;
		if (results.length > 0) { 
			queryData.results = results;
		}
	});
	var outString = 'Current Keystones\n\n';
	if (queryData.results) { 
		for(var i = 0; queryData.results.length > i; i++) { 
			outString += queryData.results[i].dungeon + ' ' + queryData.results[i].level + ' ' + queryData.results[i].user;
			if (queryData.results[i].alt != '') { 
				outString += ' (' + queryData.results[i].alt + ')';
			}
			outString += '\n';
		}
		outString += '\n\n';
	}
	return outString;
	connection.end();
}
