import {
    FastifyInstance,
    FastifyError,
    FastifyRequest,
    FastifyReply,
} from 'fastify';

import {
    nextCallback,
} from 'fastify-plugin';

const schemas = {
    postCallSchema: {
        body: {
            type: 'object',
            required: ['to'],
            properties: {
                to: {
                    type: 'string',
                },
            },
        },

        response: {
            '2xx': {
                type: 'string',
            },
        },
    },
};

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
        '/call',
        { schema: schemas.postCallSchema },
        async function handler(request, reply) {
            const response = await this.voiceService.call(request.body.to);
            reply.status(201).send(response);
        },
    );

    next();
}

export default routes;
