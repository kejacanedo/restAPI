const mysql      = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port :     process.env.DB_PORT
});
 
conn.connect( (err) => {
    if (err) {throw err;}
    console.log('Connected to database successfully.');
});

const db = {

    createTable: () => {
        const sql = "CREATE TABLE test_table (id INT AUTO_INCREMENT, firstname VARCHAR(80), lastname VARCHAR(80), PRIMARY KEY(id))"
        conn.query(sql, (err) => {
            if (err) { throw err };
            console.log('Table created successfully.');
        })
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM test_table";
            conn.query(sql, (err, result) => {
                if (err) { return reject(err); }
                return resolve(result);
            })
        });
    },

    insertData: () => {
        return new Promise((resolve, reject) => {
            const data = { firstname: "Jane", lastname: "Doe" };
            const sql = "INSERT INTO test_table SET?";
            conn.query(sql, data, (err) => {
                if (err) { return reject(err); }
                return resolve("Data inserted successfully.");
            })
        });
    },

    updateData: (id) => {
        return new Promise((resolve, reject) => {
            const data = { id: id, firstname: "John", lastname: "Doe" };
            const sql = "REPLACE INTO test_table SET ?";
            conn.query(sql, data, (err) => {
                if (err) { return reject(err); }
                return resolve("Data updated successfully.");
            })
        });
    },

    deleteData: (id) => {
        return new Promise((resolve, reject) => {
            const data = { id: id, firstname: "Jane", lastname: "Doe" };
            const sql = "DELETE FROM test_table where id = ?";
            conn.query(sql, id, (err) => {
                if (err) { return reject(err); }
                return resolve("Data deleted successfully.");
            })
        });
    }
};

module.exports = db;