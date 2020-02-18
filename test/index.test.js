const compiler = require("./compiler");

const squareResults = [0, 1, 4, 9, 16, 25];
let srcCodeItIs;
const srcCodeItShouldBe = `module.exports = (() => {
    return async function (bufferArrayString) {
        const buffer = new Uint8Array(bufferArrayString.split(","));
        const module = await WebAssembly.compile(buffer);
        return new WebAssembly.Instance(module);
    }.bind({}, "0,97,115,109,1,0,0,0,1,134,128,128,128,0,1,96,1,127,1,127,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,152,128,128,128,0,2,6,109,101,109,111,114,121,2,0,11,95,90,55,115,113,117,97,114,101,114,105,0,0,10,141,128,128,128,0,1,135,128,128,128,0,0,32,0,32,0,108,11");
})();`;


beforeAll(async () => {
    srcCodeItIs = (await compiler("./squarer.wasm")).toJson().modules[0].source;
});

describe("wasm-loader", () => {
    test("equal source code", () => {
        // Not an elegant way to check but whitespace could be different.
        expect(srcCodeItIs.replace(/\s/g, "")).toEqual(srcCodeItShouldBe.replace(/\s/g, ""))
    });

    test("results are correct", async () => {
        const instance = await (eval(srcCodeItIs))();
        squareResults.forEach((result, x) => {
            expect(instance.exports._Z7squareri(x)).toBe(result);
        });
    });
});