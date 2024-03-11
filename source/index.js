const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world from Tekton.....')
})

app.listen(4000, () => {
    console.log('listening for requests on port 4000')
})