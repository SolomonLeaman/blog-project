import express from "express";
const router = express.Router()

const articles = [];
const testArticle = {
    title: 'Title',
    date: '2023-12-10',
    time: '21:39',
    desc: 'This is a test description for a test article.',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

const testArticle2 = {
    title: 'Second Title',
    date: '2023-12-11',
    time: '22:00',
    desc: 'This is a test description for a second test article.',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}
articles.push(testArticle)
articles.push(testArticle2)

router.get('/new', (req, res) => {
    res.render('new.ejs', {articles: articles})
})

router.get('/', (req, res) => {
    res.render('index.ejs', {articles: articles})
    articles.sort((b, a) => a.time - b.time);
})

router.get('/edit/:articleID', (req,res) => {
    let articleTitle = req.params.articleID
    const articleIndex = articles.findIndex((article => article.title === articleTitle))

    let title = articles[articleIndex].title
    let date = articles[articleIndex].date
    let time = articles[articleIndex].time
    let desc = articles[articleIndex].desc
    let post = articles[articleIndex].post
    
    res.render('edit', {title, date, time, desc, post})
  })

router.get('/:articleID', (req, res) => {
    let articleTitle = req.params.articleID
    const articleIndex = articles.findIndex((article => article.title === articleTitle))

    let title = articles[articleIndex].title
    let date = articles[articleIndex].date
    let time = articles[articleIndex].time
    let desc = articles[articleIndex].desc
    let post = articles[articleIndex].post
    
    res.render('show', {title, date, time, desc, post})
  })

router.put('/edit/:articleID', (req, res) => {
    const articleTitle = req.params.articleID
    const articleIndex = articles.findIndex((article => article.title === articleTitle))
    
    articles[articleIndex].title = req.body.title
    articles[articleIndex].date = req.body.date
    articles[articleIndex].time = req.body.time
    articles[articleIndex].desc = req.body.description
    articles[articleIndex].post = req.body.post

    res.redirect('/articles')
  })

router.post('/new', (req, res) => {
})

router.delete('/delete/:articleID', (req, res) => {
    const articleTitle = req.params.articleID
    const articleIndex = articles.findIndex((article => article.title === articleTitle))

    articles.splice(articleIndex, 1)
    res.redirect('/articles')
    
})

router.post('/', (req, res) => {
    const articleTitle = req.body.title
    const createdAtDate = req.body.date
    const createdAtTime = req.body.time
    const articleDesc = req.body.description
    const articlePost = req.body.post
    const postPreview = articlePost.substring(0, 250)
    
    let article = {
        title: articleTitle,
        date: createdAtDate,
        time: createdAtTime,
        desc: articleDesc,
        post: articlePost
    };
    articles.push(article);
    articles.sort((b, a) => a.time - b.time);
    
    res.render("index", {article: article, articles: articles, postPreview: postPreview}) 
})

export default router