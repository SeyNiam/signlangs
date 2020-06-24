import React from "react";
import Sidebar from "../components/Sidebar"
import {NavLink} from "react-router-dom";

export  const  IntroductionPage = () =>{
return (
    <div>
    <table width={"100%"}>
        <thead/>
        <tbody>
        <tr>
            <td rowSpan={2} width={"25%"}>
                <Sidebar/>
            </td>
            <td className={"introduction"} width={"90%"}>
                <h2>Введение</h2>
                <section>
                    &emsp; По данным Всемирной организации здравоохранения от 20 марта 2019 года в мире насчитывается 466 миллиона человек с инвалидизирующей потерей слуха, из них 34 миллиона детей. По данным Всемирной федерации глухих, более 80% из них живут в развивающихся странах. При этом большинство нормально слышащих людей не знает ЖЯ. Это обстоятельство создает большие трудности в процессе их общения с людьми, имеющими ограничения по слуху.
                </section>
                <section>
                    &emsp; В среднем в мире число полностью глухих составляет 0,4% от общей численности населения, а учитывая людей с тяжелыми формами потери слуха, число тех, кто постоянно пользуется ЖЯ, достигает примерно 1,5% от общей численности населения. Например, в США по данным ASLTA (Ассоциация преподавателей американского жестового языка) американ-ский жестовый язык (ASL) – третий по распространенности после английского и испанского.
                </section>
                <section>
                    &emsp; Официальное признание ЖЯ начал получать лишь недавно. Отношение к нему в разных странах со стороны официальных органов (в том числе и образования) до недавнего времени колебалось от игнорирования его существования до активного запрета в использовании, например, в образовательных учреждениях для глухих. Это объяснялось необходимостью стимулирования изучения и использования глухими средств коммуникации со слышащими: слухо-зрительного восприятия речи, формирования произношения и развития речи для лучшей адаптации в мире слышащих. Но постепенно, по мере изменения отношения общества к инвалидам, эта позиция менялась. В Резолюции ООН 48/96 указано: “Следует позаботиться о том, чтобы язык жестов применялся для обучения глухих детей, в их семьях и общинах. Следует также предоставлять услуги по сурдопереводу, с тем чтобы способствовать общению глухих с другими людьми”.
                </section>
                <section>
                    &emsp; В нашей стране русский жестовый язык (РЖЯ) сравнительно недавно официально признан языком межличностного общения. Этот статус ниже, чем статус национального языка, и, возможно, этим объясняется, что, в то время как для изучения языков малых народов организуются научные экспедиции, ЖЯ, которым в России пользуются по примерным оценкам не менее 2 млн. человек, не имеет даже достаточно полного описания грамматики.
                </section>
                <section>
                    &emsp; Первые попытки описания ЖЯ делались в Европе уже в 17 веке. В России первой книгой об обучении глухих, о русском жестовом языке была книга Флери В.И. «Глухонемые, рассматриваемые в отношении к способам образования, самым свойственным их природе.». Однако сложность представления с помощью статичных двумерных книжных иллюстраций динамически меняющихся во времени и пространстве жестов оказалась препятствием для создания научного описания РЖЯ. Если в иероглифах (которым, с определенной степенью допущения, можно уподобить жесты), например, японского языка выделяются ключевые элементы, на основании которых строятся словари, то в жестах выделения подобных ключевых элементов (или конфигураций) недостаточно. Работы В. Стоку, выполненные в США в 60-е годы XX века, показали, что жест состоит из трех основных компонентов: конфигурации, пространственного положения и движения.
                </section>
                <section>
                    &emsp; Бумажные словари при всей их полезности, не могут отразить все особенности выполнения отдельных жестов и помочь в составлении фраз на РЖЯ. Появление мультимедийных средств дало возможность, используя технику видеозаписи, создавать обучающие курсы жестового языка, в которые включаются уже не только отдельные понятия (жесты), но и образцы фраз и диалогов.
                </section>
                <section>
                    &emsp; Таким образом, только с появлением видеотехники и мультимедийных компьютеров ЖЯ получил возможность записи текста, т.е. обрел письменность и, соответственно, возможность фиксации и многократного воспроизведения жестовых высказываний, анализа и углубленного изучения их грамматических и других особенностей.
                </section>
                <button className={"next"}>
                    <NavLink to="/learning/lessons" className={"butnav"}>
                        Далее
                    </NavLink>
                </button>
            </td>
        </tr>
        </tbody>
        <tfoot/>
    </table>
    </div>
)};
