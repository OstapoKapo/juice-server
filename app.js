const {error} = require('console');
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
const Products = require('./modules/products-model');
const BuyOrder = require('./modules/buyOrder-model');
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


app.post('/getDates', async(req, res) => {
        try{
            const prodcutsList = await Products.find({});
            const buyOrdersList = await BuyOrder.find({});
            res.send([prodcutsList,buyOrdersList]);       
        }
        catch(error) {
            console.log(error);
            res.sendStatus(404)
        }
});


app.post('/buyProducts', async(req, res) => {
    const inputData = req.body.inputValues;
    if(req.body.inputValues === ''){
       
    }else{
        const data = {
            name:req.body.itemName,
            amount: inputData.amountInp,
            price: inputData.priceInp,
            deliveryPrice: inputData.deliveryPriceInp,
            deliveryType: req.body.deliveryType,
        }
        try{
                const newBuyOrder = BuyOrder(data);
                newBuyOrder
                .save()
                .then((res) => {
                    console.log(res);
                });     
        }
        catch(error) {
            console.log(error);
            res.sendStatus(404)
        }
        let orderArr = await BuyOrder.find({});
                res
                .send(orderArr);    
    }
});


app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})

