import {request} from './request'
export function loginNet (name,password){
    return request({
        url:'/login',
        method:'post',
        params:{
            username:name,
            password
        }
    })
}