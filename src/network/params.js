import {request} from './request'
export function getParamList (id,sel){
    return request({
        url:`categories/${id}/attributes`,
        method:'get',
        params:{
            sel
        }
    })
}

export function addAttr (data){
    return request({
        url:`categories/${data.id}/attributes`,
        method:'post',
        data:{
            attr_name:data.attr_name,
            attr_sel:data.attr_sel,
            attr_vals:data.attr_vals
        }
    })
}
export function deleteAttr (data){
    return request({
        url:`categories/${data.id}/attributes/${data.attrid}`,
        method:'delete',
    })
}

export function getAttr (data){
    return request({
        url:`categories/${data.id}/attributes/${data.attrid}`,
        method:'get',
    })
}

export function editAttr (data){
    return request({
        url:`categories/${data.id}/attributes/${data.attrid}`,
        method:'put',
        data:{
            attr_name:data.attr_name,
            attr_sel:data.attr_sel,
            attr_vals:data.attr_vals
        }
    })
}