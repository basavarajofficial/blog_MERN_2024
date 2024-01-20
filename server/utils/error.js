export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export const successHandler = (statusCode, message) => {
    const msg = new Object();
    msg.statusCode = statusCode;
    msg.message = message;
    return msg;
}