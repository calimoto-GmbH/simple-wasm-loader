module.exports.convertBufferArrayStringToInstance = async function (bufferArrayString) {
    const buffer = new Uint8Array(bufferArrayString.split(","));
    const module = await WebAssembly.compile(buffer);
    return new WebAssembly.Instance(module);
}