/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import IAnswer = require("../interfaces/IAnswer");

interface ForwardRoute {
    text: string;
    answer: IAnswer;
}

export = ForwardRoute;
