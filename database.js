// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='newuserinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE newuserinfo ( id INTEGER PRIMARY KEY, user TEXT,  email TEXT, pass TEXT, accountType TEXT);
		INSERT INTO newuserinfo (user, email, pass, accountType) VALUES ('admin','admin@somedomain.com', 'bdc87b9c894da5168059e00ebffb9077', 'The Octopus Riders'), 
        ('test','test@somedomain.com', '9241818c20435c6672dac2c4b6e6c071', 'The Giant Turtle Pillagers')
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and two entries containing a username and password.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db
