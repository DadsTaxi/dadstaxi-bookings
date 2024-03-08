const sqlite3 = require('sqlite3').verbose();

class SQLiteDatabase {
    constructor(filePath) {
        this.db = new sqlite3.Database(filePath, (err) => {
            if (err) {
                console.error(`Can't open database: ${err.message}`);
                throw err;
            }
        });
    }

    async init() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS data (
                id TEXT PRIMARY KEY, 
                name TEXT,
                website TEXT,
                pickupAddress TEXT,
                pickupTime TEXT
                        )`, function (err) {
                if (err) {
                    console.error(`Error creating table: ${err}`);
                }
            });
        });
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM data', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    //get a single record by id
    async get(id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM data WHERE id = '${id}'`, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async create(data) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO data (id, name, website, pickupAddress, pickupTime) VALUES ('${data.id}', '${data.name}', '${data.website}', '${data.pickupAddress}', '${data.pickupTime}')`, (err) => {
                if (err) {
                    reject(err);
                } else {           
                     resolve(data);
               }
            });
        });
    }

    async update(id, updatedData) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE data SET 
                name = '${updatedData.name}', 
                website = '${updatedData.website}', 
                pickupAddress = '${updatedData.pickupAddress}', 
                pickupTime = '${updatedData.pickupTime}' 
            WHERE id = '${id}'`;
            this.db.run(query,
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM data WHERE id = '${id}'`, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error(`Error closing database: ${err}`);
            }
        });
    }
}

module.exports = SQLiteDatabase;