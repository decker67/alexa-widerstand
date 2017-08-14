const widerstand = require('../src/widerstand');
const expect = require('chai').expect;


describe('widerstand', function () {
    it('creates the correct color code for 1 Ohm', function() {
        let colorCode = widerstand.calculateColorCodes(1);
        expect(colorCode.colorCode).to.equal('braun schwarz');
    });

    it('creates the correct color code for 10 Ohm', function() {
        let colorCode = widerstand.calculateColorCodes(10);
        expect(colorCode.colorCode).to.equal('braun braun');
    });

    it('creates the correct color code for 4700 Ohm', function() {
        let colorCode = widerstand.calculateColorCodes(4700);
        expect(colorCode.colorCode).to.equal('gelb violett rot');
    });
});