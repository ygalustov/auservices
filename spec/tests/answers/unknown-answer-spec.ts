/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import UnknownAnswer = require("../../../app/classes/answers/unknown-answer");
import Answer = require("../../../app/types/answer");
import InputMessage = require("../../../app/types/input-message");

describe("UnknownAnswer", () => {
    let a: UnknownAnswer,
        im: InputMessage;

    beforeEach(function() {
        im = {
            message: {
                message_id: 12345678,
                from: {
                    first_name: "Yury"
                },
                chat: {
                    id: 87654321
                },
                text: "/start"
            }
        };
        a = new UnknownAnswer();
        a.inputMessage = im;
    });

    it("is always last in chain", () => {
        expect(a.isLastInChain()).toBeTruthy();
    });

    it("should return correct TelegramBotApi response", (done) => {
        a.getAnswer((answer: Answer) => {
            expect(answer).toEqual({
                chat_id: im.message.chat.id,
                method: "sendMessage",
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [["/Start"]],
                    resize_keyboard: true
                },
                text: "Unfortunately I cannot understand you.\nType /Start to open menu."
            });

            done();
        });
    });

    it("doesn't have any routes", () => {
        expect(a.forwardRoutes).toBeUndefined();
    });

    it("cannot be in progress state", () => {
        expect(a.isInProgress).toBeFalsy();
    });

    it("should have input message", () => {
        expect(a.inputMessage).toBeDefined();
    });

    it("should have response text", () => {
        expect(a.text).toBe("Unfortunately I cannot understand you.\nType /Start to open menu.");
    });

    it("should have reply markup", () => {
        expect(a.replyMarkup).toEqual({
            keyboard: [["/Start"]],
            resize_keyboard: true
        });
    });
});
