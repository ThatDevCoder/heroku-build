const request = require('request');

forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e598625c82eef882e22cc8a3fe24526d&query=${latitude},${longitude}`

    request({url,json:true},(error,{body}) => {
        if(error) { 
            callback('Unable to connect to internet')
        } else if(body.error){
            callback('You have entered a wrong place')
        } else {
            callback(undefined,{
                location: body.location.name,
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            })
        }
    })
}



module.exports = {
    forecast:forecast
}