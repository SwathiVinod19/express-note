//imports the required modules: express, fs, path
const express = require('express');
const app = express();
// creating environment variable port
const PORT = process.env.PORT || 3001;

// middleware: 
app.use(express.static('public'));

//configuring middleware to handle URL-encoded data. It parses the URL-encoded data 

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// routes to route files
const apiRouter = require('./routes/api.js');
const htmlRouter = require('./routes/html.js');

app.use("/api", apiRouter)
app.use(htmlRouter);

//PORT
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`));