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
                            id INTEGER PRIMARY KEY, 
                            name TEXT
                        )`, function (err) {
                if (err) {
                    console.error(`Error creating table: ${err}`);
                }
            });
        }); // Add closing parenthesis here
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

    async create(data) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO data (name) VALUES (?)', [data.name], (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.db.get('SELECT last_insert_rowid() as id', [], (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            data.id = row.id;
                            resolve(data);
                        }
                    });
                }
            });
        });
    }

    async update(id, updatedData) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE data SET name = ? WHERE id = ?', [updatedData.name, id],
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
            this.db.run('DELETE FROM data WHERE id = ?', [id], function (err) {
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