/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/input-message");
import BasicAnswer = require("./basic-answer");
import AnswerCallback = require("../../types/answer-callback");

class UnknownAnswer extends BasicAnswer {
    constructor(inputMessage: InputMessage) {
        super();
        this.inputMessage = inputMessage;
    }

    isLastInChain(): boolean {
        return true;
    }

    getAnswer(cb: AnswerCallback) {
        this.text = "Unfortunately I cannot understand you.\nType /Start to open menu.";

        super.getAnswer(cb);
    }
}

export = UnknownAnswer;
