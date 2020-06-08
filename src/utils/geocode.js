const request = require('request');
require('dotenv').config()

const geocode = (add,callback) => {
    const API_KEY = process.env.GEOCODE_API_KEY
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=${API_KEY}`
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