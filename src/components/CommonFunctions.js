export function isValidObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isNotNullOrEmpty(value) {
    return value !== null && value !== undefined && value !== '';
}
