import { GerstlixError } from "./gerstlix-error";

export class ValidationError extends GerstlixError {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}
