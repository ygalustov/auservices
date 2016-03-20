# Collection of web services for Telegram messenger

This set gets public information from various australian websites and convert it into TelegramBotApi format.

## The current list of services

1. Car registration checking for NSW state.

## Testing services
To test run Telegram application and start conversation with *AustralianServicesBot*.

If you don't have Telegram application go to https://telegram.org/ and download it for free.

# Installation

## Global dependencies

It uses Jasmin2 to run tests and TSD for typeDefinitions delivery.
In addition tslint is used to check source quality.

So before working install the following:

    npm install tsd -g
    npm install jasmin -g
    npm install tslint -g

## Local dependencies

All local dependencies (including TSD definitions) will be installed by the following command

    npm install
    
## Run test
    
    npm test    