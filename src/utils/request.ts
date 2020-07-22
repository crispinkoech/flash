import xml2js from 'xml2js';

import fetch, {
    RequestInit,
    BodyInit,
} from 'node-fetch';

import {
    createError,
} from './format';

enum ContentType {
    xml = 'text/xml',
    json = 'application/json',
    urlEncoded = 'application/x-www-form-urlencoded',
}

interface TOpts {
    accept?: ContentType;
    contentType?: ContentType;
    headers?: {
        [key: string]: string | number | boolean;
    },
}

type TResponse = string | Record<string, unknown>;

const xmlBuilder = new xml2js.Builder({
    explicitRoot: false,
});

async function request(
    method: 'GET' | 'POST',
    url: string,
    opts: TOpts,
    data?: Record<string, unknown>,
): Promise<TResponse> {
    const {
        accept = ContentType.json,
        contentType = ContentType.json,
    } = opts;

    const headers = {
        ...opts.headers,
        accept,
        'Content-Type': contentType,
    };

    const options: RequestInit = {
        headers,
        method,
    };

    if (method === 'POST' && data) {
        switch (contentType) {
        case ContentType.json:

            options.body = JSON.stringify(data);
            break;

        case ContentType.urlEncoded:

            options.body = new URLSearchParams() as BodyInit;
            Object.keys(data).forEach((key) => {
                (options.body as URLSearchParams).append(key, data[key] as string);
            });
            break;

        case ContentType.xml:

            options.body = xmlBuilder.buildObject(data);
            break;

        default:
            break;
        }
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const name = response.status.toString();
        const message = await response.text()
            .then((m) => m || `Request failed with status ${response.status}`)
            .catch(() => `Request failed with status ${response.status}`);

        throw createError(name, message);
    }

    const result = accept === ContentType.json
        ? await response.json()
        : await response.text();

    return result;
}

export default request;

export {
    ContentType,
};
