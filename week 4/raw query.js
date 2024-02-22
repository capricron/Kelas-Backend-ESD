const express = require('express')
const app = express()
const port = 5000
const mysql = require('mysql')

var cors = require('cors')
 
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'olshop'
})

db.connect((err) => {
    if(err){
        throw err
    }
    console.log('Database connected')
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Belajar Database')
})

app.post('/product', (req, res) => {
   try{
    const {name, price ,description, category, stock} = req.body

    const query = `INSERT INTO product (name, price, description, category, stock) VALUES ('${name}', '${price}', "${description}", '${category}', '${stock}')`

    db.query(query, (err, result) => {
        if(err){
            throw err
        }
    })

    res.status(200).json({
        messages: "Success Add Data",
    })
   }catch(err){
    res.status(500).json({
        messages: err.message
    })
   }
})

app.get('/product', (req, res) => {

    const query = `SELECT * FROM product`

    db.query(query, (err, result) => {
        if(err){
            throw err
        }

        res.status(200).json({
            messages: "Success Get All Data",
            data: result
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})