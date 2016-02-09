/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 * Useful routine functions located here
 */

import Consts = require("./Consts");
import fs = require("fs");

class Utils {
    public static isValidToken(token) {
        if (!Consts.greetingsKey) {
            let config = fs.readFileSync("botconfig.json", "utf8"),
                json = JSON.parse(config);

            Consts.greetingsKey = json.SecurityToken;
        }

        return (token === Consts.greetingsKey);
    }

    public static format(format: string, ...args: any[]): string {
//        let args: any[] = Array.prototype.slice.call(arguments, 1);

        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== "undefined" ? args[number] : match;
        });
    }

    public static normalizeText(text) {
        return text ? text.replace(/[^a-z]+/ig, "").toLowerCase() : "";
    }
}

export = Utils;
