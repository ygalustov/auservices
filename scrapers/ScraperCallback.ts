/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

interface ScraperCallback {
    (details: any, error: string): void;
}

export = ScraperCallback;
