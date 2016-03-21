/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./basic-answer");

class InProgressAnswer extends BasicAnswer {

    get text(): string {
        return "The operation still in progress, please wait...";
    }
}

export = InProgressAnswer;
