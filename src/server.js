const path = require('path')
const express = require('express')
const { createSSRApp } = require('vue')
const {renderToString } = require('@vue/server-renderer')
const manifest = require('../dist/manifest.json')
const server = express()
const appPath = path.join(__dirname, '../dist', manifest['app.js'])
const App = require(appPath).default

server.use('/img',express.static(path.join(__dirname, '../dist','img')))
server.use('/css',express.static(path.join(__dirname, '../dist','css')))
server.use('/js',express.static(path.join(__dirname, '../dist','js')))
server.use('/favicon.ico',express.static(path.join(__dirname, '../dist','favicon.ico')))

server.get('*',async (req, res) => {
    const app = createSSRApp(App)
    const appContent = await renderToString(app)
    const html = `
    <html>
    <link rel="stylesheet" href="${manifest['app.css']}"/>
    <head><title>Hello World</title></head>
    <body>
   ${appContent}
    </body>
    </html>
    `
    res.end(html);
})


server.listen(8080)