/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com> All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import {Session} from "./botbuilder/Node/src/Session";
import {IDialogResult} from "./botbuilder/Node/src/dialogs/Dialog";
import {BotConnectorBot} from "./botbuilder/Node/src/bots/BotConnectorBot";
// import {TextBot} from "./botbuilder/Node/src/bots/TextBot"; // Uncomment TextBot related lines to test in local console 
import {CommandDialog} from "./botbuilder/Node/src/dialogs/CommandDialog";
import {Prompts} from "./botbuilder/Node/src/dialogs/Prompts";
import {ResumeReason} from "./botbuilder/Node/src/dialogs/Dialog";

import RegoCheck = require("./scrapers/rego/rego-check");
import Utils = require("./app/classes/utils");

let restify = require("restify");

let AuServicesBot: BotConnectorBot = new BotConnectorBot();
// let AuServicesBot = new TextBot();

AuServicesBot.add("/", new CommandDialog()
    .onDefault(function (session) {
        session.beginDialog("/start");
    })
);


AuServicesBot.add("/start", [
    function (session: Session) {
        Prompts.choice(session,
            "Hello, I'm your personal assistant. Please choose what you would like to get.",
            ["/carcheck 🚗"], {
                maxRetries: 3,
                retryPrompt: "To continue please select item from the list."
            });
    },
    function (session: Session, results: IDialogResult<any>) {
        if (results.resumed === ResumeReason.completed) {
            session.beginDialog("/carcheck");
        } else {
            session.reset("/");
        }
    }
]);

AuServicesBot.add("/carcheck", [
    function (session: Session, results: IDialogResult<any>) {
        Prompts.choice(session,
            "Select your State or hit /Start to return to the Main menu.",
            ["/NSW"], {
                maxRetries: 3,
                retryPrompt: "To continue please select item from the list."
            });

    },
    function (session: Session, results: IDialogResult<any>) {
        if (!results.response) {
            session.reset("/");
            return;
        }

        session.dialogData.state = results.response.index;
        Prompts.text(session, "Enter your car plates or hit /Start to return to the Main menu.");
    },
    function (session: Session, results: IDialogResult<any>, next: (results?: IDialogResult<any>) => void) {
        let rego: RegoCheck = new RegoCheck();
        console.log("2");
        session.dialogData.plates = results.response;
        session.dialogData.inProgress = true;
        rego.getResponse(session.dialogData.plates, (details: any, error: string) => {
            session.dialogData.inProgress = false;
            session.dialogData.details = details;
            next();
        });
    },
    function (session: Session, results: IDialogResult<any>) {
        console.log(session.dialogData);
        console.log("2");

        if (session.dialogData.inProgress) {
            session.send("The operation is in progress, please wait...");
        } else {
            session.endDialog("%s\n%s\n%s\n%s", session.dialogData.details.details, session.dialogData.details.rego, session.dialogData.details.ctp, session.dialogData.details.insurer);
        }
    },
]);

// AuServicesBot.listenStdin();

let server = restify.createServer({
    certificate: null,     // If you want to create an HTTPS server, pass in the PEM-encoded certificate and key
    key: null,             // If you want to create an HTTPS server, pass in the PEM-encoded certificate and key
    formatters: null,      //  Custom response formatters for res.send()
    log: {
        trace: function (text, type) {
            // Put empty implementation here to prevent debugger from corrupting. If leave 'log' as null then debugger will never step next to this line
        }
    },                     // You can optionally pass in a bunyan instance; not required
    name: "node-api",      // By default, this will be set in the Server response header, default is restify
    spdy: null,            // Any options accepted by node-spdy
    version: "1.1.3",      // A default version to set for all routes
    handleUpgrades: false  // Hook the upgrade event from the node HTTP server, pushing Connection: Upgrade requests through the regular request handling chain; defaults to false
});

server.use(AuServicesBot.verifyBotFramework(Utils.getBotCredentials()));

server.post("/v1/messages", AuServicesBot.listen());

server.listen(30001, function () {
    console.log("%s listening to %s", server.name, server.url);
});

