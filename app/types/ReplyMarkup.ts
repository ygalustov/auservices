/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

interface ReplyMarkup {
    hide_keyboard?: boolean;
    keyboard?: Array<Array<string>>;
    one_time_keyboard?: boolean;
    resize_keyboard?: boolean;
}

export = ReplyMarkup;
