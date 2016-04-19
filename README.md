# Collection of web services for Messengers

This set gets public information from various australian websites and convert it into Microsoft Bot Framework format, which transmit data to one of the messengers.
Currently supported Telegram and Slack.

## The current list of services

1. Car registration checking for NSW State in Australia.

## Testing services

To test run Telegram or Slack and start conversation with *AustralianServicesBot*.

If you don't have Telegram application go to https://telegram.org/ and download it for free.

To get Slack go to https://slack.com/

# Installation

## Global dependencies

It uses ```Jasmin2``` to run tests and ```Typings``` for TypeDefinitions delivery.

In addition, ```TSLint``` used to check source code quality.

So before working install the following:

    npm install
    
## Run tests
    
    npm test