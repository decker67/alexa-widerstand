
exports.calculateColorCodes = calculateColorCodes;

const colorValues = [
    'schwarz',
    'braun',
    'rot',
    'orange',
    'gelb',
    'grün',
    'blau',
    'violett',
    'grau',
    'weiß'
];

const unit = {
    'ohm': 1,
    'kiloohm': 1000,
    'megaohm': 1000000
};

function calculateColorCodes(resistorValue, resistorUnit) {
    const result = {
        colorCode: undefined,
        message: undefined
    };

    const factor = unit[resistorUnit];
    let value = resistorValue * factor ? factor : 1;
    let multiplicator = 0;
    while (value % 10 === 0) {
        value = value / 10;
        multiplicator++;
    }

    const multiplicatorColor = colorValues[multiplicator];
    const valueLength = ('' + value).length;
    if (valueLength > 2) {
        result.message = 'TOO_MUCH_DIGITS_MESSAGE'
    } else {
        let colorCode = '';
        while (value !== 0) {
            colorCode = (colorValues[value % 10] + ' ') + colorCode;
            value = (value / 10) >> 0;
        }
        colorCode += multiplicatorColor;
        result.colorCode = colorCode;
    }
    return result;
}

