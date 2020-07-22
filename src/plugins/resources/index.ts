import config from 'config';

import {
    FastifyInstance,
} from 'fastify';

import fp, {
    nextCallback,
} from 'fastify-plugin';

import voiceResource from './voice';

function fastifyResources(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
) {
    fastify.log.info('Initializing resources...');

    fastify
        .register(voiceResource, config.get('africastalking'));

    next();
}

export default fp(fastifyResources);
