const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const cors = require("cors");
const dbStatus = require("./dbstatus");
const httpProxy = require("http-proxy");
const { URL, URLSearchParams } = require("url");

const wordCountStatus = new dbStatus(
  "http://knox-master01.srv.aau.dk/accessapi/api/wordCount/status"
);
const rdfStatus = new dbStatus(
  "http://knox-master01.srv.aau.dk/accessapi/api/rdf/status"
);

const app = express();
const serverPort = 8000;

// Proxy used for websockets
const wsProxy = httpProxy.createProxyServer({
  target: "http://knox-master01.srv.aau.dk/",
  ws: true,
});

app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/search", (req, res) => {
  const searchText = req.query.input;
  const sources = req.query.sources;
  fetch(
    "http://knox-master01.srv.aau.dk/accessapi/api/search?input=" +
      encodeURI(searchText) +
      "&sources=" +
      encodeURI(sources)
  )
    .then((response) => response.json())
    .then((json) => res.json(json))
    .catch((e) => {
      res.status = 500;
      res.send(e);
      console.log(e);
    });
});

app.get("/getpdf*", (req, res) => {
  const id = req.query.id;
  fetch("http://knox-master01.srv.aau.dk/accessapi/api/getpdf?id=" + id)
    .then((response) => response.body.pipe(res))
    .catch((e) => {
      res.status = 500;
      res.send(e);
      console.log(e);
    });
});

app.get("/gettriples", (req, res) => {
  fetch("http://knox-master01.srv.aau.dk/factchecker/Triple")
    .then((response) => response.json())
    .then((json) => res.json(json))
    .catch((e) => {
      res.status = 500;
      res.send(e);
      console.log(e);
    });
});

app.post("/getpassage", (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };
  fetch("http://knox-master01.srv.aau.dk/factchecker/Triple", requestOptions)
    .then((response) => response.json())
    .then((json) => res.json(json))
    .catch((e) => {
      res.status = 500;
      res.send(e);
      console.log(e);
    });
});

app.post("/visualiseNer", async (req, res) => {
  try {
    const options = { method: "POST", body: JSON.stringify(req.body) };
    const response = await fetch(
      "http://knox-master01.srv.aau.dk/visualiseNer/visualiseNer/",
      options
    );
    if (!response.ok) throw new Error(response.status);
    response.body.pipe(res);
  } catch (error) {
    res
      .status(500)
      .send(
        "Error Visualising Text. Visualiser might be down. Try again later."
      );
  }
});

app.post("/generateKG", async (req, res) => {
  try {
    const options = { method: "POST", body: JSON.stringify(req.body) };
    const response = await fetch(
      "http://knox-master01.srv.aau.dk/generateKG/generateKG/",
      options
    );
    if (!response.ok) throw new Error(response.status);
    response.body.pipe(res);
  } catch (error) {
    res
      .status(500)
      .send(
        "Error getting Knowledge Graph. Knowledge Graph generator might be down. Try again later."
      );
  }
});

app.get("/VirtualAssistant/node", (req, res) => {
  const id = req.query.id;
  fetch(
    `http://knox-master01.srv.aau.dk/accessapi/api/VirtualAssistant/node?id=${id}`
  )
    .then((response) => response.body.pipe(res))
    .catch((e) => {
      res.status = 500;
      res.send(e);
      console.log(e);
    });
});

app.get("/wordCountStatus", (req, res) => {
  res.json(wordCountStatus.getStatus(req, res));
});

app.get("/rdfStatus", (req, res) => {
  res.json(rdfStatus.getStatus(req, res));
});

app.get("/NordjyskeCount", (req, res) => {
  let url = new URL(
    "http://knox-master01.srv.aau.dk/MongoJsonAPI/collection_count"
  );
  let params = { db: "Nordjyske", col: "1.0" }; // or:
  url.search = new URLSearchParams(params).toString();

  fetch(url)
    .then((response) => response.body.pipe(res))
    .catch((e) => {
      res.status = 500;
      res.send(e);
      console.log(e);
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(serverPort, () =>
  console.log("Listening at " + serverPort)
);
// On client starting ws connection: upgrade http connection to ws connection
server.on("upgrade", (req, socket, head, error) => {
  socket.on("error", (err) => {
    console.error("Error upgrading websocket to socket connection!");
    console.error(err); // Catch socket error
  });

  wsProxy.ws(req, socket, head);
});

wsProxy.on("error", (err) => {
  if (err.message == "getaddrinfo ENOTFOUND knox-master01.srv.aau.dk")
    console.error(
      "Could not find server knox-master01.srv.aau.dk. Are you connected to AAU network?"
    );
  else console.error(err);
});
