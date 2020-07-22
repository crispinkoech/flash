import xml2js from 'xml2js';

import {
    ConstructorOptions,
} from './types';

export default class NotificationService {
    private xmlBuilder: xml2js.Builder;

    private otpCollection: ConstructorOptions['otpCollection'];

    private static formatOtp(opt: string): string {
        return opt.split('').join('-');
    }

    constructor(
        opts: ConstructorOptions,
    ) {
        this.otpCollection = opts.otpCollection;

        this.xmlBuilder = new xml2js.Builder({
            explicitRoot: false,
        });
    }

    async buildVoiceResponse(
        recipient: string,
    ): Promise<string> {
        const foundOtp = await this.otpCollection.get(recipient);

        const message = foundOtp
            ? `Hello, welcome to our services. Here is your otp: ${NotificationService.formatOtp(foundOtp.otp as string)}`
            : 'Hello, I am sorry to inform you that an otp is not available for you at this time.';

        await this.otpCollection.delete(recipient);

        const data = {
            Response: {
                Say: {
                    $: { voice: 'man', playBeep: true },
                    _: message,
                },
            },
        };

        const response = this.xmlBuilder.buildObject(data);
        return response;
    }
}
