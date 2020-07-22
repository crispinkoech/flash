import {
    ServerResponse,
} from 'http';

import OtpCollection from '../plugins/collections/otp/collection';
import VoiceResource from '../plugins/resources/voice/resource';
import VoiceService from '../services/voice/service';
import NotificationService from '../services/webhooks/notification/service';

declare module 'fastify' {
    interface FastifyInstance {
        otpCollection: OtpCollection,
        voiceResource: VoiceResource,
        voiceService: VoiceService,
        notificationService: NotificationService,
    }

    interface FastifyReply<
        HttpResponse = ServerResponse
    > {
        sendReply(): void;
    }
}
