export interface ApiResponse<T> {
    data: T;
    status: number;
    success: boolean;
    message?: string;
}

export interface ApiError {
    status: number;
    message: string;
    details?: Record<string, unknown>;
    code?: string;
}

export interface ApiRequestBody {
    [key: string]: string | number | boolean | object | Array<unknown>;
}

export interface ApiRequestParams {
    [key: string]: string | number | boolean;
}

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
    params?: ApiRequestParams;
}
