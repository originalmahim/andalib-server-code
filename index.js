const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000 ;
require('dotenv').config()
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gvou2sg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

  app.get('/', (req, res) => {
    res.send('Hello Bangladesh!')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })