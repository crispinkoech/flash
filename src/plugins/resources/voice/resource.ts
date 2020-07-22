import request, {
    ContentType,
} from '../../../utils/request';

export default class VoiceResource {
    private baseUrl: ConstructorOptions['voiceUrl'];

    private username: ConstructorOptions['username'];

    private apiKey: ConstructorOptions['apiKey'];

    private from: ConstructorOptions['from'];

    constructor(
        opts: ConstructorOptions,
    ) {
        this.username = opts.username;
        this.apiKey = opts.apiKey;
        this.from = opts.from;
        this.baseUrl = opts.voiceUrl;
    }

    async queueCall(
        to: string,
    ): Promise<string> {
        const options = {
            contentType: ContentType.urlEncoded,
            accept: ContentType.json,
            headers: {
                apiKey: this.apiKey,
            },
        };

        const data = {
            username: this.username,
            from: this.from,
            to,
        };

        const response = await request(
            'POST',
            `${this.baseUrl}/call`,
            options,
            data,
        );

        return response as string;
    }
}
