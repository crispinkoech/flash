export default class OtpCollection {
    collection: Map<string, TCollectionValue>;

    constructor() {
        this.collection = new Map();
    }

    async get(
        key: string,
    ): Promise<TCollectionValue | null> {
        const x = this.collection.get(key);
        return x ?? null;
    }

    async create(
        key: string,
        value: TCollectionValue,
    ): Promise<void> {
        this.collection.set(key, value);
    }

    async delete(key: string): Promise<void> {
        this.collection.delete(key);
    }

    async truncate(): Promise<void> {
        this.collection.clear();
    }
}
