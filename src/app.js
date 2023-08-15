const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const app= express()
const port= process.env.PORT ||3000

//define paths for express config
const viewspath=path.join(__dirname,'../template/views')
const partialpath=path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setup static directory to serve 
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vikram pratap'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Vikram pratap singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'What can i help You',
        title:'Help',
        name:'Vikram pratap singh'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
             error:'you must provide a address'
         })
   }
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
       return res.send({error})
    }
    
       forecast(latitude,longitude, (error, forecastdata) => {
        if(error){
            return res.send({error})
        }
        res.send({
            address:req.query.address,
            forecast:forecastdata,
            location:location
        })   
        
      })
 })
   
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({
              error:'you must provide a search term'
          })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:'404 help',
         name:'Vikram pratap',
         errormessage:'Help article Not found'
     })
})

app.get('*',(req,res)=>{
      res.render('404',{
          title:'404',
          name:'Vikram pratap',
          errormessage:'Page Not Found'
      })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})
