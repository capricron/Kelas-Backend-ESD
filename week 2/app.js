const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/', (req, res) => {
    res.send('Got a PUT request at /')
  })

app.delete('/', (req, res) => {
    res.send('Got a DELETE request at /')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})