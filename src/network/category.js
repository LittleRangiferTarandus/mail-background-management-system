import {request} from './request'
export function getCategoryList (pagenum,pagesize,type){
    return request({
        url:'/categories',
        method:'get',
        params:{
            type,
            pagenum,
            pagesize
        }
    })
}

export function deleteCategory (id){
    return request({
        url:'/categories/'+id,
        method:'delete',
    })
}

export function getCategory (id){
    return request({
        url:'/categories/'+id,
        method:'get',
    })
}

export function editCategory (data){
    return request({
        url:'/categories/'+data.cat_id,
        method:'put',
        data:{
            cat_name:data.cat_name
        }
    })
}

export function addCategory (data){
    return request({
        url:'/categories',
        method:'post',
        data:{
            cat_name:data.cat_name,
            cat_pid:data.cat_pid,
            cat_level:data.cat_level
        }
    })
}