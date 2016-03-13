/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/InputMessage");
import BasicAnswer = require("./BasicAnswer");
import Answer = require("../../types/Answer");

class UnknownAnswer extends BasicAnswer {
    constructor(inputMessage: InputMessage) {
        super();
        this.inputMessage = inputMessage;
    }

    isLastInChain(): boolean {
        return true;
    }

    getAnswer(): Answer {
        this.text = "Unfortunately I cannot understand you.\nType /Start to open menu.";

        return super.getAnswer();
    }
}

export = UnknownAnswer;
