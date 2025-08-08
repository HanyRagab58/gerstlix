export class GerstlixError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GerstlixError";
    }

    toJSON() {
        const json: Record<string, unknown> = {};
        for (const key of Object.getOwnPropertyNames(this)) {
            // @ts-ignore
            json[key] = this[key];
        }
        return json;
    }
}