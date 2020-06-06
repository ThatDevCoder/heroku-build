const request = require('request');

const geocode = (add,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=pk.eyJ1Ijoic3Vja2luYXRvciIsImEiOiJja2Iwb200d3EwYTBiMnZzOWNnaHVraTZsIn0.8Bd-NsvZrM_9zj7gqyMT0A`
    request({url,json:true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to internet')
        } else if(body.features.length === 0) {
            callback('You have entered a wrong place')
        } else {
            callback(undefined, {
                latitude :body.features[0].center[1],
                longitude :body.features[0].center[0],
                place_name :body.features[0].place_name,
            })
        }
    })
}

module.exports = {
    geocode:geocode
}