import {request} from './request'
export function userListNet (data){
    return request({
        url:'/users',
        method:'get',
        params:{
            pagenum:data.pagenum,
            pagesize:data.pagesize,
            query:data.query
        }
    })
}
export function userStateChangeNet (data){
    return request({
        url:`/users/${data.id}/state/${data.mg_state}`,
        method:'put',
    })
}
export function userAddNet (data){
    return request({
        url:'/users',
        method:'post',
        data
    })
}

export function userGetNet (data){
    return request({
        url:`/users/${data.id}`,
        method:'get'
    })
}

export function userEditNet (data){
    return request({
        url:`/users/${data.id}`,
        method:'put',
        params:{
            mobile : data.mobile,
            email: data.email
        }
    })
}

export function userDeleteNet (id){
    return request({
        url:`/users/${id}`,
        method:'delete',
    })
}

export function userAllocateRoleNet (id,data){
    return request({
        url:`/users/${id}/role`,
        method:'put',
        data:{
          rid:data
        }
    })
}