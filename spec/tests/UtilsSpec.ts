/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import Utils = require("../../app/classes/Utils");
import fs = require("fs");

describe("Utils", () => {
    it("should remove all non alpha characters from token and the text to lowecase", () => {
        expect(Utils.normalizeText("A123B-z;';[]()")).toMatch("[a-z]");
    });

    it("shouldn't accept empty token", (done) => {
        let json: any;

        fs.readFile("botconfig.json", "utf8", (err, data) => {
            json = JSON.parse(data);

            expect(json.securityToken).toBeDefined();
            expect(json.securityToken).not.toBeNull();
            expect(json.securityToken).not.toBe("");

            done();
        });
    });

    it("should compare token with the one from config file", (done) => {
        let json: any;

        fs.readFile("botconfig.json", "utf8", (err, data) => {
            json = JSON.parse(data);

            expect(Utils.isValidToken(json.securityToken)).toBeTruthy();

            done();
        });
    });

    it("should correct replace placeholders in string", () => {
        expect(Utils.format("{0}abc{1}def{2}", "1", "2", "3")).toBe("1abc2def3");
        expect(Utils.format("{0}{0}{0}", "x")).toBe("xxx");
    });
});
