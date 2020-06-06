const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Wather app',
        name: ' HomePage'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        about_me_prop: 'About Us',
        desc: 'carry OP',
        name: 'About Page'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title_prop:'Help',
        body_prop: 'This is body prop',
        name: ''
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You haven\'t entered the address'
        })
    }
    // console.log(req.query.address);

    geocode.geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({error})
        } else {
            forecast.forecast(data.latitude,data.longitude,(error,data) => {
                if(error){
                    return res.send({error})
                } else {
                    res.send([{
                        location: data.location,
                        temperature: data.temperature,
                        feelslike:data.feelslike
                }])
                }
            })
        }
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        //Here we are using res twice once below this commnt and one after console.log that's wht it gives us the error  Cannot set headers after they are sent to the client
        return res.send({
            error:"Please enter search"
        })
    } 
    // console.log(req.query.search);

    res.send({
        products : [{
            obj1 :  req.query.search
        }]
    })
})

app.get('/help/*',(req,res) => {
    res.render('default',{
        err: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('default',{
        err: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
    
})