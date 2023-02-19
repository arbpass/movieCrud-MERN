require('dotenv').config();
const express= require('express');
const app= express();
const mongoose= require('mongoose');
const cors= require('cors');
require('./db/conn');
const movies= require('./models/movieSchema');
const router= require('./routes/router');

const port= 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, ()=> {
    console.log('server started');
})