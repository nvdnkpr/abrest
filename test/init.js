mocha.ui('bdd')
mocha.reporter('html')
expect = chai.expect

describe('Abrest', function() {
    describe('helpers', function () {
        var instance = new Abrest() // Instance variable that's share amongst all of the helper tests

        describe('combineObjs', function () {
            var defaults = {'default thing': true, 'over-write me': false},
                overrides = {'over-write me': true, 'foo': 'bar'},
                combinations = instance.combineObjs(defaults, overrides)

            it('should inherit from the defaults', function () {
                expect(combinations['default thing']).to.equal(true)
            })
            it('should get stuff from the overrides', function () {
                expect(combinations['foo']).to.equal('bar')
            })
            it('should allow the overrides to override the defaults', function () {
                expect(combinations['over-write me']).to.equal(true)
            })
        })

    })
    describe('basic behavior tests', function () {
        it('should be attached to the global scope by default', function () {
            expect(Abrest).to.not.be.undefined
        })
        it('should use defaults when no info is given', function () {
            var instance = new Abrest()
            expect(instance).to.not.be.undefined
            expect(instance.timeout).to.equal(1000)
            expect(instance.baseURL).to.equal('')
            expect(instance.defaultHeaders).to.be.an.object
            expect(instance.defaultData).to.be.an.object
        })
    })
})


if (typeof window.mochaPhantomJS !== 'undefined') {
    mochaPhantomJS.run()
}
else {
    mocha.run()
}
