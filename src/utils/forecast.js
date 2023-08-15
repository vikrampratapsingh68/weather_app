const request= require('request')

const forecast=(lati,longi,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7ba9e892ccc0af89496d9160c889644f&query='+lati+','+longi+'&units=m'

     request({ url,json:true},(error,{body})=>{
         if(error){
             callback('Unable to connect to internet',undefined)
         }
         else if(body.success===false){
             callback(response.body.error.info,undefined)
         }
        
         else{
            callback(undefined,'Today the temperature is :'+body.current.temperature+ ' degrees And it is '+body.current.precip+ ' % chance of rain')
         }   
     })
}

module.exports=forecast