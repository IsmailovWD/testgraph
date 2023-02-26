const express = require("express");
const http = require("http")
const { ApolloServer } = require("apollo-server-express")
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginCacheControlDisabled,
    ApolloServerPluginInlineTraceDisabled,
} = require("apollo-server-core")

const app = express();

require('./startup/logging')();
require('./startup/db')();
const { port } = require('./startup/config');
require('./startup/routes')(app);
require('./startup/migration')()

app.listen(port, () => console.log(`🚀 Server running on port ${port}!`))
    .on('error', (e) => {
        console.log('Error happened: ', e.message)
    });

module.exports = app;