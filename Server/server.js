const express = require('express');
const path = require('path');
const app = express();

const serverPort= 8000

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(serverPort, ()=>console.log("Listening at "+serverPort) );
