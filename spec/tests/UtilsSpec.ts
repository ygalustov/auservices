import Utils = require("../../app/classes/Utils");

describe("Utils", () => {
    it("should remove all non alpha characters and change text to lowecase", () => {
        expect(Utils.normalizeText("A123B-z;")).toMatch("[a-z]");
    });
});
