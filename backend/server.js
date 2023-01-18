const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/route');
require('dotenv').config();

const PORT = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT,()=>console.log(`hey your server has started on port ${PORT}`));
