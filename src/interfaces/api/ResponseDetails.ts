import ResponseError from "./ResponseError";

export default interface ResponseDetails<T>
{
    success: boolean;
    status?: number;
    error?: ResponseError;
    data?: T;
};