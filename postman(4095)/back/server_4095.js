const express = require('express');
const path = require('path');

const webserver = express();
const port = 4095;


webserver.use(express.static('public'));
webserver.use(express.static(path.join(__dirname,'./front/public')));

webserver.use(express.json({extended:true}));


webserver.listen(port,()=>{
    console.log("web server running on port "+port, __dirname);
});