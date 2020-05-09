const express = require('express');
const path = require('path');
const cors = require('cors');
const isoFetch = require("isomorphic-fetch");
const FormData  = require('form-data');


const {validateRequest} = require("../validation");
const {logLineAsync, logLineSync} = require("../../utils/log");

const webserver = express();
const port = 4095;


webserver.use(express.static(path.join(__dirname,'./front/public')));

webserver.use(express.json({extended:true}));

webserver.use(cors());


webserver.post('/send', async (req, res) => {
    const form = req.body;

    const {errors, valid} = validateRequest(form);

/*    {
        "method"
    :
        "GET", "URL"
    :
        "https://www.bps-sberbank.by/rates/rates.json", "name"
    :
        "a", "params"
    :
        [], "headers"
    :
        [], "dataType"
    :
        "form-data", "data"
    :
        []
    }*/

    if (valid) {
        let body = '';
        if (req.body.dataType === 'application/x-www-form-urlencoded'){
            // req.body.body.forEach((item, index) => {
            //     body += `${index !== 0 ? '&' : ''}${item.key}=${encodeURIComponent(item.value)}`
            // })
        }
        else if (req.body.dataType === 'multipart/form-data'){
            body = new FormData();
            req.body.data.forEach(item => {
                body.append(item.key, item.value)
            })
        }
        else if (req.body.dataType === 'raw'){
            body = req.body.data;
        }

        let {URL} = req.body;
        const { headers, method, params} = req.body;

        if (params.length){
            URL += '?';
            params.forEach((item, i) => {
                URL += `${i ? '&' : ''}${item.key}=${encodeURIComponent(item.value)}`
            })
        }
        try {

            const proxy_response = await isoFetch(URL, {headers, method, body});

            const {status, statusText, headers: {_headers: resHeaders}} = proxy_response;

            console.log('proxy_response', proxy_response);

            const response = await proxy_response.text();

            res.send({
                errorCode: 0,
                request: req.body,
                result: {
                    status,
                    statusText,
                    response,
                    headers: resHeaders
                }
            });
            logLineAsync(`Web server /send on port ${port} ${URL} success`, __dirname);
        }
        catch (e) {
            res.send({errorCode:2, errorDescription: e})
            logLineAsync(`Error web server /send on port ${port}: ${e}`, __dirname);
        }

    }
    else {
        logLineAsync(`Form validate errors web server /send on port ${port}`, __dirname);
        res.send({
            errorCode: 1,
            errors,
        });
    }
});


webserver.listen(port,()=>{
    console.log("web server running on port "+port, __dirname);
});