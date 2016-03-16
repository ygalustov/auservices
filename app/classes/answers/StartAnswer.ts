/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/InputMessage");
import AnswerCallback = require("../../types/AnswerCallback");
import BasicAnswer = require("./BasicAnswer");
import Utils = require("../Utils");
import CarCheck1Answer = require("./CarCheck1Answer");

class StartAnswer extends BasicAnswer {

    constructor(inputMessage: InputMessage) {
        super();
        this.inputMessage = inputMessage;

        // Set forward routes
        this.forwardRoutes.push({
            answer: new CarCheck1Answer(),
            text: "carcheck"
        });
    }

    getAnswer(cb: AnswerCallback) {
        this.text = Utils.format("Hello {0},\nI'm your personal assistant. Please choose what you would like to get.\n",
            this.inputMessage.message.from.first_name);

        this.replyMarkup = {
            keyboard: [["Car check 🚗"]],
            resize_keyboard: true
        };

        super.getAnswer(cb);
    }
}

export = StartAnswer;
