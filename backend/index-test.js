
const express = require('express')

const PORT = 4000

const app = express()


app.get('/', () => {
    res.send('home')
})


app.listen(PORT, 'localhost', () => {
    console.log('Run run 4000 !')
})