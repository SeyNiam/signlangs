import {useCallback} from 'react';
import {err} from '../components/Toast';
//import {notify} from "../components/Toast";

export const useMessage = () => {
    return useCallback((text, type='ВНИМАНИЕ!') => {
        if(text){
            if(type==='')
                type = 'ВНИМАНИЕ!';
            err(text, type);
            //notify(text);
            //err(text);
            console.log('message.hook (FROM SOMEWHERE ELSE):' + text);
        }
    }, [])
}