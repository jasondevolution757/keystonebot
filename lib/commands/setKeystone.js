const Clapp = require('../modules/clapp-discord');
const mysql = require('mysql');
const config = require('../../config.js');

module.exports = new Clapp.Command({
    name: "set",
    desc: "Sets a keystone for a user",
    fn: (argv, context) => {
        var user = context.msg.author.username;
        var alt = argv.args.alt;
        var dungeon = argv.args.dungeon;
        var level = argv.args.level;
        var guildId = context.msg.guild.id;
        return setKeystone(user, alt, dungeon, level, guildId, context);        
    },
    args: [
        {
            name:     "dungeon",
            desc:     "The keystone's dungeon",
            type:     "string",
            required: true
        },
        {
            name:     "level",
            desc:     "The keystone's level",
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

var setKeystone = function(user, alt, dungeon, level, guildId, context) {
    var dungeon = getDungeon(dungeon);
    if (dungeon != 'None') {
        var status = 'active';
        addKeyToDataStore(user, alt, dungeon, level, status, guildId, context);
        return "Keystone set!\n";
    } else { 
    	displayDungeonNameError(context);
    	return "Try again...\n";
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
        var shortAltRe = new RegExp('maw', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.MoS;
        }
        var longRe = new RegExp(dungeonConfig.CoS, 'i');
        var shortRe = new RegExp('cos', 'i');
        var shortAltRe = new RegExp('court', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.CoS;
        }
        var longRe = new RegExp(dungeonConfig.LKara, 'i');
        var shortRe = new RegExp('lkara', 'i');
        var shortAltRe = new RegExp('kl', 'i');
        var shortAltReTwo = new RegExp('lower', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon) || shortAltReTwo.exec(dungeon)) {
            return dungeonConfig.LKara;
        }
        var longRe = new RegExp(dungeonConfig.UKara, 'i');
        var shortRe = new RegExp('ukara', 'i');
        var shortAltRe = new RegExp('ku', 'i');
        var shortAltReTwo = new RegExp('upper', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon) || shortAltReTwo.exec(dungeon)) {
            return dungeonConfig.UKara;
        }
        var longRe = new RegExp(dungeonConfig.HoV, 'i');
        var shortRe = new RegExp('hov', 'i');
        var shortAltRe = new RegExp('halls', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.HoV;
        }
        var longRe = new RegExp(dungeonConfig.DHT, 'i');
        var shortRe = new RegExp('dht', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon)) {
            return dungeonConfig.DHT;
        }
        var longRe = new RegExp(dungeonConfig.NL, 'i');
        var shortRe = new RegExp('nl', 'i');
        var shortAltRe = new RegExp('nelths', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.NL;
        }
        var longRe = new RegExp(dungeonConfig.BRH, 'i');
        var shortRe = new RegExp('brh', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon)) {
            return dungeonConfig.BRH;
        }
        var longRe = new RegExp(dungeonConfig.Arc, 'i');
        var shortRe = new RegExp('arc', 'i');
        var shhortAltRe = new RegExp('arcway', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.Arc;
        }
        var longRe = new RegExp(dungeonConfig.VotW, 'i');
        var shortRe = new RegExp('votw', 'i');
        var shortAltRe = new RegExp('vault', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.VotW;
        }
        var longRe = new RegExp(dungeonConfig.EoA, 'i');
        var shortRe = new RegExp('eoa', 'i');
        var shortAltRe = new RegExp('eye', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.EoA;
        }
        var longRe = new RegExp(dungeonConfig.CoEN, 'i');
        var shortRe = new RegExp('coen', 'i');
        var shortAltRe = new RegExp('cathedral', 'i');
        if (longRe.exec(dungeon) || shortRe.exec(dungeon) || shortAltRe.exec(dungeon)) {
            return dungeonConfig.CoEN;
        }        
        return 'None';
    }
}
var addKeyToDataStore = function(user, alt, dungeon, level, status, guildId, context) {
    var connection = mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    });

    connection.connect();

    var queryData = {};
    // Check to see if the user already has a key present
    connection.query('SELECT * FROM keystones WHERE user = ? AND alt = ? AND status IN ("Active", "Depleted") AND guild_id = ?', [user, alt, guildId], function(error, results, fields) {
        if (error) throw error;
        if (results.length == 1) {
            connection.query('UPDATE keystones SET dungeon = ?, level = ?, updated_at = NOW()  WHERE user = ? AND alt = ? AND status IN ("Active", "Depleted") AND guild_id = ?', [dungeon, level, user, alt, guildId], function(error, results, fields) {
                if (error) throw error;
                connection.end();
                displayKeys(guildId, context);
            });
        } else {
            connection.query('INSERT INTO keystones VALUES (NULL, ?, ?, ?, ?, "Active", ?, NOW(), NOW())', [user, dungeon, level, alt, guildId], function(error, results, fields) {
                if (error) throw error;
                connection.end();
                displayKeys(guildId, context);
            });
        }
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

var displayDungeonNameError = function(context) {
	var errorString = 'Bad dungeon name supplied. Please refer to the list of available aliases or type on the entire dungeon name in quotes.';
	context.msg.channel.sendMessage(errorString);
}
