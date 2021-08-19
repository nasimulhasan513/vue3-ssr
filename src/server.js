const express = require('express')

const server = express()

server.get('*',(req,res)=>{
    const html = `
    <html>
    <head><title>Hello World</title></head>
    <body>
    Hello World
    </body>
    </html>
    `
    res.end(html);
})


server.listen(8080)