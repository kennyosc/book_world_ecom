const express = require('express')
const server = express()

const port = 2019

server.use(express.json())



server.listen(port, ()=>{
    console.log('Connected to port ' + port)
})