const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middlewware 
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.etpgxye.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const catagoryCollections = client.db('kidsPlace').collection('catagorys');
        const postedToysCollections = client.db('kidsPlace').collection('toys');





        app.get('/catagory/:text', async (req, res) => {
            let cursor;
            if (req.params.text === "car" || req.params.text === "truck" || req.params.text === "police") {
                cursor = catagoryCollections.find({ sub_category: req.params.text });
            } else {
                cursor = catagoryCollections.find();
            }

            const result = await cursor.toArray();
            res.send(result);
        });
        // for shop category end here

        app.post('/toys', async (req, res) => {
            const body = req.body;
            console.log(body);
            const result = await postedToysCollections.insertOne(body);
            res.send(result);
            console.log(result);
        });
        // insert add a toy using form 
        app.get('/toys', async (req, res) => {
            const cursor = postedToysCollections.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        // show add toy in all toy 

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();

//         

//         app.get('/catagory/:text', async (req, res) => {
//             let cursor;
//             if (req.params.text === "car" || req.params.text === "truck" || req.params.text === "police") {
//                 cursor = catagoryCollections.find({ sub_category: req.params.text });
//             } else {
//                 cursor = catagoryCollections.find();
//             }

//             const result = await cursor.toArray();
//             res.send(result);
//         });
//         // for shop category end here

//         app.post('/toyadded', async (req, res)=>{
//             const body = req.body;
//             console.log(body);
//             const result = await postedToysCollections.insertOne(body);
//             console.log(result);

//             res.send(result);
//         });
//         // for add a toy end here 




//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Kids Place is running')
})
app.listen(port, () => {
    console.log(`kids place is  running on port ${port}`);
})
