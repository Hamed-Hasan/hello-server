const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojujfmz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
 const userCollection = client.db('newExpress').collection('product');
 app.get('/products', async (req, res) => {
    const result = await userCollection.find({}).toArray()
    res.send(result)
})



const doc = {
    title: "Record of a Shriveled Datum",
    content: "No bytes, no problem. Just insert a document, in MongoDB",
  }
  const result = await userCollection.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);




app.get('/product', async (req, res) => {
    res.send({
        name: 'jhon', 
        age: '12',
    })
})

app.get('/', async (req, res) => {
    res.send('basic setup')
})

app.listen(port, () => {
    console.log(`start server ${port}`)
})