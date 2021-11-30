const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');


const app = express();
const serverPort= 8000;

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

app.get("/gettriples", (req,res) => {
  fetch("http://localhost:4605/Triple",)
  .then(response => response.json())
  .then(json => res.json(json))
  .catch(e=> {
      res.status = 500;
      res.send(e)
      console.log(e)
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(serverPort, ()=>console.log("Listening at " + serverPort) );