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
