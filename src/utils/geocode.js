const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hyZWV2YXRzYWJoYXQiLCJhIjoiY2tvOXM0NjhnMHZ4MTJxcWt3ZDQ5bzIzZiJ9.xBXI1vMLzFUPPm_Q-jwN1w&limit=1'
    request({url  , json:true}, (error, {body}) => {
        if (error){
            callback('uanable to connect location service', undefined)
        } else if(body.features.length==0){
            callback('unable to find the location', undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name,
                address : body.features[0].text

            })
        }

    })
}

module.exports = geocode