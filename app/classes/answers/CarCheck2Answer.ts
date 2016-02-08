/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import Answer = require("../../types/Answer");
import BasicAnswer = require("./BasicAnswer");
import Utils = require("../Utils");

class CarCheck2Answer extends BasicAnswer  {

    isLastInChain(): boolean {
        return true;
    }

    isInputCorrect(): boolean {
        return (this.inputMessage.message.text.length === 3);
    }

    getAnswer(): Answer {
        let answer: Answer,
            plates = this.inputMessage.message.text;

        if (this.isInputCorrect()) {
            this.text = Utils.format("Plates {0} entered.", plates);
        } else {
            this.text = Utils.format("Wrong plate format: {0}.", plates);
        }

        answer = super.getAnswer();
        // Buttons
        answer.reply_markup = {
            keyboard: [[ "/Start" ]],
            resize_keyboard: true
        };

        return answer;
    }
}

export = CarCheck2Answer;
