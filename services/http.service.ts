import * as http from 'http';
import {HTTPResponseCodes, IHTTPResponse, IHttpService} from '../models/http.service.model';
import {IConnection} from '../models/connection.model';

export class HTTPService implements IHttpService {
    constructor(private connection: IConnection) {}

    private requestEndHandler<ResponseType>(
        resolve: (result: ResponseType) => void,
        reject: (result: ResponseType | Error) => void,
        body: Buffer[],
    ) {
        let result: IHTTPResponse<ResponseType>;
        try {
            const responseStr = Buffer.concat(body).toString();
            result = <IHTTPResponse<ResponseType>>JSON.parse(responseStr);
        } catch (error) {
            reject(error);
            return;
        }
        let responseError: Error;
        if (result && !result.code && !result.data && (<any>result as ResponseType)) {
            resolve(<any>result as ResponseType);
            return;
        }
        switch (result.code) {
            case undefined: responseError = new Error(result.message || 'Request Code Is Undefined'); break;
            case HTTPResponseCodes.remoteServerError: responseError = new Error(result.message || 'Remote Server Error'); break;
            case HTTPResponseCodes.clientError: responseError = new Error(result.message || 'Request Error'); break;
            case HTTPResponseCodes.forbiddenError: responseError = new Error(result.message || 'Forbidden Error'); break;
            case HTTPResponseCodes.resourceNotFound: responseError = new Error(result.message || 'Resource Not Found'); break;
        }
        if (result.code >= 400) {
            reject(responseError || new Error(result.message || 'HTTP Request Error'));
        }
        resolve(result.data);
    }

    public async get<ResponseType>(
        apiMethod: string,
        parameters?: { [key: string]: string | number | boolean },
    ): Promise<ResponseType> {
        return new Promise<ResponseType>(async (resolve, reject) => {
            const request = http.request(this.getRequestConfig(apiMethod, parameters, 'get'), (socket) => {
                const body: Buffer[] = [];
                socket
                    .on('data', chunk => body.push(chunk))
                    .on('end', () => this.requestEndHandler<ResponseType>(resolve, reject, body));
            });
            request.on('error', error => reject(error));
            request.end();
        });
    }

    public async post<ResponseType>(
        apiMethod: string,
        payload: object,
        parameters?: { [key: string]: string | number | boolean },
    ): Promise<ResponseType> {
        const payloadString: string = JSON.stringify(payload);
        return new Promise<ResponseType>(async (resolve, reject) => {
            try {
                const request = http.request(
                    this.getRequestConfig(apiMethod, parameters, 'post', payload && Buffer.byteLength(payloadString)),
                    socket => {
                        const body: Buffer[] = [];
                        socket
                            .on('data', chunk => body.push(chunk))
                            .on('end', () => this.requestEndHandler<ResponseType>(resolve, reject, body));
                    }
                );
                request.on('error', error => reject(error));
                if (payload) {
                    request.write(payloadString);
                }
                request.end();
            } catch (e) {
                reject(e);
            }
        });
    }

    public async put<ResponseType>(
        apiMethod: string,
        payload: object,
        parameters?: { [key: string]: string | number | boolean },
    ): Promise<ResponseType> {
        const payloadString: string = JSON.stringify(payload);
        return new Promise<ResponseType>(async (resolve, reject) => {
            const request = http.request(
                this.getRequestConfig(apiMethod, parameters, 'put', payload && Buffer.byteLength(payloadString)),
                socket => {
                    const body: Buffer[] = [];
                    socket
                        .on('data', chunk => body.push(chunk))
                        .on('end', () => this.requestEndHandler<ResponseType>(resolve, reject, body));
                }
            );
            request.on('error', error => reject(error));
            if (payload) {
                request.write(payloadString);
            }
            request.end();
        });
    }

    private getRequestConfig(
        apiMethod: string,
        parameters: { [key: string]: string | number | boolean },
        httpMethod: string,
        payloadByteLength?: number
    ) {
        const config = {
            protocol: 'http:',
            host: this.connection.host,
            port: this.connection.port,
            method: httpMethod,
            path: this.makeQuery(apiMethod, parameters),
            headers : {
                'Content-Type' : 'application/json'
            }
        };
        if (payloadByteLength) {
            config['Content-Length'] = payloadByteLength;
        }
        return config;
    }

    private makeQuery(
        url: string,
        parameters: { [key: string]: string | number | boolean },
    ): string {
        url = url.replace(/^\/+/, '');
        let strokedParameters = '';
        Object.keys(parameters || {}).forEach(key => strokedParameters += `&${key}=${parameters[key].toString()}`);
        return `${this.connection.apiPath && '/' + this.connection.apiPath || ''}/${url}?secret=${this.connection.secret}${strokedParameters}`;
    }
}
