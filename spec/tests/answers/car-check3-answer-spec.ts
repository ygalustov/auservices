/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import CarCheck3Answer = require("../../../app/classes/answers/car-check3-answer");
import Answer = require("../../../app/types/answer");
import InputMessage = require("../../../app/types/input-message");
import Utils = require("../../../app/classes/utils");

describe("CarCheck3Answer", () => {
    let a: CarCheck3Answer,
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
        a = new CarCheck3Answer();
        a.inputMessage = im;
    });

    it("is always last in chain", () => {
        expect(a.isLastInChain()).toBeTruthy();
    });

    it("accepts only alphanumeric characters", () => {
        a.inputMessage.message.text = "abc123";
        expect(a.isInputCorrect()).toBeTruthy();

        a.inputMessage.message.text = "plates01";
        expect(a.isInputCorrect()).toBeTruthy();

        a.inputMessage.message.text = "ab-asdf/sd21@!$^%*([])";
        expect(a.isInputCorrect()).toBeFalsy();

        a.inputMessage.message.text = "plates-01";
        expect(a.isInputCorrect()).toBeFalsy();
    });

    it("should return validation error response in TelegramBotApi format when input is not correct", (done) => {
        a.inputMessage.message.text = "plates-01";

        a.getAnswer((answer: Answer) => {
            expect(answer).toEqual({
                chat_id: im.message.chat.id,
                method: "sendMessage",
                parse_mode: "Markdown",
                reply_markup: {
                    hide_keyboard: true
                },
                text: Utils.format("Wrong plate format: {0}. Please try again.", a.inputMessage.message.text)
            });

            done();
        });
    });

    it("should return correct response in TelegramBotApi format when input validated", (done) => {
        a.inputMessage.message.text = "123";

        a.getAnswer((answer: Answer) => {
            expect(answer).toEqual({
                chat_id: im.message.chat.id,
                method: "sendMessage",
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [["/Start"]],
                    resize_keyboard: true
                },
                text: "1989 RED MERCEDES BENZ UNKNOWN SEDAN , VIN/Chassis: ********0359\n" +
                "The registration expires on 22/03/2016.\nThe CTP policy period end date is 22/03/2016.\nInsurer's name: GIO"
            });

            done();
        });
    });

    it("shouldn't have any routes", () => {
        expect(a.forwardRoutes).toBeUndefined();
    });

    it("should have input message", () => {
        expect(a.inputMessage).toBeDefined();
    });
});
