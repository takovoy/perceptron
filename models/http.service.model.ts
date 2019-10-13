export interface IHttpService {
    get<ResponseType>(
        apiMethod: string,
        parameters?: { [key: string]: string | number | boolean },
    ): Promise<ResponseType>;
    post<ResponseType>(
        apiMethod: string,
        payload: object,
        parameters?: { [key: string]: string | number | boolean },
    ): Promise<ResponseType>;
    put<ResponseType>(
        apiMethod: string,
        payload: object,
        parameters?: { [key: string]: string | number | boolean },
    ): Promise<ResponseType>;
}

export enum HTTPResponseCodes {
    success = 200,
    redirect = 300,
    clientError = 400,
    forbiddenError = 403,
    resourceNotFound = 404,
    remoteServerError = 500
}

export interface IHTTPResponse<ResponseType> {
    code: HTTPResponseCodes;
    message: string;
    data: ResponseType;
}
