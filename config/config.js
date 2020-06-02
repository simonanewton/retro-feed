require("dotenv").config();

module.exports = {
    "development": {
        "username": "root",
        "password": "password",
        "database": "project_db",
        "host": "127.0.0.1",
        "port": 3306,
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
