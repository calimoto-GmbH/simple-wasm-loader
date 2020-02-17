const utils = require("./utils");

module.exports = function () {
    this.addDependency(this.resourcePath);
    const file = require("fs").readFileSync(this.resourcePath);
    const bufferArrayString = new Uint8Array(file).toString();
    return `module.exports = (() => {
        return ${utils.convertBufferArrayStringToInstance}.bind({}, "${bufferArrayString}");
    })()`;
}
