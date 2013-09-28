describe('basic behavior tests', function () {
    it('should use defaults when no info is given', function () {
        var instance = new Abrest()
        expect(instance).to.not.be.undefined
        expect(instance.timeout).to.equal(1000)
        expect(instance.baseURL).to.equal('')
        expect(instance.defaultHeaders).to.be.an.object
        expect(instance.defaultData).to.be.an.object
    })
})
