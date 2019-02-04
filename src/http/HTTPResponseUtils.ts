export class HTTPResponseUtils {
    public static messageStatusStatus(success: boolean, status: string, message: string): IResponseMessage {
        const response: IResponseMessage = {
            success: success,
            status: status,
            message: message
        }
        return response;
    }
}

export interface IResponseMessage {
    success: boolean;
    status: string;
    message: string;
}