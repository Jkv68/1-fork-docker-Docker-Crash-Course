const axios = require('axios');
const express = require('express')

const app = express()

app.get('/', async (req, res) => {
    let image = await axios('https://source.unsplash.com/random');
    res.send(`<img src="${image.request.res.responseUrl}" />`)
    res.send("<h1>1551515221512515155</h1>")
})


app.listen((3333), () => {
    console.log("listening on port 333")
})