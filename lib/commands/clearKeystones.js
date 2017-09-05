const Clapp = require('../modules/clapp-discord');
const mysql = require('mysql');
const config = require('../../config.js');

module.exports = new Clapp.Command({
    name: "clear",
    desc: "Clears stored keystones",
    fn: (argv, context) => {
        var user = context.msg.author.username;
        clearKeys(context, user);
        return 'All keystones cleared';
    }
});

var clearKeys = function(context, user) {
    var connection = mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    });

    connection.connect();

    var outString = '';
    if (user != 'Denatured') {
        outString = 'You do not have sufficient permissions to perform this action';
    } else {
        connection.query('DELETE FROM keystones', function(error, results) {
            if (error) throw error;
            connection.end();
            outString = 'Keystones cleared!\n\n';
            context.msg.channel.sendMessage(outString);
        });
    }
}