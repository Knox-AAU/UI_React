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

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const dbStatus = require('./dbstatus');
const httpProxy = require('http-proxy');

const app = express();
const serverPort = 8000;

// Proxy used for websockets
const wsProxy = httpProxy.createProxyServer({
  target: 'http://knox-master01.srv.aau.dk/statsWebsocket',
  ws: true
});

app.use(express.json()); 

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get("/search",(req,res)=>{
  const searchText = req.query.input
  const sources = req.query.sources
  fetch("http://localhost:8081/api/search?input=" + encodeURI(searchText)+"&sources=" + encodeURI(sources))
    .then(response => response.json())
    .then(json=>res.json(json))
    .catch(e=>{
      res.status=500;
      res.send(e)
      console.log(e)
    })
})

app.get("/getpdf*", (req,res)=>{
  const id = req.query.id
  fetch("http://localhost:8081/api/getpdf?id="+id,)
    .then(response=>response.body.pipe(res))
    .catch(e=>{
      res.status=500;
      res.send(e)
      console.log(e)
    })
})

app.post("/visualiseNer", async (req, res) => {
  try {
    const options = { method: "POST", body: JSON.stringify(req.body) }
    const response = await fetch("http://localhost:5050/visualiseNer/", options)
    if(!response.ok)
      throw new Error(response.status)
    response.body.pipe(res)
  }
  catch (error) {
    res.status(500).send("Error Visualising Text. Visualiser might be down. Try again later.")
  }
})

app.get("/VirtualAssistant/node", (req,res)=>{
  const id = req.query.id
  fetch(`http://localhost:8081/api/VirtualAssistant/node?id=${id}`,)
    .then(response=>response.body.pipe(res))
    .catch(e=>{
      res.status=500;
      res.send(e)
      console.log(e)
    })
})

app.get("/dbstatus", (req, res) => {
  res.json(dbStatus.getStatus(req, res));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(serverPort, () => console.log("Listening at " + serverPort));
// On client starting ws connection: upgrade http connection to ws connection
server.on('upgrade', (req, socket, head) => {
  wsProxy.ws(req, socket, head);
});

wsProxy.on('error', (err) => {
  if (err.message == "getaddrinfo ENOTFOUND knox-master01.srv.aau.dk")
    console.error("Could not find server knox-master01.srv.aau.dk. Are you connected to AAU network?");
  else
    console.error(err);
});