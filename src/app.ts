import fastify from 'fastify';
import fastifyXml from 'fastify-xml-body-parser';
import fastifyFormBody from 'fastify-formbody';

import collections from './plugins/collections';
import resources from './plugins/resources';
import services from './services';

const app = fastify({
    pluginTimeout: 15000,
    logger: {
        level: 'info',
    },
});

app
    // Fastify plugins
    .register(fastifyXml)
    .register(fastifyFormBody)

    // Our own plugins
    .register(collections)
    .register(resources)
    .register(services);

export default app;
