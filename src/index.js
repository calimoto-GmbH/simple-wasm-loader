const utils = require("./utils");

module.exports = function (buffer) {
    const bufferString = new Uint8Array(buffer).toString();
    return `module.exports = (() => {
        return ${utils.convertBufferStringToInstance}.bind({}, "${bufferString}");
    })();`;
}

module.exports.raw = true;