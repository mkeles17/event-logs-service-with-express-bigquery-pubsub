const makePubSub = require("./pubsub.js");
const makeBigQuery = require("./bigquery.js");


const {PubSub} = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
const pubSub = makePubSub({pubSubClient});


const {BigQuery} = require('@google-cloud/bigquery');
const bigQueryClient = new BigQuery();
const bigQuery = makeBigQuery({bigQueryClient});


module.exports = { pubSub, bigQuery };