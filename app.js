const Koa = require('koa')
const path =require('path')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const static = require('koa-static')


const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors())
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname,'./static')))

InitManager.initCore(app)

app.listen(3000)
