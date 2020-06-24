import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";

import Titles from "../components/Titles";
import StartLang from "../components/StartLang";
import Description from "../components/Description";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export  const  AuthPage = () =>{
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '', userpass: ''
    });
    const [lform, lsetForm] = useState({
        llogin: '', lpass: ''
    });

    useEffect(() => {
        //console.log('Error Auth.page:', error);
        // если меняется объект error, то показывается в message
        message(error);
        clearError();
    }, [error, message, clearError]);

    // handler потому что метод для изменяющегося параметра
    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    }
    const lchangeHandler = event => {
        lsetForm({...lform, [event.target.name]:event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form});
            await message(data.message, 'ГОТОВО!'); //хорошо бы это юзеру вывести как тост (message hook)

            await auth.login(data.token, data.userId);
            // await console.log('что-то произошло??');

        } catch (e) {}

        // try{
        //     const data = await request('/api/auth/login', 'POST', {...form});
        //     await auth.login(data.token, data.userId);
        // } catch (e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...lform});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
    <div>
        <table width={"100%"}>
            <thead/>
            <tbody>
        
            <tr>
                <td><br/></td>
            </tr>
        
            <tr>
                <td width={"3%"} rowSpan={2}> </td>
                <td width={"57%"}><Titles /></td>
                <td width={"40%"}><StartLang /></td>
            </tr>
            <tr>
                <td width={"57%"}>
                    <Description/>
                </td>
                <td width={"40%"}>
                    <div className={"forms"}>
                        <form id={"lform"} className={"form"}>
                            <h2>Вход</h2>
                            <input
                                autoFocus={true}
                                type={"text"}
                                placeholder={"Логин"}
                                name={"llogin"}
                                id={"llogin"}
                                value={form.username}
                                onChange={lchangeHandler}
                            /><br/>
                            <input
                                type={"password"}
                                placeholder={"Пароль"}
                                name={"lpass"}
                                id={"lpass"}
                                value={form.userpass}
                                onChange={lchangeHandler}
                            /><br/><br/>
                            <button
                                className={"ok"}
                                type={"submit"}
                                value={"ok"}
                                onClick={loginHandler}
                                //onClick={alert('to next page, you`ll fix it later')}
                                disabled={loading} //если грузится, то кнопка заблочена
                            >
                                OK
                            </button>
                        </form>
                        <br/>
                        <form id={"form"} className={"form"}>
                            <h2>Регистрация</h2>
                            <input
                                type={"text"}
                                placeholder={"Логин"}
                                name={"username"}
                                id={"username"}
                                value={form.username}
                                onChange={changeHandler}
                            /><br/>
                            <input
                                type={"password"}
                                placeholder={"Пароль"}
                                name={"userpass"}
                                id={"userpass"}
                                value={form.userpass}
                                onChange={changeHandler}
                            /><br/>
                            <input type={"password"}
                                   placeholder={"Повторите пароль"}
                                   name={"rspass"}
                            /><br/><br/>
                            <button
                                className={"ok"}
                                type={"submit"}
                                onClick={registerHandler}
                                disabled={loading} //если грузится, то кнопка заблочена
                                value={"ok"}
                            >
                                OK
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            </tbody>
            <tfoot/>
        </table>
    </div>
    )
};
