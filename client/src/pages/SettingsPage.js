import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";






const username='Pe5ha';






export  const  SettingsPage = () => {
    const{request} = useHttp();
    const message = useMessage();

    const [cform, setForm] = useState({
        uname: username, currPass: '', newPass: ''
    });

    const cchangeHandler = event => {
        setForm({...cform, [event.target.name]:event.target.value})
    }

    const changeP = async () => {
        try{
            const data = await request('/api/settings/setchange', 'POST', {...cform});
            await message(data.message, 'ГОТОВО!');
        } catch (e) {}
    }

    return (
        <div className={'settings'}>
            <br/>
            <form id={"cform"} className={"changePass"}>
                <p> Имя: {username} <br/></p>
                <input
                    type={'password'}
                    id={'currPass'}
                    name={'currPass'}
                    placeholder={'Текущий пароль'}
                    value={cform.currPass}
                    onChange={cchangeHandler}
                /><br/>
                <input
                    type={'password'}
                    id={'newPass'}
                    name={'newPass'}
                    placeholder={'Новый пароль'}
                    value={cform.newPass}
                    onChange={cchangeHandler}
                /><br/>
            </form>
            <button
                className={"butChangePass"}
                onClick={changeP}
            >
                Сменить пароль
            </button>
        </div>
)
};
