const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/route');
require('dotenv').config();
const sequelize = require('./util/database');

const PORT = process.env.PORT || 4040;

// app.use(cors());

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); // handling forms

app.use(express.json()); //handling json objects

app.use(router);

app.listen(PORT,()=>console.log(`hey your server has started on port ${PORT}`.bgGreen));
