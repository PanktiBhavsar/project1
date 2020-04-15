const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Pankti'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Pankti'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Pankti'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(error, { lattitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Pankti Bhavsar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Pankti Bhavsar',
        errorMessage: 'Page not found.'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
