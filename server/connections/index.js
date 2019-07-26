const mysql = require('mysql')

const conn = mysql.createConnection(
    {
        user:'book_world',
        password:'K3nnymysql',
        host:'127.0.0.1',
        database: 'book_world',
        port: 3306
    }
)

module.exports = conn