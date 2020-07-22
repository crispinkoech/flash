import {
    FastifyInstance,
} from 'fastify';

import {
    nextCallback,
} from 'fastify-plugin';

import voiceService from './voice';
import notificationService from './webhooks/notification';

function services(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
): void {
    fastify.log.info('Attaching route handlers...');

    fastify
        .register(voiceService)
        .register(notificationService);

    next();
}

export default services;
