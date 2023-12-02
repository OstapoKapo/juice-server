const {error} = require('console');
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
const Products = require('./modules/products-model');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}))

app.get('/api', async (req,res) => {
 res.json( await Products.find({}));
})

const uri = `mongodb+srv://ostapokapo:${process.env.TOKEN}@cluster.jrvydh9.mongodb.net/?retryWrites=true&w=majority`
console.log(process.env.TOKEN)
mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected');
})

db.on('error', () => {
    console.error(`MongoDB connection error: ${error}`)
})


app.post('/getProducts', async(req, res) => {
        try{
            const prodcutsList = await Products.find({});
            res.send(prodcutsList);       
        }
        catch(error) {
            console.log(error);
            res.sendStatus(404)
        }
});


app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})

