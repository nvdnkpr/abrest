(function (scope) {
    var abrest = function () {
        var api = this

        return api
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return abrest
        })
    }
    else {
        scope.abrest = abrest
    }
}(this))
