/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

interface InputMessage {
    message: {
        message_id: number,
        from: {
            first_name: string
        },
        chat: {
            id: number
        },
        text: string
    };
}

export = InputMessage;
