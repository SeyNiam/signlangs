import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";

export const Register = () => {
    const {loading, request} = useHttp(); // const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        username: '', userpass: ''
    });
// handler потому что метод для изменяющегося параметра
    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    }
    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data', data);
        } catch (e) {}
    }

    return(
        <div>
            <form className={"form"}>
                <h2>Регистрация</h2>
                <input
                    type={"text"}
                    placeholder={"Логин"}
                    name={"rlogin"}
                    onChange={changeHandler}
                /><br/>
                <input
                    type={"password"}
                    placeholder={"Пароль"}
                    name={"rpass"}
                    onChange={changeHandler}
                /><br/>
                <input type={"password"}
                       placeholder={"Повторите пароль"}
                       name={"rspass"}
                /><br/><br/>
                <button
                    type={"submit"}
                    onClick={registerHandler}
                    disabled={loading} //если грузится, то кнопка заблочена
                    value={"ok"}
                >
                    OK
                </button>
            </form>
        </div>
    );
}


/*
class Register extends React.Component{
    render(){

    }
}

function ok() {
    alert("hi you must be new");
}

export default Register;

 */