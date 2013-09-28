var instance = new Abrest() // Instance variable that's share amongst all of the helper tests

describe('encode', function () {
    var encode = instance.encode
    it('should know how to encode a single parameter', function () {
        expect(encode({
            foo: 'bar'
        })).to.equal('foo=bar')
    })
    it('should know how to encode multiple parameters', function () {
        expect(encode({
            foo: 'bar',
            bar: 'foo'
        })).to.equal('foo=bar&bar=foo')
    })
    it('should know how to encode a null set of parameters', function () {
        expect(encode({})).to.equal('')
    })
})
