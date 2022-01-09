const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engines and viewspath and partialpath
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory path to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "WinterRain: Smart Weather App",
        tagline: "Your companion always with you",
        name: "Ankit",
        year_designed: 2022
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About WinterRain",
        tagline: "Hi, You are on the smartest available weather app. Get weather updates about the are you are living or get updates of the are of you loved ones. Thinking about going for a tour, plan well in advance about the accessories gaining insight today to not go there and get surprising weather.",
        name: "Ankit",
        year_designed: 2022
    })
})

app.get('/references', (req, res) => {
    res.render('references', {
        title: "Where I got the idea from?",
        name: "Ankit",
        year_designed: 2022,
        course_url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
        geocode: "https://www.mapbox.com/",
        weather_api: "https://weatherstack.com/"
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Get In Touch",
        tagline: "Get faster response within 24 hours",
        name: "Ankit",
        year_designed: 2022,
        phone: "+91-1234567890",
        facebook: "WinterRain: We care about your plans",
        email_id: " contact.winterrain@outlook.com"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'Location cannot be empty'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Please provide a valid location to get the weather forecast'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Please provide a valid location to get the weather forecast'
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term provided'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Ankit",
        year_designed: 2022,
        tagline: 'Help article not found!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: "Ankit",
        year_designed: 2022
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})