const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const conn = require('./db/conn')
const User = require('./models/User')

app.use(
    express.urlencoded({
        extended: true,
    })
)


app.engine('handlebars',  exphbs.engine())
app.set('view engine', 'handlebars');


app.get('/', async (req, res) => {

    const users = await User.findAll({ raw: true })

    console.log(users)

    res.render('home', {users})
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where: { id: id}})

    res.render('usershow', {user})

})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id

    await User.destroy({where: {id: id}})

    res.redirect('/')

})

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

conn.sync().then(() => {
        app.listen(3000)
})
  .catch((err) => console.log(err))