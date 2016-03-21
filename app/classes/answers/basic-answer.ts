/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import Answerable = require("../../interfaces/answerable");
import InputMessage = require("../../types/input-message");
import ReplyMarkup = require("../../types/reply-markup");
import ForwardRoute = require("../../types/forward-route");
import AnswerCallback = require("../../types/answer-callback");

/**
 * Basic class for all answers, shouldn't be used directly
 */
class BasicAnswer implements Answerable {
    private _text: string;
    // Usually inputMessage is set during the routing process, so no assignment in the constructor
    private _inputMessage: InputMessage;
    private _forwardRoutes: Array<ForwardRoute>;
    private _prevAnswer: Answerable;
    private _replyMarkup: ReplyMarkup;
    private _isInProgress: boolean;

    constructor() {
        this._forwardRoutes = [];
        this._isInProgress = false;
    }

    public getAnswer(cb: AnswerCallback) {
        if (this.isLastInChain() && this.isInputCorrect()) {
            this.replyMarkup = {
                keyboard: [["/Start"]],
                resize_keyboard: true
            };
        }

        if (this.inputMessage) {
            cb({
                chat_id: this.inputMessage.message.chat.id,
                method: "sendMessage",
                parse_mode: "Markdown",
                reply_markup: this.replyMarkup,
                text: this.text
            });
        } else {
            cb({
                chat_id: undefined,
                method: undefined,
                parse_mode: undefined,
                reply_markup: undefined,
                text: undefined
            });
        }
    };

    isLastInChain(): boolean {
        return false;
    }

    isInputCorrect(): boolean {
        return (this.inputMessage && this.inputMessage.message && this.inputMessage.message.text && this.inputMessage.message.text.length > 0);
    }

    get isInProgress(): boolean {
        return this._isInProgress;
    }

    set isInProgress(isInProgress: boolean) {
        this._isInProgress = isInProgress;
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

    get prevAnswer(): Answerable {
        return this._prevAnswer;
    }

    set prevAnswer(answer: Answerable) {
        this._prevAnswer = answer;
    }
}

export = BasicAnswer;
