const Sequelize = require('sequelize');
const config = require('config');
const mysql = require('mysql2');
const HOST = config.get('host') || "localhost";
const DB = config.get('db') || "signlangs";
const DBPORT = config.get('dbport') || 3306;

const express = require('express');
const app = express();
app.use('/api/auth', require('./routes/auth.routes'));

const sequelize = new Sequelize(DB, "root", "1234", {
    dialect: "mysql",
    host: HOST,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});
setUpConnection();

const User = sequelize.define("user", {
    iduser: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    userban: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    useradmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false
    },
    userpass: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    userexp: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
        allowNull: true
    }
});

module.exports = User;

function  setUpConnection() {
    const connection = mysql.createConnection({
        host: HOST,
        user: "root",
        database: DB,
        password: "1234"
    });
    connection.connect(function(err){
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else{
            console.log("Подключение к серверу MySQL успешно установлено");
        }
    });
    // синхронизация с бд, после успшной синхронизации запускаем сервер
    sequelize.sync()
        .then(()=>{
            app.listen(DBPORT, function(){
                console.log("Сервер ожидает подключения...");
            });
        })
        .catch(err=>console.log(err));
};