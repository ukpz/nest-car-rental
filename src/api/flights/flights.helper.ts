export function generateRandomString(length: number) {
    return Array.from({ length }, () =>
        Math.random().toString(36)[2]
    ).join('');
}