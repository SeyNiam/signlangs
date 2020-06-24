import React, {useState} from "react";

/*
import {useHttp} from "../../hooks/http.hook";

const {loading, error, request} = useHttp();
const [form, setForm] = useState({
    username: '', userpass: ''
});
// handler потому что метод для изменяющегося параметра
const changeHandler = event => {
    setForm({...form, [event.target.name]:event.target.value})
}
const registerHandler = async () => {
    try{
        const data = await request('/api/auth/login', 'POST', {...form});

    } catch (e) {}
}
 */



class Login extends React.Component{
    render(){
        return(
            <div>
                <form id={"form"} className={"form"}>
                    <h2>Вход</h2>
                    <input
                        autoFocus={true}
                        id={"login"}
                        type={"text"}
                        placeholder={"Логин"}
                        name={"llogin"}
                        //onChange={changeHandler}
                    /><br/>
                    <input
                        id={"pass"}
                        type={"password"}
                        placeholder={"Пароль"}
                        name={"lpass"}
                        //onChange={changeHandler}
                    /><br/><br/>
                    <button
                        type={"submit"}
                        onClick={ok}
                        value={"ok"}
                        //disabled={loading} //если грузится, то кнопка заблочена
                    >
                        OK
                    </button>
                </form>
            </div>
        );
    }
}

function ok() {
    var login = document.getElementById("login").value;
    var pass = document.getElementById("pass").value;
    alert(`heeeeeeeyyyyyyyyy, ${login}! your pass is ${pass} btw`);
}

export default Login;