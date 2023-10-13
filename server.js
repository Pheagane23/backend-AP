const https = require('https')

const app = require('./index')

const fs = require('fs')

const port = 8000

 

const options =

{

    key: fs.readFileSync('Keys/privatekey.pem'),

    cert: fs.readFileSync('Keys/certificate.pem')

}

 

const server = https.createServer(options, app)

 

server.listen(port, () => {

    console.log('Server started on port # ' + port)

});

module.exports = server;