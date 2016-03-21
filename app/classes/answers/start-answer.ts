/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import ReplyMarkup = require("../../types/reply-markup");
import ForwardRoute = require("../../types/forward-route");
import BasicAnswer = require("./basic-answer");
import Utils = require("../utils");
import CarCheck1Answer = require("./car-check1-answer");

class StartAnswer extends BasicAnswer {

    get text(): string {
        return Utils.format("Hello {0},\nI'm your personal assistant. Please choose what you would like to get.\n",
            this.inputMessage.message.from.first_name);
    }

    get replyMarkup(): ReplyMarkup {
        return {
            keyboard: [["Car check 🚗"]],
            resize_keyboard: true
        };
    }

    get forwardRoutes(): Array<ForwardRoute> {
        return [{
            answer: new CarCheck1Answer(),
            text: "carcheck"
        }];
    }
}

export = StartAnswer;
