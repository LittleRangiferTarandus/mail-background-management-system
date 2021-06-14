import {request} from './request'
export function getStatistic (){
    return request({
        url:'reports/type/1',
        method:'get',
    })
}