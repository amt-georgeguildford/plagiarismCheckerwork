const idGenerator =(departmentid: string, idType: string)=>{
    const firstRandomNumber= Math.floor(Math.random()*10).toString()
    const secondRandomNumber= Math.floor(Math.random()*10).toString()
    const thirdRandomNumber= Math.floor(Math.random()*10).toString()

    const date= new Date()
    const year= date.getFullYear().toString().substring(2)
    const month = date.getMonth().toString().length==1? '0'+date.getMonth().toString(): date.getMonth().toString()
    const day= date.getDay().toString()? '0'+date.getDay().toString(): date.getDay().toString()
    if(idType==='student'){
        return `${departmentid}${firstRandomNumber}${secondRandomNumber}${thirdRandomNumber}ST${year}`
    }
    else if(idType==='lecturer'){

        return `${departmentid}${firstRandomNumber}${secondRandomNumber}${thirdRandomNumber}LT${year}`
    }
    else if(idType==='assignment'){
        return `ASS${firstRandomNumber}${secondRandomNumber}${thirdRandomNumber}${month}${day}`
    }
    else if(idType==='submission'){
        return `SUB${firstRandomNumber}${secondRandomNumber}${thirdRandomNumber}${month}${day}`
    }
}

export default idGenerator