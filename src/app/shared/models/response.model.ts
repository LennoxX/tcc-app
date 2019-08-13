export class Response<T> {
    public data: T;
    public error: Array<string>;
    public status: string;

    constructor() {}
}