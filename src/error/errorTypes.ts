export function notFound(message: string) {
    return {
        type: "not_found",
        code: 404,
        message
    }
}

export function UnprocessableEntity(message: string) {
    return {
        type: "unprocessable entity",
        code: 422,
        message
    }
}

export function unauthorized(message: string) {
    return {
        type: "unauthorized",
        code: 401,
        message
    }
}

export function conflict(message: string) {
    return {
        type: "conflict",
        code: 409,
        message
    }
}

export function forbidden(message: string) {
    return {
        type: "forbidden",
        code: 403,
        message
    }
}