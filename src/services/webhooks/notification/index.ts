import {
    FastifyInstance,
} from 'fastify';

import {
    nextCallback,
} from 'fastify-plugin';

import NotificationService from './service';
import NotificationRoutes from './routes';

function fastifyNotificationService(
    fastify: FastifyInstance,
    _: unknown,
    next: nextCallback,
): void {
    const notificationService = new NotificationService({
        otpCollection: fastify.otpCollection,
    });

    fastify.decorate('notificationService', notificationService);
    fastify.register(NotificationRoutes, { prefix: '/webhook/notification' });

    next();
}

export default fastifyNotificationService;
