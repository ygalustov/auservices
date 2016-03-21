/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./basic-answer");

class UnknownAnswer extends BasicAnswer {
    isLastInChain(): boolean {
        return true;
    }

    get text(): string {
        return "Unfortunately I cannot understand you.\nType /Start to open menu.";
    }
}

export = UnknownAnswer;
