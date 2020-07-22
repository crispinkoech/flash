import {
    FastifyInstance,
} from 'fastify';

import fp, {
    nextCallback,
} from 'fastify-plugin';

import OtpCollection from './collection';

function fastifyOtpCollection(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
) {
    const otpCollection = new OtpCollection();

    if (!fastify.otpCollection) {
        fastify.decorate('otpCollection', otpCollection);
    }

    next();
}

export default fp(fastifyOtpCollection, { name: 'fastifyOtpCollection' });
