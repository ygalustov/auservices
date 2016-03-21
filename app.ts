/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import express = require("express");
import bodyParser = require("body-parser");

import Consts = require("./app/classes/consts");
import Utils = require("./app/classes/utils");

import InputMessage = require("./app/types/input-message");
import Answer = require("./app/types/answer");
import Answerable = require("./app/interfaces/answerable");

import StartAnswer = require("./app/classes/answers/start-answer");
import UnknownAnswer = require("./app/classes/answers/unknown-answer");
import InProgressAnswer = require("./app/classes/answers/in-progress-answer");

// Setup
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let previousAnswers = {};

// Routers
app.post("/", function(req: any, res: any) {
    res.send(Consts.rootText);
});

app.post("/:token", function(req: any, res: any) {
    let im: InputMessage = req.body,
        answer: Answerable,
        normalizedText: string,
        prevAnswer: Answerable,
        wasMessageAccepted = false,
        i: number;

    if (Utils.isValidToken(req.params.token)) {
        normalizedText = Utils.normalizeText(im.message.text);
        prevAnswer = previousAnswers[im.message.chat.id];

        // Stop processing query if previous is still performing
        if (prevAnswer && prevAnswer.isInProgress) {
            answer = new InProgressAnswer();
            answer.inputMessage = im;
        } else {

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
                    answer = new UnknownAnswer();
                    answer.inputMessage = im;
                }
            } else {
                answer = new StartAnswer();
                answer.inputMessage = im;
                // Reset all routes after start
                previousAnswers[im.message.chat.id] = undefined;
            }

            // Extend the chain by the correct answer
            if (answer.isInputCorrect()) {
                answer.prevAnswer = previousAnswers[im.message.chat.id];
                previousAnswers[im.message.chat.id] = answer;
            }
        }

        res.set("Content-Type", "application/json");
        answer.isInProgress = true;
        answer.getAnswer((ans: Answer) => {
            res.send(ans);
            // Clear history if the answer is last in chain
            if (answer.isInputCorrect() && answer.isLastInChain()) {
                previousAnswers[im.message.chat.id] = undefined;
            }
            answer.isInProgress = false;
        });
    } else {
        res.sendStatus(500);
    }
});

app.listen(30001, function() {
    console.log("Australian Services bot started on port 30001!");
});
