/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/InputMessage");
import BasicAnswer = require("./BasicAnswer");
import AnswerCallback = require("../../types/AnswerCallback");

class InProgressAnswer extends BasicAnswer {
    constructor(inputMessage: InputMessage) {
        super();
        this.inputMessage = inputMessage;
    }

    isLastInChain(): boolean {
        return false;
    }

    getAnswer(cb: AnswerCallback) {
        this.text = "The operation still in progress, please wait...";

        super.getAnswer(cb);
    }
}

export = InProgressAnswer;
