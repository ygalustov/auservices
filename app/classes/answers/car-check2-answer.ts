/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./basic-answer");
import CarCheck3Answer = require("./car-check3-answer");
import AnswerCallback = require("../../types/answer-callback");

class CarCheck2Answer extends BasicAnswer {

    constructor() {
        super();

        // Set forward routes
        this.forwardRoutes.push({
            answer: new CarCheck3Answer(),
            text: "*"
        });
    }

    public getAnswer(cb: AnswerCallback) {
        this.text = "Enter your car plates or hit /Start to return to the Main menu.";
        this.replyMarkup = {
            hide_keyboard: true
        };

        super.getAnswer(cb);
    }
}

export = CarCheck2Answer;
