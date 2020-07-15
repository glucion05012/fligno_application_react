const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})

app.use(express.static('public/src/index.js'))