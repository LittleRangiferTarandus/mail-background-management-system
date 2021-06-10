export function timeTransition (time) {
    const date = new Date(time)
    const y = date.getFullYear()
    const m = (date.getMonth()+1+'').padStart(2,'0')
    const d = (date.getMonth()+'').padStart(2,'0')
    const h = (date.getHours()+'').padStart(2,'0')
    const mm = (date.getMinutes()+'').padStart(2,'0')
    const ss = (date.getSeconds()+'').padStart(2,'0')
    return y+'-'+m+'-'+d+' '+h+':'+mm+':'+ss
}