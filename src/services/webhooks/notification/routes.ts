import {
    FastifyInstance,
    FastifyError,
    FastifyRequest,
    FastifyReply,
} from 'fastify';

import {
    nextCallback,
} from 'fastify-plugin';

function routes(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
): void {
    fastify.setErrorHandler((
        err: FastifyError,
        __: FastifyRequest,
        reply: FastifyReply,
    ) => {
        if (err.validation || err.name === 'ValidationError') {
            reply.status(400).send(err);
            return;
        }

        fastify.log.error(err);
        reply.status(500).send(err);
    });

    fastify.post(
        '/voice',
        {},
        async function handler(request, reply) {
            if (request.body.isActive === 0 || request.body.isActive === '0') {
                reply.status(200).send();
                return;
            }

            const response = await this
                .notificationService
                .buildVoiceResponse(request.body.callerNumber);

            reply.status(200).send(response);
        },
    );

    next();
}

export default routes;
