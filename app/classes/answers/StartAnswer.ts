/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/InputMessage");
import Answer = require("../../types/Answer");
import BasicAnswer = require("./BasicAnswer");
import Utils = require("../Utils");
import CarCheck1Answer = require("./CarCheck1Answer");

class StartAnswer extends BasicAnswer {

    constructor(inputMessage: InputMessage) {
        super(inputMessage);

        // Set forward routes
        this.forwardRoutes.push({
            answer: new CarCheck1Answer(undefined),
            text: "carcheck"
        });
    }

    getAnswer(): Answer {
        let answer: Answer;

        this.text = Utils.format("Hello {0},\nI'm your personal assistant. " +
            "Please choose what you would like to get.\n",
            this.inputMessage.message.from.first_name);

        answer = super.getAnswer();
        answer.reply_markup = {
            keyboard: [["Car check 🚗"]],
            resize_keyboard: true
        };

        return answer;
    }
}

export = StartAnswer;
