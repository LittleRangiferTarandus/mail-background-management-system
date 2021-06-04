import {request} from './request'
export function menuNet ( ){
    return request({
        url:'/menus',
        method:'get',
        
    })
}