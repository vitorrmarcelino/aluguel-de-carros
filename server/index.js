const connectToDataBase = require('./database/db')
const express = require('express')
const app = express()

connectToDataBase(); 

app.listen(8000, ()=>{
    console.log('Server running on http://localhost:8080')
})