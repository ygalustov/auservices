/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// import request = require("request");
import IScraper = require("../IScraper");

class RegoCheck implements IScraper {
    getResponse(request: string): string {
        return "all is ok";
    }
}

export = RegoCheck;
