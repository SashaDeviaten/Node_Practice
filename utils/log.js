const fs = require('fs');
const path = require('path');
const os = require('os');

const logLineSync = (logLine, logDir = __dirname, lofFile = '_server.log') => {

    const logFile = path.join(logDir, lofFile);
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    console.log(fullLogLine); // выводим сообщение в консоль

    const logFd = fs.openSync(logFile, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLogLine + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);
};

function logLineAsync(logFilePath,logLine) {

    return new Promise( (resolve,reject) => {

        const logDT=new Date();
        let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
        let fullLogLine=time+" "+logLine;

        console.log(fullLogLine); // выводим сообщение в консоль

        fs.open(logFilePath, 'a+', (err,logFd) => {
            if ( err )
                reject(err);
            else
                fs.write(logFd, fullLogLine + os.EOL, (err) => {
                    if ( err )
                        reject(err);
                    else
                        fs.close(logFd, (err) =>{
                            if ( err )
                                reject(err);
                            else
                                resolve();
                        });
                });

        });

    } );

}

module.exports={
    logLineSync,
    logLineAsync
};