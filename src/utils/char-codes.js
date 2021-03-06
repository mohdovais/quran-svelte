export function charCodesAt(str) {
    return String(str).split('').map(function (char) {
        return char.charCodeAt()
    }).join(',')
}

export function fromCharCodes(str) {
    return String(str).split(',').map(function (code) {
        return String.fromCharCode(code)
    }).join('')
}
