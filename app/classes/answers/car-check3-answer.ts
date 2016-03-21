/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import AnswerCallback = require("../../types/answer-callback");
import BasicAnswer = require("./basic-answer");
import Utils = require("../utils");
import RegoCheck = require("../../../scrapers/rego/rego-check");
import Scrapable = require("../../../scrapers/scrapable");
import ReplyMarkup = require("../../types/reply-markup");

class CarCheck3Answer extends BasicAnswer {
    private _text: string;

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
                    this._text = Utils.format("{0}\n{1}\n{2}\n{3}", details.details, details.rego, details.ctp, details.insurer);
                } else {
                    this._text = error;
                }
                super.getAnswer(cb);
            });
        } else {
            this._text = Utils.format("Wrong plate format: {0}. Please try again.", plates);
            super.getAnswer(cb);
        }
    }

    get replyMarkup(): ReplyMarkup {
        if (this.isInputCorrect()) {
            return {
                keyboard: [["/Start"]],
                resize_keyboard: true
            };
        } else {
            return {
                hide_keyboard: true
            };
        }
    }

    get text(): string {
        return this._text;
    }


}

export = CarCheck3Answer;
