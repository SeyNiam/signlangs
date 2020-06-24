//import {useCallback} from 'react';
//import {useMessage} from 'message.hook';

// export const changePass = () => {
//     return useCallback((username, currPass, newPass) => {
//         User.findOne({where: {username: username}})
//             .then(user=>{
//                 if(user.userpass===currPass){
//                     connection.query("UPDATE user SET userpass=? WHERE username=?",
//                         [newPass, username]);
//                     console.log('Pass set to ', newPass);
//                 }
//                 else{
//                     console.log("Неверный пароль. Пожалуйста, повторите попытку.");
//                 }
//             }).catch(err=>console.log(err));
//     }, [])
// }

/*
const config = require('config');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const HOST = config.get('host') || "localhost";
const DB = config.get('db') || "signlangs";

const sequelize = new Sequelize(DB, "root", "1234", {
    dialect: "mysql",
    host: HOST,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});
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
sequelize.sync();
*/



export function changePass(username, currPass, newPass) {
    User.findOne({where: {username: username}})
        .then(user=>{
            if(user.userpass===currPass){
                connection.query("UPDATE user SET userpass=? WHERE username=?",
                    [newPass, username]);
                console.log('Pass set to ', newPass);
            }
            else{
                console.log("Неверный пароль. Пожалуйста, повторите попытку.");
            }
        }).catch(err=>console.log(err));
}




