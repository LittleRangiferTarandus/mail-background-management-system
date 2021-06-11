import {request} from './request'
export function getCommodityList (data){
    return request({
        url:'/goods',
        method:'get',
        params:data
    })
}

export function deleteCommodity (data){
    return request({
        url:'goods/'+data,
        method:'delete',
    })
}

export function addCommodity (data){
    return request({
        url:'goods',
        method:'post',
        data
    })
}

export function searchCommodity (data){
    return request({
        url:'goods/'+data,
        method:'get',
    })
}

export function editCommodity (data){
    return request({
        url:'goods/'+data.id,
        method:'put',
        data
    })
}