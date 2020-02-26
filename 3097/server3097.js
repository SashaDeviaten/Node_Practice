const express = require('express');

const webserver = express();

const port = 3097;

const labelStyle = "width:80px;display:inline-block";
const errorText = "<div style='color: red'>Поле обязательно для заполнентя</div>"

const initForm = [
    "<form name='login' method=get action='/login' novalidate>",
    `<span style=${labelStyle}>Login:</span><input type=text name='login' value="">`,
    `<span style=${labelStyle}>Password:</span><input type=password name='password' value="">`,
    "<input type='submit' value='Submit'>",
    "</form>"
];

webserver.get('/login', (req, res) => {

    let answer = initForm.join('<br/><br/>');

    if (Object.keys(req.query).length) {
        const {login, password} = req.query;

        if (login && password) {
            answer = `Success! Your login: ${login}, your password: ${password}`
        }
        else {
            const invalidForm = [...initForm];
            invalidForm[1] = invalidForm[1].replace(/value="/, `value="${login}`);
            invalidForm[2] = invalidForm[2].replace(/value=""/, `value="${password}"`);

            if (!login)
                invalidForm[1]+=errorText;

            if (!password)
                invalidForm[2]+=errorText;

            answer = invalidForm.join('<br/><br/>')
        }


    }

    res.send(answer)
});


webserver.listen(port,()=>{ 
    console.log("web server running on port "+port);
}); 
