mocha.ui('bdd')
mocha.reporter('html')
expect = chai.expect

describe('abrest', function() {
    it('', function () {
        expect(true).to.equal(true)
    })
})


if (window.mochaPhantomJS) {
    mochaPhantomJS.run()
}
else {
    mocha.run()
}
