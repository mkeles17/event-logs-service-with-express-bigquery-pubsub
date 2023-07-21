const express = require('express');
const eventLogRoute = require('./routes/eventLogRoute');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const app = express();

app.use(express.json());

const apiRoot = process.env.API_ROOT;

app.use(apiRoot, eventLogRoute);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`API server started and listening on port ${port}`);
});