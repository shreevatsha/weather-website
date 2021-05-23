const request = require('request')



const forecast =(latitude,longitude,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=a9058dabff17084b0e8a9ebcf010e5f7&query='+latitude+','+longitude
    request({url, json:true}, (error,{body}) => {                    //callback function
         if(error){
            callback("unable to connect location service",undefined)
        }
        else if(body.error){
            callback("unable to find location",undefined)
        }
        else {
            callback(undefined,'Current temperature of ' +body.location.region+' is '+body.current.temperature)
            {
                latitude,
                longitude
            }
        }
    })
}

module.exports=forecast