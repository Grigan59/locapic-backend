function checkBody(body,tab) {
    return !tab.some((element)=>!body[element])
}

module.exports = {checkBody};