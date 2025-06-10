const mysql = require('mysql');

const db = mysql.createConnection({
    host: "login-pr.cxwuucc06ylh.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "kim13175",
    database: "login_pr",
});

db.connect();

module.exports = db; 