const baseModule = require('hbs');
const request = require('request');
const constants = require('../config');

const weatherdata = (address,callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address)+ '&appid=' + constants.openWeatherMap.SECRET_KEY
    request({url, json:true},(error,body)=> {
       // console.log("body",body);
        if(error){
            callback("Cannot fetch data from weather map API", undefined)    
        }else{
            callback(undefined,body)
        }
    })

}
module.exports = weatherdata;