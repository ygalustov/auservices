/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import ScraperCallback = require("./scraper-callback");

interface Scrapable {
    getResponse(request: string, cb: ScraperCallback): string;
}

export = Scrapable;
