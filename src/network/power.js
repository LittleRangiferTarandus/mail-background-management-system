import {request} from './request'
export function powerTableNet (data){
    return request({
        url:'rights/list',
        method:'get',
    })
}

