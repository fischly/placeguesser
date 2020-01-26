let cfg = require('./config.json')
const { Client } = require('pg');

let client;

let initDb = new Promise((resolve, reject) => {

    // make sure to import 'db_import/createDB.sql' into your PostgreSQL database first
    console.log('trying to init db');
    client = new Client({
        host: cfg.database.host,
        user: cfg.database.user,
        password: cfg.database.password,
        database: cfg.database.db,
    });

    try {
        client.connect();
        resolve();
    }
    catch(err) {
        reject(err);
    }
    // return;
    client.query('SELECT * FROM public.users', (err, res) => {
        // console.log(err ? err.stack : res.rows[0].message) // Hello World!
        if (err) {
            console.log('ERROR: ', err);
            // reject(err);
            // return;
        }

        console.log('RESULTS:', res.rows);
        // client.end();
        // resolve();
        // return;
    })
});

function getDb() {
    if (!client) {
        console.log("Db has not been initialized. Please call init first.");
        return;
    }
    return client;
}

module.exports = {
    getDb,
    initDb
};
