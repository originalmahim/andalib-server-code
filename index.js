const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000 ;
require('dotenv').config()
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gvou2sg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const userFile = client.db('Totaluser').collection('UserInfos');

// api for getting total user information Start
app.get('/totalusers', async (req,res) => {
 try{
          const users = await userFile.find().toArray();
          res.send(users);
 }
 catch (error) {
   console.log(error);
   res.status(500).send('Internal Server Error')
 }
} )
// api for getting total user information End



// api for insert new user information to database Start
app.post('/totalusers', async (req,res) => {
          try {
                const newUser = req.body;
                const query = { email: newUser.email }
                const existingUser = await userFile.findOne(query);
                if (existingUser) {
                    //prevent add user information if already exists in database
          return res.send({ message: 'user already exists', insertedId: 1 })
                }
                const result = await userFile.insertOne(newUser);
                res.send(result)
          } catch (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
          }
       });
// api for insert new user information to database End




  app.get('/', (req, res) => {
    res.send('Hello Bangladesh!')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })