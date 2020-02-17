const utils = require("./utils");

module.exports = function () {
    this.addDependency(this.resourcePath);
    const file = require("fs").readFileSync(this.resourcePath);
    const bufferString = new Uint8Array(file).toString();
    return `module.exports = (() => {
        return ${utils.convertBufferStringToInstance}.bind({}, "${bufferString}");
    })()`;
}
