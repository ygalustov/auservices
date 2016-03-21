/*
 * Copyright (c) Yury Galustov <ygalustov@gmail.com All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 *
 */

import RegoCheck = require("../../../scrapers/rego/rego-check");

describe("RegoCheck", () => {
    let rego: RegoCheck;

    beforeEach(function() {
        rego = new RegoCheck();
    });

    it("should return Mercedes by '123' plates", (done) => {
        rego.getResponse("123", (details: any, error: string) => {
            expect(details.ctp).toBe("The CTP policy period end date is 22/03/2016.");
            expect(details.details).toBe("1989 RED MERCEDES BENZ UNKNOWN SEDAN , VIN/Chassis: ********0359");
            expect(details.insurer).toBe("Insurer's name: GIO");
            expect(details.plates).toBe("123");
            expect(details.rego).toBe("The registration expires on 22/03/2016.");

            done();
        });
    });

    it("should return Tiguan by 'ggg' plates", (done) => {
        rego.getResponse("ggg", (details: any, error: string) => {
            expect(details.ctp).toBe("The CTP policy period end date is 20/11/2016.");
            expect(details.details).toBe("2014 GREY VLK TIGUAN STATION WAGON , VIN/Chassis: ********5993");
            expect(details.insurer).toBe("Insurer's name: Allianz");
            expect(details.plates).toBe("ggg");
            expect(details.rego).toBe("The registration expires on 20/11/2016.");

            done();
        });
    });

    it("should return error for plates 'dev'", (done) => {
        rego.getResponse("dev", (details: any, error: string) => {
            expect(error).toBe("No such plates found.");

            done();
        });
    });


});
