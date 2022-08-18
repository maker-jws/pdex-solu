const express = require('express')
const app = express()
const methodOverride = require('method-override')

// APP CONFIG
const PORT = 4000
app.set('view engine', 'ejs')


// MIDDLEWARE 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// MODEL 
const pokemon = require('./models/pokemon')
// console.log(pokemon)


// CONTROLLER (ROUTES + VIEWS)
// index route
app.get('/pokemon', (req, res) =>{
    const reverse = req.query.reverse === 'true' ? true : false; 
    const allPokemon = req.query.reverse === 'true' ? [...pokemon].reverse(): pokemon;
    res.render('index', { pokemon: allPokemon, reverse })
} )

// new route
app.get('/pokemon/new', (req, res) => res.render('new'))

// show route
app.get('/pokemon/:id', (req, res) => res.render('show', { pokemon: pokemon[req.params.id], index: req.params.id }))

// edit route
app.get('/pokemon/:id/edit', (req, res) => res.render('edit', { pokemon: pokemon[req.params.id], index: req.params.id}))

// create route
app.post('/pokemon', (req, res) => {
    console.log(req.body)
    pokemon.push(req.body)
    res.redirect('/pokemon')
})

// destroy route
app.delete('/pokemon/:id', (req, res) => {
    const index = req.params.id
    pokemon.splice(index, 1)
    res.redirect('/pokemon')
})

// update route
app.put('/pokemon/:id', (req, res) => {
    const index = req.params.id
    pokemon[index] = req.body
    res.redirect('/pokemon/'+index)
})


// INITIALIZE SEVER
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))