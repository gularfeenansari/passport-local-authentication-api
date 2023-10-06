// Importing libraries
require('dotenv/config')
const express = require('express');
const app = express();
const session = require('express-session');





app.use(express.json());//middleware parses incoming requests with JSON payloads

app.use(require('./routes/route'));

//creating Server
app.listen(process.env.port,()=>{
    console.log(`Server running at port ${process.env.port}`);
});
