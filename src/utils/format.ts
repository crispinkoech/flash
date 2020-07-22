export function createError(
    name: string,
    message: string,
): NodeJS.ErrnoException {
    const err = new Error(message);
    err.name = name;
    return err;
}
