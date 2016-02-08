/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/InputMessage");
import BasicAnswer = require("./BasicAnswer");
import Answer = require("../../types/Answer");

class UnknownAnswer extends BasicAnswer  {
    constructor(inputMessage: InputMessage) {
        super(inputMessage);
        this.text = "Unfortunately I cannot understand you.\nType /Start to open menu.";
    }

    getAnswer(): Answer {
        let answer: Answer;

        answer = super.getAnswer();
        answer.reply_markup = {
            hide_keyboard: true
        };

        return answer;
    }
}

export = UnknownAnswer;
