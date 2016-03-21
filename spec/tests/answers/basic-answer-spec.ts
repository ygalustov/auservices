/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import BasicAnswer = require("../../../app/classes/answers/basic-answer");
import Answer = require("../../../app/types/answer");

describe("BasicAnswer", () => {
    let ba: BasicAnswer;

    beforeEach(function() {
        ba = new BasicAnswer();
    });

    it("shouldn't accept empty message text", () => {
        expect(ba.isInputCorrect()).toBeFalsy();
    });

    it("is always not last in chain", () => {
        expect(ba.isLastInChain()).toBeFalsy();
    });

    it("should return empty TelegramBotApi response", (done) => {
        ba.getAnswer((answer: Answer) => {
            expect(answer).toEqual({
                chat_id: undefined,
                method: undefined,
                parse_mode: undefined,
                reply_markup: undefined,
                text: undefined
            });

            done();
        });
    });

    it("doesn't have any routes", () => {
        expect(ba.forwardRoutes.length).toBe(0);
    });

    it("doesn't have previous answer", () => {
        expect(ba.prevAnswer).toBeUndefined();
    });

    it("cannot be in progress state", () => {
        expect(ba.isInProgress).toBeFalsy();
    });

    it("doesn't have input message", () => {
        expect(ba.inputMessage).toBeUndefined();
    });

    it("doesn't have response text", () => {
        expect(ba.text).toBeUndefined();
    });

    it("doesn't have reply markup", () => {
        expect(ba.replyMarkup).toBeUndefined();
    });
});
