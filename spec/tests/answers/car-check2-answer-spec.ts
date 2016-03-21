/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import CarCheck2Answer = require("../../../app/classes/answers/car-check2-answer");
import Answer = require("../../../app/types/answer");
import InputMessage = require("../../../app/types/input-message");

describe("CarCheck2Answer", () => {
    let a: CarCheck2Answer,
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
        a = new CarCheck2Answer();
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
                    hide_keyboard: true
                },
                text: "Enter your car plates or hit /Start to return to the Main menu."
            });

            done();
        });
    });

    it("should have just one route", () => {
        expect(a.forwardRoutes.length).toBe(1);
        expect(a.forwardRoutes[0].text).toEqual("*");
    });

    it("should have input message", () => {
        expect(a.inputMessage).toBeDefined();
    });

    it("should have response text", () => {
        expect(a.text).toBe("Enter your car plates or hit /Start to return to the Main menu.");
    });

    it("should have reply markup", () => {
        expect(a.replyMarkup).toEqual({
            hide_keyboard: true
        });
    });
});
