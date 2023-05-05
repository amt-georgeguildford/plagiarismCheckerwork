const idGenerator =(departmentid: string, role: string)=>{
    const firstRandomNumber= Math.floor(Math.random()*10).toString()
    const secondRandomNumber= Math.floor(Math.random()*10).toString()
    const thirdRandomNumber= Math.floor(Math.random()*10).toString()

    const year= new Date().getFullYear().toString().substring(2)
    console.log(year)
    if(role==='student'){
        return `${departmentid}${firstRandomNumber}${secondRandomNumber}${thirdRandomNumber}ST${year}`
    }
    return `${departmentid}${firstRandomNumber}${secondRandomNumber}${thirdRandomNumber}LT${year}`
}

export default idGenerator