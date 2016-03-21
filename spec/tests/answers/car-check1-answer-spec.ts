/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import CarCheck1Answer = require("../../../app/classes/answers/car-check1-answer");
import Answer = require("../../../app/types/answer");
import InputMessage = require("../../../app/types/input-message");

describe("CarCheck1Answer", () => {
    let a: CarCheck1Answer,
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
        a = new CarCheck1Answer();
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
                    keyboard: [["NSW"]],
                    resize_keyboard: true
                },
                text: "Select you State or hit /Start to return to the Main menu."
            });

            done();
        });
    });

    it("should have just one route", () => {
        expect(a.forwardRoutes.length).toBe(1);
        expect(a.forwardRoutes[0].text).toEqual("nsw");
    });

    it("should have input message", () => {
        expect(a.inputMessage).toBeDefined();
    });

    it("should have response text", () => {
        expect(a.text).toBe("Select you State or hit /Start to return to the Main menu.");
    });

    it("should have reply markup", () => {
        expect(a.replyMarkup).toEqual({
            keyboard: [["NSW"]],
            resize_keyboard: true
        });
    });
});
