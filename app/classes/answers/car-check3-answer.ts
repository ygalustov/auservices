/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import AnswerCallback = require("../../types/answer-callback");
import BasicAnswer = require("./basic-answer");
import Utils = require("../utils");
import RegoCheck = require("../../../scrapers/rego/rego-check");
import Scrapable = require("../../../scrapers/scrapable");

class CarCheck3Answer extends BasicAnswer {
    isLastInChain(): boolean {
        return true;
    }

    isInputCorrect(): boolean {
        let reg = /^\w+$/;
        return reg.test(this.inputMessage.message.text);
    }

    getAnswer(cb: AnswerCallback) {
        let plates: string = this.inputMessage.message.text,
            rego: Scrapable;

        if (this.isInputCorrect()) {
            rego = new RegoCheck();
            rego.getResponse(plates, (details: any, error: string) => {
                if (!error) {
                    this.text = Utils.format("{0}\n{1}\n{2}\n{3}", details.details, details.rego, details.ctp, details.insurer);
                } else {
                    this.text = error;
                }
                super.getAnswer(cb);
            });
        } else {
            this.text = Utils.format("Wrong plate format: {0}. Please try again.", plates);

            this.replyMarkup = {
                hide_keyboard: true
            };
            super.getAnswer(cb);
        }
    }
}

export = CarCheck3Answer;