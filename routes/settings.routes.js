const {Router} = require('express');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();

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


/*
const jwt = require('jsonwebtoken');
try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
    if(!token){
        return res.status(401).json({message: 'Нет авторизации.'});
    }
    const decoded =jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
} catch (e) {
    return res.status(401).json({message: 'Нет авторизации.'});
}
 */


// /api/settings/setchange
/**
 * @swagger
 * path:
 *  /api/settings/setchange:
 *    post:
 *      responses:
 *        "200":
 *          description: Successful password change.
 *        "400":
 *          description: Incorrect data entered during password change.
 *        "500":
 *          description: Error during password change.
 *      tags:
 *          - user
 */
router.post(
    '/setchange',
    [
        check('uname', 'Некорректное имя.').exists(),
        check('currPass', 'Некорректный текущий пароль.').exists(),
        check('newPass', 'Некорректный новый пароль.').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Неверные данные при смене пароля."
                });
            }

            const {uname, currPass, newPass} = req.body;
            console.log('Логин и пароль получены');
            if (currPass!=='' && newPass!=='') {
                console.log('Не пустые. Устанавливается соединение с БД');
                console.log('Запрос к БД');
                User.findOne({where: {username: uname}})
                    .then(user=>{
                        if(!user) {
                            console.log('Юзер не найден');
                            res.status(400).json({errors: errors.array(),message: "Неверное имя."});
                            return;
                        }
                        else {
                            console.log('Юзер найден: ', user.iduser, user.username);
                            if(currPass !== user.userpass){
                                console.log('Пароль неверный!');
                                return res.status(400).json({message: "Неверный пароль. Пожалуйста, повторите попытку."});
                            }
                            else{
                                console.log('Пароль верный');

                                User.update({ userpass: newPass }, {
                                    where: {
                                        username: uname
                                    }
                                }).then((res) => {
                                    console.log(res);
                                }).catch(err=>console.log(err));

                                res.status(201).json({message: "Пароль успешно изменён!"});
                            }
                            return;
                        }
                    }).catch(err=>console.log(err));
            } else {
                console.log('Пустые: ', uname, currPass);
                res.status(400).json({errors: errors.array(), message: "Пожалуйста, заполните необходимые поля."});
            }
        } catch (e) {
            res.status(500).json({message: "Ошибка сервера. Пожалуйста, повторите попытку позже."});
        }
    });

module.exports = router;