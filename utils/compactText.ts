export const compact = (str: string, length: number, withDots: boolean) => {
    if (str.length > length) {
        const newStr = `${str.substring(0, length)} ${withDots ? '...' : ''}`
        return newStr
    }

    return str
}