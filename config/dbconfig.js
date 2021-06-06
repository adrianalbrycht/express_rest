const dotenv = require("dotenv");

dotenv.config();

const {
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";


module.exports = {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    encrypt: sqlEncrypt,
    enableArithAbort: true
};
