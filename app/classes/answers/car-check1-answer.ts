/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./basic-answer");
import CarCheck2Answer = require("./car-check2-answer");
import ForwardRoute = require("../../types/forward-route");
import ReplyMarkup = require("../../types/reply-markup");

class CarCheck1Answer extends BasicAnswer {

    get text(): string {
        return "Select you State or hit /Start to return to the Main menu.";
    }

    get forwardRoutes(): Array<ForwardRoute> {
        return [{
            answer: new CarCheck2Answer(),
            text: "nsw"
        }];
    }

    get replyMarkup(): ReplyMarkup {
        return {
            keyboard: [["NSW"]],
            resize_keyboard: true
        };
    }
}

export = CarCheck1Answer;
