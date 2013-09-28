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
