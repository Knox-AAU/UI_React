const express = require('express');
const path = require('path');
const app = express();
const serverPort= 8000

/*
#################################################################
#################################################################
#################################################################
### TO RUN THE SERVER WRITE NPM RUN BUILD IN KNOX-UI FOLDER.  ###
###     THEN MOVE THE BUILD FOLDER TO THE SERVER FOLDER.      ###
###     ON DEPLOYMENT SIMPLY COPY PASTE BUILD FOLDER TO       ###
###     SERVER FOLDER IN PRODUCTION AND RESTART SERVICE       ###
#################################################################
#################################################################
#################################################################
*/

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(serverPort, ()=>console.log("Listening at " + serverPort) );