import VoiceResource from '../../plugins/resources/voice/resource';
import OtpCollection from '../../plugins/collections/otp/collection';

export interface ConstructorOptions {
    voiceResource: VoiceResource;
    otpCollection: OtpCollection;
}
