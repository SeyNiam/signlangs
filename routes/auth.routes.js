const {Router} = require('express');
const bcript =  require('bcryptjs'); //кешировать и сравнивать пароли
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
//const User = require('../app'); //const User = require('../models/User'); // папка модули, скорее всего, не нужна уже
const router = Router();
//const err = require ('../client/src/components/Toast');

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

// /api/auth/register
/**
 * @swagger
 *
 * path:
 *  /api/auth/register:
 *    post:
 *      responses:
 *        "200":
 *          description: Successful registration.
 *        "400":
 *          description: Incorrect data entered during registration.
 *        "500":
 *          description: Error during registration.
 *      tags:
 *          - Все
 *
 */
router.post(
    '/register',
    [
        check('username', 'Имя должно быть 1-45 символов в длину.')
            .isLength({min: 1, max: 45}),
        check('userpass', 'Пароль должен быть 1-20 символов в длину.')
            .isLength({min: 1, max: 20})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Неверные данные при регистрации."
                })
            }
            createUser(req.body, res);
        } catch (e) {
            res.status(500).json({message: "Ошибка сервера. Пожалуйста, повторите попытку позже."});
        }
    });

// /api/auth/login
/**
 * @swagger
 *
 * path:
 *  /api/auth/login:
 *    post:
 *      responses:
 *        "200":
 *          description: Successful authorization.
 *        "400":
 *          description: Incorrect data entered during authorization.
 *        "500":
 *          description: Error during authorization.
 *      tags:
 *          - Все
 */
router.post(
    '/login',
    [
        check('llogin', 'Некорректное имя.').exists(),
        check('lpass', 'Некорректный пароль.').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Неверные данные при авторизации."
                })
            }
            // есть ли юзеры с таким именем
            const {llogin, lpass} = req.body;
            console.log('Логин и пароль получены');
            if (llogin!=='' && lpass!=='') {
                console.log('Не пустые. Устанавливается соединение с БД');
                console.log('Запрос к БД');
                User.findOne({where: {username: llogin}})
                    .then(user=>{
                        if(!user) {
                            console.log('Юзер не найден');
                            res.status(400).json({errors: errors.array(),message: "Неверное имя и/или пароль"});
                            return;
                        }
                        else {
                            console.log('Юзер найден: ', user.iduser, user.username);
                            if(lpass !== user.userpass){
                                return res.status(400).json({message: "Неверный пароль. Пожалуйста, повторите попытку."});
                            }
                            else{
                                console.log('Пароль верный');
                                // авторизация через jwt токен (потому что single page app)
                                const token = jwt.sign(
                                    {userId: user.iduser,
                                        userPass: user.userpass},
                                    config.get('jwtSecret'),
                                    {expiresIn: '1h'}
                                );
                                console.log('Токен: ', token);
                                res.json({token, userId: user.iduser});
                            }
                            return;
                        }
                    }).catch(err=>console.log(err));
            } else {
                console.log('Пустые: ', llogin, lpass);
                res.status(400).json({errors: errors.array(),message: "Пожалуйста, заполните необходимые поля."});
            }

        } catch (e) {
            res.status(500).json({message: "Ошибка сервера. Пожалуйста, повторите попытку позже."});
        }
    });

module.exports = router;



// Подтверждение создания пользователя
function yes(res, token, id) {
    console.log('Пользователь создан и сохранён');
    res.status(201).json({message: "Пользователь успешно создан!", token, userId: id});
}
function setUpConnection() {
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
    sequelize.sync();
    // .then(()=>{
    //     app.listen(DBPORT, function(){
    //         console.log("Сервер ожидает подключения...");
    //     });
    // })
    // .catch(err=>console.log(err));
}
function listUser() {
    return User.findAll({raw:true})
        .then(users=>{
            console.log(users);
            //return users;
        })
        .catch(err=>console.log(err));
}
function createUser(data, foryes) {
    const uname = data.username;
    const upass = data.userpass;
    console.log('Константы взяты');

    if(uname===''||upass===''){
        console.error('Пустые поля');
    }
    else{
        console.log('Поля не пустые');
        User.findOne({where: {username: uname}})
            .then(user=> {
                if (!user) {
                    console.log('Юзер не найден');
                    User.create({username: uname, userpass: upass})
                        .then(res => {
                            const user = {iduser: res.iduser, username: res.username, userpass: res.userpass};
                            console.log(user);
                            console.log('Пользователь создан');
                            //yes(foryes);


                            // авторизация через jwt токен (потому что single page app)
                            const rtoken = jwt.sign(
                                {userId: user.iduser},
                                config.get('jwtSecret'),
                                {expiresIn: '1h'}
                            );
                            console.log('Токен: ', rtoken);

                            //foryes.redirect('/lessons');
                            //foryes.json({rtoken, userId: user.iduser});
                            //foryes.send({rtoken, userId: user.iduser});

                            yes(foryes, rtoken, user.iduser);

                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    return;
                } else {
                    return foryes.status(400).json({message: "Пользователь с таким именем уже существует."});
                }

            })


    }
}
