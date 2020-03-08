const express = require('express');
const fs = require('fs');
const path = require('path');

const {logLineSync} = require("../utils/logLineSync");

const webserver = express();
const port = 3095;
const dataFile = path.join(__dirname, '_data.json');

webserver.use(express.static('public'));

webserver.use(express.json({extended:true}));

const data  = fs.readFileSync(
    dataFile,
    e => {
        if (e)
            logLineSync(`Error web server on port ${port}: ${e}`, __dirname)
    }
);

const variants = JSON.parse(data);

const options = [];

for (let key in variants) {
    options.push({
        id: key,
        text: variants[key].text
    })
}


webserver.get('/variants', (req, res) => {
    res.json(options);
});

webserver.post('/vote', (req, res) => {
    const id = req.body.id;
    if (id) {
        const dataJson  = fs.readFileSync(
            dataFile,
            e => {
                if (e) {
                    logLineSync(`Error web server /vote readFileSync on port ${port}: ${e}`, __dirname);
                    res.send(410, e)
                }
            }
        );
        const data = JSON.parse(dataJson);
        data[id].votes+=1;

        fs.writeFile('./_data.json', JSON.stringify(data), e => {
            if (e) {
                logLineSync(`Error web server /vote writeFile on port ${port}: ${e}`, __dirname);
                res.send(410, e)
            }
            else {
                logLineSync(`Success web server /vote on port ${port}, id: ${id}`, __dirname);
                res.send(200, JSON.stringify(data))
            }
        });
    }
    else {
        const errorInfo = "Invalid request body data";
        logLineSync(`Error web server /vote on port ${port}: ${errorInfo}`, __dirname);
        res.send(400, errorInfo)
    }
});

webserver.post('/stat', (req, res) => {
    const dataJson = fs.readFileSync(
        dataFile,
        e => {
            if (e) {
                logLineSync(`Error web server /stat readFileSync on port ${port}: ${e}`, __dirname);
                res.send(410, e)
            }
        }
    );
    logLineSync(`Success web server /stat on port ${port}`, __dirname);
    res.send(200, dataJson)
});


webserver.listen(port,()=>{
    console.log("web server running on port "+port, __dirname);
}); 
