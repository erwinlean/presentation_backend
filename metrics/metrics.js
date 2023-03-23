"use strict";

const Prometheus = require('prom-client');

// Histogram to track the response time of the endpoint
const endpointResponseTime = new Prometheus.Histogram({
    name: 'endpoint_response_time',
    help: 'Response time for the endpoint',
    buckets: [0.1, 0.5, 1, 5, 10],
});

// Counter to track the number of times the endpoint was called
const endpointCounter = new Prometheus.Counter({
    name: 'endpoint_counter',
    help: 'Number of times the endpoint is called',
});

module.exports = {
    endpointCounter: endpointCounter,
    endpointResponseTime: endpointResponseTime
};