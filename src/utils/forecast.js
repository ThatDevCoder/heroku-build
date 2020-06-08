const request = require('request');
require('dotenv').config()


forecast = (latitude,longitude,callback) => {
    const API_KEY = process.env.FORECAST_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`

    request({url,json:true},(error,{body}) => {
        if(error) { 
            callback('Unable to connect to internet')
        } else if(body.error){
            callback('You have entered a wrong place')
        } else {
            // console.log(body);
            
            callback(undefined,{
                location: body.location.name,
                country : body.location.country,
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            })
        }
    })
}



module.exports = {
    forecast:forecast
}