import {
    ConstructorOptions,
} from './types';

export default class VoiceService {
    private voiceResource: ConstructorOptions['voiceResource'];

    private otpCollection: ConstructorOptions['otpCollection'];

    constructor(
        opts: ConstructorOptions,
    ) {
        this.voiceResource = opts.voiceResource;
        this.otpCollection = opts.otpCollection;
    }

    async call(
        to: string,
    ): Promise<void> {
        const otp = Math.random().toString(10).substr(2, 3)
                    + Math.random().toString(10).substr(5, 3);

        await this.otpCollection.create(to, { otp });
        await this.voiceResource.queueCall(to);
    }
}
