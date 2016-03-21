/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import ReplyMarkup = require("./reply-markup");

interface Answer {
    method: string;
    parse_mode?: string;
    chat_id: number;
    text?: string;
    latitude?: number;
    longitude?: number;
    reply_markup?: ReplyMarkup;
}

export = Answer;
