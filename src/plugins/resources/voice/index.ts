import {
    FastifyInstance,
} from 'fastify';

import fp, {
    nextCallback,
} from 'fastify-plugin';

import VoiceResource from './resource';

function fastifyVoiceResource(
    fastify: FastifyInstance,
    config: ConstructorOptions,
    next: nextCallback,
): void {
    const voiceResource = new VoiceResource(config);

    if (!fastify.voiceResource) {
        fastify.decorate('voiceResource', voiceResource);
    }

    next();
}

export default fp(fastifyVoiceResource, { name: 'fastifyVoiceResource' });
