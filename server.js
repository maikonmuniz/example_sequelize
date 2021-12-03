const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const conn = require('./db/conn')

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');  


app.get('/', (req, res) => {

    const User = {
        'name': 'maikon'
    }

    const auth = true

    res.render('home', {User, auth});
});

app.listen(3000, () => {
    console.log('App funcionando');
});