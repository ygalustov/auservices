/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import express = require("express");
import bodyParser = require("body-parser");

import Consts = require("./app/classes/Consts");
import Utils = require("./app/classes/Utils");

import InputMessage = require("./app/types/InputMessage");
import IAnswer = require("./app/interfaces/IAnswer");

import StartAnswer = require("./app/classes/answers/StartAnswer");
import UnknownAnswer = require("./app/classes/answers/UnknownAnswer");

// Setup
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let previousAnswers = {};

// Extend prototypes
Date.prototype.toLocaleDateString = function() {
    return this.getDate() + "/" + (this.getMonth() + 1) + "/" + this.getFullYear();
};

// Routers
app.post("/", function(req: any, res: any) {
    res.send(Consts.rootText);
});

app.post("/:token", function(req: any, res: any) {
    let im: InputMessage = req.body,
        answer: IAnswer,
        normalizedText: string,
        prevAnswer: IAnswer,
        wasMessageAccepted = false,
        i: number;

    if (Utils.isValidToken(req.params.token)) {
        normalizedText = Utils.normalizeText(im.message.text);
        prevAnswer = previousAnswers[im.message.chat.id];

        // Search for appropriate route (answer)
        if (prevAnswer && normalizedText !== Consts.welcomeMessage) {
            for (i = 0; i < prevAnswer.forwardRoutes.length; i++) {
                // Skip wildcard rule while comparing (wildcard processed only if there is no appropriate answer
                if (prevAnswer.forwardRoutes[i].text !== "*" && prevAnswer.forwardRoutes[i].text === normalizedText) {
                    wasMessageAccepted = true;
                    answer = prevAnswer.forwardRoutes[i].answer;
                    answer.inputMessage = im;
                }
            }
            if (!wasMessageAccepted) {
                // Now check wildcard if exists
                for (i = 0; i < prevAnswer.forwardRoutes.length; i++) {
                    if (prevAnswer.forwardRoutes[i].text === "*") {
                        wasMessageAccepted = true;
                        answer = prevAnswer.forwardRoutes[i].answer;
                        answer.inputMessage = im;
                    }
                }
            }
            // If there is not acceptable answer then show an error
            if (!wasMessageAccepted) {
                answer = new UnknownAnswer(im);
            }
        } else {
            answer = new StartAnswer(im);
            // Reset all routes after start
            previousAnswers[im.message.chat.id] = undefined;
        }

        if (answer.isInputCorrect()) {
            answer.prevAnswer = previousAnswers[im.message.chat.id];

            if (answer.isLastInChain()) {
                previousAnswers[im.message.chat.id] = undefined;
            } else {
                previousAnswers[im.message.chat.id] = answer;
            }
        }

        res.set("Content-Type", "application/json");
        res.send(answer.getAnswer());
    } else {
        res.sendStatus(500);
    }
});

app.listen(30001, function() {
    console.log("Example app listening on port 30001!");
});
