function sanitize(unsafe) {
    let escape_string = JSON.stringify(unsafe)
        .slice(1, -1)
        .replace(/</g, "\\x3C")
        .replace(/>/g, "\\x3E")
    return escape_string
}
const escape_string = (unsafe) =>
    unsafe.replace(/[^]/g, function (e) {
        return "&#" + e.charCodeAt(0) + ";"
    })
module.exports = {
    escape_string,
    sanitize,
}
