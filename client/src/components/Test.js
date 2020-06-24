import React from "react"
import { NavLink } from "react-router-dom"

const answer = ['А', 'В', 'Ж', 'Е'];

export const Test = () => {

    return (
      <div>
        <div className={"navbar"}>
          <ul>
              <li><NavLink to="/test1" className={"active"}>Тест 1</NavLink></li>
              <li><NavLink to="/test1">Тест 2</NavLink></li>
              <li><NavLink to="/test1">Тест 3</NavLink></li>
          </ul>
        </div>
        <div className={"testform"}>
            <form>
              <table width={"60%"}>
                    <thead/>
                    <tbody>
                      <tr>
                        <td colSpan={2}><h2>Тест 1</h2></td>
                      </tr>
                      <tr>
                          <td colSpan={2}>
                              <iframe
                                  title={"vid"}
                                  width="560" height="315"
                                  src="https://www.youtube.com/embed/1wUw3FuFxyE?showinfo=0&autoplay=1&mute=1&loop=1&playlist=1wUw3FuFxyE"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen>
                                  Видео не поддерживается вашим браузером.
                              </iframe>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <input type={"radio"} name={"q1"} className={"radio"}/>{answer[0]}<br/>
                          <input type={"radio"} name={"q1"} className={"radio"}/>{answer[1]}
                        </td>
                          <td>
                              <input type={"radio"} name={"q1"} className={"radio"}/>{answer[2]}<br/>
                              <input type={"radio"} name={"q1"} className={"radio"}/>{answer[3]}
                          </td>
                      </tr>
                    </tbody>
                    <tfoot/>
                </table>
              </form>
        </div>
      </div>
      
    )
}

export default Test
