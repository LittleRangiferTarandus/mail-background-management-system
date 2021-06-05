import {request} from './request'
export function roleTableNet (data){
    return request({
        url:'roles',
        method:'get',
    })
}
export function roleGetNet (id){
    return request({
        url:'roles/'+id,
        method:'get',
    })
}

export function roleEditNet (data){
    return request({
        url:'roles/'+data.roleId,
        method:'put',
        data:{
            roleName:data.roleName,
            roleDesc:data.roleDesc
        }
    })
}

export function roleAddNet (data){
    return request({
        url:'roles/' ,
        method:'post',
        data:{
            roleName:data.roleName,
            roleDesc:data.roleDesc
        }
    })
}
export function roleDeleteNet (id){
    return request({
        url:'roles/' +id,
        method:'delete',
    })
}

export function roleDeletePowerNet (id){
    return request({
        url:`roles/${id.roleId}/rights/${id.powerId}`,
        method:'delete',
    })
}

export function powerTableTreeNet (){
    return request({
        url:'rights/tree',
        method:'get',
    })
}

export function powerAllcateNet (data){
    return request({
        url:`roles/${data.id}/rights`,
        method:'post',
        data:{
            rids: data.right
        }
    })
}