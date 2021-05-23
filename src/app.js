const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request=require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)



const app=express()
const port = process.env.PORT || 3000

// Define path for expree config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res) =>{
    res.render('index' , {
        title:'Weather',
        name:'shreevatsa'      
    })
})
app.get('/about' , (req,res) =>{
    res.render('about' , {
        title:'About weather' , 
        name :'Shreevatsha'
    })
})
app.get('/help' , (req,res)=>{
    res.render('help',{
        title : 'help for weather' , 
    name : 'shreevatsha'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide the address'
        })
    }
   
    geocode (req.query.address , (error,{latitude,longitude,location} ={}) =>{
        if(error){
            return res.send({error})
            }
            forecast(latitude,longitude ,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast :forecastData,
                    location ,
                    address: req.query.address,
                    latitude,
                    longitude
                })
            })
        }
    )
})

app.get('/help/*', (req,res) =>{
    res.render('404' , {
       title : '404',
        name : 'Shreevatsa',
        errorMessage : 'help article not found'
    })
})


app.get('*', (req,res) =>{
    res.render('404' , {
       title : '404',
        name : 'Shreevatsa',
        errorMessage : 'Page not found'
    })
})


// app.com
// app.com/help
// app.com/about

app.listen(port,()=>{
    console.log('app is running in port '+port)
})