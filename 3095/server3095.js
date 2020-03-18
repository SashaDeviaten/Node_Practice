const express = require('express');
const fs = require('fs');
const path = require('path');

const {logLineSync} = require("../utils/log");

const webserver = express();
const port = 3095;
const dataFile = path.join(__dirname, '_data.json');

webserver.use(express.static('public'));

webserver.use(express.json({extended:true}));

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

webserver.get('/stat', (req, res) => {
    const dataJson = fs.readFileSync(
        dataFile,
        e => {
            if (e) {
                logLineSync(`Error web server /stat readFileSync on port ${port}: ${e}`, __dirname);
                res.send(410, e)
            }
        }
    );
    res.setHeader("Cache-Control","max-age=0");

    let data = null;

    const clientAccept=req.headers.accept;
    if ( clientAccept==="application/json" ) {
        res.setHeader("Content-Type", "application/json");
        data = dataJson;
    }
    else if ( clientAccept==="application/xml" ) {
        res.setHeader("Content-Type", "application/xml");
        data = getXMLData(JSON.parse(dataJson));
    }
    else {
        res.setHeader("Content-Type", "application/html");
        data=getHTMLData(JSON.parse(dataJson));
    }

    logLineSync(`Success web server /stat on port ${port}`, __dirname);
    res.send(200, data)
});


webserver.listen(port,()=>{
    console.log("web server running on port "+port, __dirname);
});

function getXMLData(data) {
    let xml = '';

    for (let key in data) {
        xml += `<variant> <id>${key}</id> <text>${data[key].text}</text> <votes>${data[key].votes}</votes> </variant>`
    }

    return `<statistic> ${xml} </statistic>`
}

function getHTMLData(data) {
    let html = '';

    for (let key in data) {
        html += `<div>${data[key].text}: ${data[key].votes}</div>\n\t`
    }

    return html
}
