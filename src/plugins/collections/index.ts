import {
    FastifyInstance,
} from 'fastify';

import fp, {
    nextCallback,
} from 'fastify-plugin';

import otpCollection from './otp';

function fastifyCollections(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
) {
    fastify.log.info('Initializing collections...');

    fastify
        .register(otpCollection);

    next();
}

export default fp(fastifyCollections);
