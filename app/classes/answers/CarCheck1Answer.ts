/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import InputMessage = require("../../types/InputMessage");
import BasicAnswer = require("./BasicAnswer");
import CarCheck2Answer = require("./CarCheck2Answer");
import Answer = require("../../types/Answer");

class CarCheck1Answer extends BasicAnswer {

    constructor(inputMessage: InputMessage) {
        super(inputMessage);
        this.text = "Enter your car plates or hit /Start to return to the Main menu.";

        // Set forward routes
        this.forwardRoutes.push({
            answer: new CarCheck2Answer(undefined),
            text: "*"
        });
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

export = CarCheck1Answer;
