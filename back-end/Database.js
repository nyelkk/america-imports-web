const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test_america'
        });
    }

    connect() {
        console.log("Conectando ao banco de dados...");
        this.connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados: ' + err.stack);
                return;
            }
            console.log('Conexão bem-sucedida com o ID: ' + this.connection.threadId);
        });
    }


    query(sql, values, callback) {
        this.connection.query(sql, values, callback);
    } 
    // personalizei o query para ficar mais legivel e saber que o 
}
module.exports = Database;