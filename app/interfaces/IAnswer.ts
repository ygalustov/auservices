/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import AnswerCallback = require("../types/AnswerCallback");
import ForwardRoute = require("../types/ForwardRoute");
import InputMessage = require("../types/InputMessage");

interface IAnswer {
    forwardRoutes: Array<ForwardRoute>;
    inputMessage: InputMessage;
    prevAnswer: IAnswer;
    text: string;
    isInProgress: boolean;

    isInputCorrect(): boolean;
    isLastInChain(): boolean;

    getAnswer(cb: AnswerCallback);
}

export = IAnswer;
