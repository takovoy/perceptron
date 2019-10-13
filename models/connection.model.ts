export interface IConnection {
    name: string;
    alias: string;
    host: string;
    port: number;
    secret?: string;
    apiPath?: string;
    username?: string;
    password?: string;
}
