export const  isChildrenEmpty = (data, text, content) => {
    // return map of the component
    // or auxiliar text, case is empty
    return Object.keys(data).length === 0 === true ? text : content  
}
export const getFormatedDate = (dt) => {
    let data = new Date(dt),
    // console.log(data)
    // console.log(typeof(data))
    // console.log()
    dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear(),
    hour = ("0" + data.getHours()).slice(-2).toString(),
    minutes = ("0" + data.getMinutes()).slice(-2).toString(),
    seconds = ("0" + data.getSeconds()).slice(-2).toString();

    return diaF + "/" + mesF + "/" + anoF + " - " + hour + ":" + minutes //  31/12/1969 - 18:00

}

export const calculeTime = (dt) => {
    let data = new Date(dt),
    // console.log(data)
    // console.log(typeof(data))
    // console.log()
    dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear(),
    hour = ("0" + data.getHours()).slice(-2).toString(),
    minutes = ("0" + data.getMinutes()).slice(-2).toString(),
    seconds = ("0" + data.getSeconds()).slice(-2).toString();


    let horas = localStorage.getItem("horas");
    // console.log(horas)
    // let meia_hora = parseInt(horas) / 2;
    // let quinze_minutos = meia_hora / 2;
    // console.log(meia_hora, quinze_minutos)
    // let diaria =  parseInt(horas) * 24

    let value 
    for (let i =1; i < hour  ; i++ ){
        // console.log('***************',i)
        // console.log("+++", parseInt(horas)  + i)
        value = parseInt(horas)  + i
    }

    // return hour + ":" + minutes   + ":" + seconds //  18:00:00
    return value
}