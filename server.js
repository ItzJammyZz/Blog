const express = require('express')
const mongoose = require("mongoose")
const Article = require('./models/article')
const articleRouter = require('./Routes/articles')
const methodOverride = require('method-override')
const app = express()

var uri = 'mongodb://127.0.0.1/test'



mongoose.set('strictQuery', true)

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true 
})

.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded ({ extended: false })) //Asking to access our form parameter in our articles.js 
app.use(methodOverride ('_method')) // This allow you to call method like POST, GET and DELETe

app.get ('/', async (req, res) => {
    const articles = await Article.find().sort({ 
        createdAt: 'desc'})
   res.render('articles/index', { articles: articles })
})
   //    res.send('Hello Baby') We do this to test if our server work 

app.use('/articles', articleRouter)

app.listen(5000)