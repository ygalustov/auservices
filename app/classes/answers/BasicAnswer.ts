/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import IAnswer = require("../../interfaces/IAnswer");
import InputMessage = require("../../types/InputMessage");
import Answer = require("../../types/Answer");
import ReplyMarkup = require("../../types/ReplyMarkup");
import ForwardRoute = require("../../types/ForwardRoute");

class BasicAnswer implements IAnswer {
    private _text: string;
    // Usually inputMessage is set during the routing process, so no assignment in the constructor
    private _inputMessage: InputMessage;
    private _forwardRoutes: Array<ForwardRoute>;
    private _prevAnswer: IAnswer;
    private _replyMarkup: ReplyMarkup;

    constructor() {
        this._forwardRoutes = [];
    }

    isLastInChain(): boolean {
        return false;
    }

    getAnswer(): Answer {
        if (this.isLastInChain() && this.isInputCorrect()) {
            this.replyMarkup = {
                keyboard: [["/Start"]],
                resize_keyboard: true
            };
        }

        return {
            chat_id: this.inputMessage.message.chat.id,
            method: "sendMessage",
            parse_mode: "Markdown",
            reply_markup: this.replyMarkup,
            text: this.text
        };
    }

    isInputCorrect(): boolean {
        return (this.inputMessage && this.inputMessage.message.text.length > 0);
    }

    get replyMarkup(): ReplyMarkup {
        return this._replyMarkup;
    }

    set replyMarkup(replyMarkup: ReplyMarkup) {
        this._replyMarkup = replyMarkup;
    }

    get text(): string {
        return this._text;
    }

    set text(text: string) {
        this._text = text;
    }

    get inputMessage(): InputMessage {
        return this._inputMessage;
    }

    set inputMessage(inputMessage: InputMessage) {
        this._inputMessage = inputMessage;
    }

    get forwardRoutes(): Array<ForwardRoute> {
        return this._forwardRoutes;
    }

    set forwardRoutes(forwardRoutes: Array<ForwardRoute>) {
        this._forwardRoutes = forwardRoutes;
    }

    get prevAnswer(): IAnswer {
        return this._prevAnswer;
    }

    set prevAnswer(answer: IAnswer) {
        this._prevAnswer = answer;
    }
}

export = BasicAnswer;
