const express = require('express');
const fs = require('fs');
const path = require('path');

const {logLineAsync} = require("../utils/log");

const webserver = express();
const port = 4094;
// const dataFile = path.join(__dirname, '_data.json');

webserver.use(express.static('public'));

webserver.use(express.json({extended:true}));


webserver.listen(port,()=>{
    console.log("web server running on port "+port, __dirname);
});