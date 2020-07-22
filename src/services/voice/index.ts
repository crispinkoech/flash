import {
    FastifyInstance,
} from 'fastify';

import {
    nextCallback,
} from 'fastify-plugin';

import VoiceRoutes from './routes';
import VoiceService from './service';

function fastifyVoiceService(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
): void {
    const voiceService = new VoiceService({
        voiceResource: fastify.voiceResource,
        otpCollection: fastify.otpCollection,
    });

    fastify.decorate('voiceService', voiceService);
    fastify.register(VoiceRoutes, { prefix: '/voice' });

    next();
}

export default fastifyVoiceService;
