/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import Answer = require("./Answer");

interface AnswerCallback {
    (answer: Answer): void;
}

export = AnswerCallback;
