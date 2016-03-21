/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import Answerable = require("../interfaces/answerable");

interface ForwardRoute {
    answer: Answerable;
    text: string;
}

export = ForwardRoute;
