/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import StartAnswer = require("../../../app/classes/answers/start-answer");
import Answer = require("../../../app/types/answer");
import InputMessage = require("../../../app/types/input-message");
import Utils = require("../../../app/classes/utils");

describe("StartAnswer", () => {
    let a: StartAnswer,
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
        a = new StartAnswer();
        a.inputMessage = im;
    });

    it("is always not last in chain", () => {
        expect(a.isLastInChain()).toBeFalsy();
    });

    it("should return correct TelegramBotApi response", (done) => {
        a.getAnswer((answer: Answer) => {
            expect(answer).toEqual({
                chat_id: im.message.chat.id,
                method: "sendMessage",
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [["Car check 🚗"]],
                    resize_keyboard: true
                },
                text: Utils.format("Hello {0},\nI'm your personal assistant. Please choose what you would like to get.\n", im.message.from.first_name)
            });

            done();
        });
    });

    it("should have just one route", () => {
        expect(a.forwardRoutes.length).toBe(1);
        expect(a.forwardRoutes[0].text).toEqual("carcheck");
    });

    it("should have input message", () => {
        expect(a.inputMessage).toBeDefined();
    });

    it("should have response text", () => {
        expect(a.text).toBe(Utils.format("Hello {0},\nI'm your personal assistant. Please choose what you would like to get.\n", im.message.from.first_name));
    });

    it("should have reply markup", () => {
        expect(a.replyMarkup).toEqual({
            keyboard: [["Car check 🚗"]],
            resize_keyboard: true
        });
    });
});
