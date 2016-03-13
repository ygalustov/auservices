/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./BasicAnswer");
import CarCheck2Answer = require("./CarCheck2Answer");
import Answer = require("../../types/Answer");

class CarCheck1Answer extends BasicAnswer {

    constructor() {
        super();

        // Set forward routes
        this.forwardRoutes.push({
            answer: new CarCheck2Answer(),
            text: "*"
        });
    }

    getAnswer(): Answer {
        this.text = "Enter your car plates or hit /Start to return to the Main menu.";
        this.replyMarkup = {
            hide_keyboard: true
        };

        return super.getAnswer();
    }
}

export = CarCheck1Answer;
