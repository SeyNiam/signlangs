import React from "react";

const welcome = `Добро пожаловать в SignLangs!`;
const whyneed = `Зарегистрируйтесть, чтобы начать своё приключение в увлекательном мире жестов!`;

class Description extends React.Component{
    render(){
        return(
            <div>
                <h2 className={"subtitle"}>{welcome}</h2>
                <br/>
                <section>
                    &nbsp;&nbsp; Это приложение создано, чтобы помочь вам в изучении жестовых языков совершенно бесплатно!<br/>
                    &nbsp;&nbsp; Обучение происходит в формате игры, так что вам никогда не станет скучно учиться новому.<br/>
                    &nbsp;&nbsp; Система достижений и рейтинговая таблица учащихся помогут вам сохранить мотивацию,
                    а на форуме вы сможете пообщаться с другими учениками и, быть может, даже завести новых друзей.
                </section>
                <section>
                    &nbsp;&nbsp; {whyneed}
                </section>
            </div>
        );
    }
}

export default Description;
