/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com> All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import Scrapable = require("../scrapable");
import ScraperCallback = require("../scraper-callback");
import request = require("request");
import cheerio = require("cheerio");
import http = require("http");

class RegoCheck implements Scrapable {
    getResponse(requestData: string, cb: ScraperCallback) {
        let url1 = "https://www.myrta.com/wps/portal/extvp/myrta/rego/check-reg-history",
            plates = requestData;

        // STEP 1. Go to the form and fill plates and terms checkbox
        request.get(url1, function (error2: any, response2: http.IncomingMessage, body2: any) {
            // console.log(response2.headers);
            if (!error2) {

                let $ = cheerio.load(body2),
                    respCookie: string = response2.headers["set-cookie"][0], // There is always one cookie with java session
                    cookie: string = respCookie.substr(0, respCookie.indexOf(";")),
                    url2: string = "https://www.myrta.com" + $("#enterPlateNumberForm").attr("action"),
                    params = "enquiryRequest.plateNumber=" + plates + "&acceptTermCondFlag=true&_acceptTermCondFlag=on";


                // STEP 2. Send plates and make a request to get a link with results
                request({
                    body: params,
                    headers: {
                        "Cookie": cookie,
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Content-Length": params.length
                    },
                    method: "POST",
                    url: url2

                }, function (error3: any, response3: http.IncomingMessage, body3: any) {
                    if (!error3) {

                        // STEP 3. Grab result url from location header, request that url and populate results
                        request({
                            headers: {
                                "Cookie": cookie
                            },
                            method: "GET",
                            url: response3.headers.location

                        }, function (error4: any, response4: http.IncomingMessage, body4: any) {
                            let $ = cheerio.load(body4),
                                details = $("div.rms_plateDisplay div.rms_content p").html(),
                                ctp = $("#rms_report > ul:nth-child(6) > li:nth-child(1)").html(),
                                rego = $("#rms_report > ul:nth-child(4) > li:nth-child(1)").html(),
                                insurer = $("#rms_report > ul:nth-child(6) > li:nth-child(2)").html();

                            if (details) {
                                insurer = insurer.replace("&apos;", "'");

                                details = details.replace("<br>", " ")
                                    .replace(/\n\n+/g, "\n")
                                    .replace("\n", ", ")
                                    .replace(/\s\s+/g, " ")
                                    .replace("&amp;", "'")
                                    .replace(/\*/g, "-");

                                cb({
                                    ctp: ctp.trim(),
                                    details: details.trim(),
                                    insurer: insurer.trim(),
                                    plates: plates.trim(),
                                    rego: rego.trim()
                                }, null);
                            } else {
                                cb(null, "No such plates found.");
                            }
                        });
                    } else {
                        cb(null, "Internal error(3): " + error3);
                    }
                });
            } else {
                cb(null, "Internal error(2): " + error2);
            }
        });

    }
}

export = RegoCheck;
