const express = require('express');
const app = express();
const path = require('path');
const enforce = require('express-sslify')
const payRouter = require('./PayRouter.js');

const getReactFilePath = () => {
    let thisPath = __dirname
    let arrayPath = thisPath.split('/')
    arrayPath.pop()
    arrayPath.pop()
    return path.join(arrayPath.join('/'), 'client', 'build', 'index.html')
}

const getPublicFilesPath = () => {
    let shortenedUrl = getReactFilePath().split('/')
    shortenedUrl.pop()
    return shortenedUrl.join('/')
}

app.use(enforce.HTTPS({trustProtoHeader: true}))
app.use(payRouter);
app.use(express.static(getPublicFilesPath()))

app.get('/checkout', (req, res) => {
    res.sendFile(getReactFilePath())
});

app.get('*', (req, res) => {
    res.redirect('https://www.iredullc.com/checkout');
})

app.listen(process.env.PORT || 8080);