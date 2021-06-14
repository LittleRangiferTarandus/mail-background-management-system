import {request} from './request'
export function getOrder (data){
    return request({
        url:'/orders',
        method:'get',
        params:data
    })
}

export function searchOrder (data){
    return request({
        url:'/orders/'+data,
        method:'get',
    })
}

export function editOrder (data){
    return request({
        url:'/orders/'+data.order_id,
        method:'get',
        data:{
            is_send:data.is_send,
            order_pay:data.order_pay,
            order_price:data.order_price,
            order_number:data.order_number,
            pay_status:data.pay_status
        }
    })
}

