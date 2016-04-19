/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com>. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 * Useful routine functions located here
 */

import fs = require("fs");

class Utils {
    public static getBotCredentials() {
        let config = fs.readFileSync("botconfig.json", "utf8"),
            json = JSON.parse(config);

        return json;
    }
}

export = Utils;
