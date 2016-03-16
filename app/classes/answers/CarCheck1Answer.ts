/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./BasicAnswer");
import CarCheck2Answer = require("./CarCheck2Answer");
import AnswerCallback = require("../../types/AnswerCallback");

class CarCheck1Answer extends BasicAnswer {

    constructor() {
        super();

        // Set forward routes
        this.forwardRoutes.push({
            answer: new CarCheck2Answer(),
            text: "nsw"
        });
    }

    public getAnswer(cb: AnswerCallback) {
        this.text = "Select you State or hit /Start to return to the Main menu.";
        this.replyMarkup = {
            keyboard: [["NSW"]],
            resize_keyboard: true
        };

        super.getAnswer(cb);
    }
}

export = CarCheck1Answer;
