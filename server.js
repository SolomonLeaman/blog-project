import express from "express";
import articleRouter from "./routes/articles.js";
import methodOverride from 'method-override'

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    res.redirect('/articles')
    res.render('index.ejs', )
})

app.use('/articles', articleRouter)
app.listen(port, () => {
    console.log("Listening on 3000...")
});