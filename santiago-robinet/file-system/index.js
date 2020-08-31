const express = require('express');
const { readdirSync } = require('fs');
const fileManagement = require('./file.management');

const app = express();
const port = 4200;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(`${__dirname}/public/`))

app.get('/', (req, res) => {
    fileManagement.getAllFiles((error, data) => {
        res.render('pages/index',{
            articles: data,
            content: null,
            selectedFile:null
        })
    })
})

app.get('/data/:file', (req, res) => {
    const files = readdirSync('./data');
    const data = fileManagement.getFile(req.params.file);
    res.render('pages/index', {
        articles: files,
        content: data,
        selectedFile: req.params.file
    })
})

app.post('/new-file', (req, res) => {
    fileManagement.createFileSafe(req.body.filename);
    res.redirect(`/data/${req.body.filename}`)
})

app.post('/save-file', (req, res) => {
    fileManagement.saveFile(req.body.filename,req.body.contents)
    res.redirect(`/data/${req.body.filename}`)
})

app.listen(port, () => console.log(`SERVER IS RUNNING IN PORT ${port}`));

