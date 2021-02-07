window.$ = document.querySelector.bind(document)
Element.prototype.on = Element.prototype.addEventListener
function createElement(e, attrs) {
    let el = document.createElement(e)
    for (let attr in attrs) {
        const value = attrs[attr]
        if (attr == "innerText") el.innerText = value
        else if (attr == "innerHTML") el.innerHTML = value
        else el.setAttribute(attr, value)
    }
    return el
}
Element.prototype.css = function (styles) {
    for (let style in styles) {
        this.style[style] = styles[style]
    }
}

//
window._ = document.querySelectorAll.bind(document)
Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn)
}
NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function (
    name,
    fn
) {
    this.forEach(function (elem, i) {
        elem.on(name, fn)
    })
}
NodeList.prototype.css = function (styles) {
    this.forEach((el) => {
        for (let style in styles) {
            el.style[style] = styles[style]
        }
    })
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    this.forEach((el) => el.remove())
}
