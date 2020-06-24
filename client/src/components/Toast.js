import React from 'react';
import './Toast.css'
import styled from 'styled-components';
import ee from 'event-emitter'

import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/error.svg';
import infoIcon from '../assets/info.svg';
import warningIcon from '../assets/warning.svg';

const warningColor = '#f0ad4e';
const infoColor = '#5bc0de';
const errorColor = '#d9534f';
const checkColor = '#5cb85c';
var col = warningColor;

const Container = styled.div`
    padding: 16px;
    position: fixed;
    top: ${props => props.top}px;
    right: 16px;
    transition: .3s ease;
    opacity: .9; 
    font-size: 14px;
    box-sizing: border-box;
    z-index: 999999;
`;
const emitter = new ee();

const notifTimeout = 3000; //3000ms = 3s

let message, title, icon;
export function err(mes, tit='ВНИМАНИЕ!') {
    title = tit;
    switch (title) {
        case 'ВНИМАНИЕ!':
            icon = warningIcon; col = warningColor; break;
        case 'ВАЖНО!':
            icon = infoIcon; col = infoColor; break;
        case 'ОШИБКА!':
            icon = errorIcon; col = errorColor; break;
        case 'ГОТОВО!':
            icon = checkIcon; col = checkColor; break;
        default: icon = warningIcon; break;
    }
    message = mes;
    notify(mes);
}
export const notify = (msg) => {
    emitter.emit('notification', msg);
}

export default class Toast extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            top: -100,
            msg: '',
        };
        this.timeout = null;
        emitter.on('notification', (msg) => {
            this.onShow(msg);
        })
    }
    onShow = (msg) => {
        if(this.timeout){
            clearTimeout(this.timeout);
            this.setState({top: -100}, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(msg);
                }, 500);
            })
        } else {
            this.showNotification(msg);
        }
    }
    showNotification = (msg) => {
        this.setState({
            top: 16,
            msg,
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -100
                })
            }, notifTimeout)
        })
    }
    close = () => {
        this.setState({
            top: -100,
        })
    }

    render() {
        return (
            <Container top={this.state.top} className={"notification-container"}>
                <div id={"Tt"} className={"notification toast"} style={{background: col}}>
                    <button onClick={this.close}>
                        X
                    </button>
                    <div className="notification-image">
                        <img src={icon} alt="" />
                    </div>
                    <div>
                        <p className="notification-title">{title}</p>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            </Container>
        );
    }
}
