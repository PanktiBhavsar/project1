const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1'+ lattitude + longitude + '.'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined, body.list[0] + ' Here it is a list : ' + body.city.id + '.....' + body.city.name)
        }
    })
}

module.exports = forecast