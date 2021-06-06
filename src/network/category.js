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