const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

let produkOnglen = [
    {
        id: 1,
        name: "Topi",
        price: 5000,
        description: "Topi yang sangat keren",
        image: "/images/topi.jpg",
    },
    {
        id: 2,
        name: "Baju",
        price: 30000,
        description: "Baju trendy terkini hits",
        image: "/images/baju.jpg",
    },
    {
        id: 3,
        name: "Celana",
        price: 10000,
        description: "Celana yang sangat nyaman dipakai",
        image: "/images/celana.jpg",
    }
]

let keranjang = []

// validasi tambah product
const validateProduct = (product) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
  })

  return schema.validate(product)
}


app.get('/', (req, res) => {
  res.send('Selamat Datang di Toko onglen')
})


// route product

// get all data product
app.get('/product', (req, res) => {
  const name = req.query.name

    if(name){
      const product = produkOnglen.find(product => product.name.toLowerCase() == name)

      if(!product) {
        res.status(404).json({
          messages: "Data Not Found"
        })
      }

      res.status(200).json({
        messages: "Success Get Detail Data",
        data: product
      })
    }

    res.status(200).json({
      messages: "Success Get All Data",
      data: produkOnglen
    })
})

// get detail product by id
app.get('/product/:id', (req, res) => {
  const id = req.params.id

  const product = produkOnglen.find(product => product.id == id)

  if(!product) {
    res.status(404).json({
      messages: "Data Not Found"
    })
  }

  res.status(200).json({
    messages: "Success Get Detail Data",
    data: product
  })

})

// add data product
app.post('/product', (req, res) => {
  const {name, description, price} = req.body

  const id = produkOnglen.length + 1;

  const {error} = validateProduct(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const image = req.files.image
  const filename = `${name}.jpg`

  image.mv(path.join(__dirname, 'public/images', filename))


  const newProduct = {
    id,
    name,
    description,
    price,
    image: `/images/${filename}`,
  }

  console.log(newProduct)

  produkOnglen.push(newProduct)

  res.status(201).json({
    messages: "Success Add Data",
    data: newProduct
  })
})

// edit product
app.put('/product/:id', (req, res) => {
  const id = req.params.id
  const {name, description, price} = req.body

  const {error} = validateProduct(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const product = produkOnglen.find(product => product.id == id)

  if(!product) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const fileNameOld = `${product.name}.jpg`
  product.name = name
  product.description = description
  product.price = price

  const image = req.files.image
  // const filename = `${name}.jpg`

  // image.mv(path.join(__dirname, 'public/images', filename))

  if(image) {
    try{
      fs.unlinkSync(path.join(__dirname, 'public/images', fileNameOld))
    }catch(err) {
      console.log(err)
    }
    const filename = `${name}.jpg`
    // image.mv(path.join(__dirname, 'public/images', filename))
    console.log(image.mv(path.join(__dirname, 'public/images', filename)))
    product.image = `/images/${filename}`
  }

  res.status(200).json({
    messages: "Success Update Data",
    data: product
  })
})

// delete product
app.delete('/product/:id', (req, res) => {
  const id = req.params.id

  const product = produkOnglen.find(product => product.id == id)

  if(!product) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = produkOnglen.indexOf(product)
  produkOnglen.splice(index, 1)

  res.status(200).json({
    messages: "Success Delete Data",
    data: product
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})