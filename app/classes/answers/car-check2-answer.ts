/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import BasicAnswer = require("./basic-answer");
import CarCheck3Answer = require("./car-check3-answer");
import ReplyMarkup = require("../../types/reply-markup");
import ForwardRoute = require("../../types/forward-route");

class CarCheck2Answer extends BasicAnswer {

    get replyMarkup(): ReplyMarkup {
        return {
            hide_keyboard: true
        };
    }

    get forwardRoutes(): Array<ForwardRoute> {
        return [{
            answer: new CarCheck3Answer(),
            text: "*"
        }];
    }

    get text(): string {
        return "Enter your car plates or hit /Start to return to the Main menu.";
    }
}

export = CarCheck2Answer;
