/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import AnswerCallback = require("../types/answer-callback");
import ForwardRoute = require("../types/forward-route");
import InputMessage = require("../types/input-message");

interface Answerable {
    forwardRoutes: Array<ForwardRoute>;
    inputMessage: InputMessage;
    prevAnswer: Answerable;
    text: string;
    isInProgress: boolean;

    isInputCorrect(): boolean;
    isLastInChain(): boolean;

    getAnswer(cb: AnswerCallback);
}

export = Answerable;
