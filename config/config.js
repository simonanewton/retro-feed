require("dotenv").config();

module.exports = {
    "development": {
        "username": process.env.db_username,
        "password": process.env.db_password,
        "database": process.env.db_database,
        "host": process.env.db_host,
        "port": process.env.db_port,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.db_username,
        "password": process.env.db_password,
        "database": process.env.db_database,
        "host": process.env.db_host,
        "dialect": "mysql"
    }
}
