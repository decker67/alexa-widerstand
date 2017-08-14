'use strict';
const Alexa = require('alexa-sdk');
const widerstand = require('widerstand');
const APP_ID = 'amzn1.ask.skill.4a62b6d6-c8bd-4247-9ead-1e7ef1522298';

const languageStrings = {
    'de-DE': {
        'translation': {
            'SKILL_NAME': 'widerstand',
            'NO_RESISTO_VALUE_GIVEN_MESSAGE': 'Kein Widerstandswert angegeben.',
            'TOO_MUCH_DIGITS_MESSAGE': 'Das sind zuviele Stellen.',
            'COLOR_CODE_MESSAGE' : 'Der Widerstandswert hat die Farbkodierung ',

            'HELP_MESSAGE': "Du kannst mich nach einer Farbkodierung zu einem Widerstandswert fragen. Welchen Widerstandswert möchtest Du wissen?",
            'HELP_REPROMPT': "Was möchtest Du wissen?",
            'STOP_MESSAGE': 'Tschüss'
        }
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetResistorColorCoding');
    },
    'GetResistorColorCoding': function () {
        let speechOutput;
        let result;
        const resistorValueGiven = this.event.request.intent && this.event.request.intent.slots &&
            this.event.request.intent.slots.resistor && this.event.request.intent.slots.resistor.value;
        const resistorUnitGiven = this.event.request.intent && this.event.request.intent.slots &&
            this.event.request.intent.slots.unit && this.event.request.intent.slots.unit.value;
        //console.log(resistorValueGiven, JSON.stringify(this.event.request));
        if (!resistorValueGiven) {
            speechOutput = this.t('NO_RESISTO_VALUE_GIVEN_MESSAGE');
            result = 'NO_RESISTO_VALUE_GIVEN_MESSAGE';
        } else {
            result = widerstand.calculateColorCodes(
                this.event.request.intent.slots.resistor.value,
                resistorUnitGiven ? this.event.request.intent.slots.unit : undefined);
            speechOutput = result.message ?
                this.t(result.message) : this.t('COLOR_CODE_MESSAGE') + result.colorCode;
        }
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), result.colorCode || result);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t(HELP_MESSAGE);
        const reprompt = this.t(HELP_REPROMPT);
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    }
};