const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 8888;

require('dotenv').config() 
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o6whk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db('Seller-list');
        const SellerCollection = database.collection('seller');

        app.get('/seller', async (req, res) => {
            const cursor = SellerCollection.find({});
            const seller = await cursor.toArray();
            res.json(seller);
        })
        app.get('/seller/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await SellerCollection.findOne(query);
            res.json(result)
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('api server on')
})

app.listen(port, () => {
    console.log('server is running', port);
})


// let object = [
//     {name:' steve jobs',sellerShop:'Sneker',number:'01700034345',img:'https://us.123rf.com/450wm/kzenon/kzenon1401/kzenon140100003/24893697-seller-or-car-salesman-in-car-dealership-presenting-his-new-and-used-cars-in-the-showroom.jpg?ver=6', address:'880C Esquimalt Rd, Victoria, BC V9A 3M4, Canada'},
//     {name:'Elon Mask',sellerShop:'Tesla',number:'01703034345',img:'https://i.ibb.co/hL3spZG/rsz-portrait-salesman-car-dealership-23-2148130118.jpg',address:' 3500 Deer Creek Road in Palo Alto, CA 94304.'},
//     {name:'Toni stark',sellerShop:'SpaceX',number:'01300034345',img:'https://i.ibb.co/J5sGbjs/rsz-car-salesman-formal-suit-talking-phone-against-white-background-car-salesman-formal-suit-talking.jpg',address:'1 Rocket Road in the East Hawthorne neighborhood, CA, Hawthorne, 90250.'},
//     {name:'Peter Parker',sellerShop:'Apple',number:'01707034345',img:'https://i.ibb.co/4TtD9yK/D-NQ-NP-611652-MLB42237911649-062020-O.jpg',address:'68/69, Concept Tower, Office No. 4/D, 3rd Floor, Green Rd, Dhaka 1209'},
//     {name:'Thomas shelvi',sellerShop:'Peaky Blinders',number:'01600034345',img:'https://i.ibb.co/VpWhtb9/rsz-4284.jpg'},
//     {name:'Tom Hardy',sellerShop:'Asus',number:'017320034345',img:'https://i.ibb.co/zGg8cZv/rsz-1gettyimages-814018976.jpg',address:'186 Yarmouth Road, Norwich, Norfolk, United Kingdom, NR7 0AD'}
// ]
