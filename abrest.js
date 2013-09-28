(function (scope, euc) {
    var Abrest = function (baseURL, defaultHeaders, defaultData, timeout) {
            var api = this

            api.baseURL = baseURL || ''
            api.timeout = timeout || 1000
            api.defaultHeaders = defaultHeaders || {}
            api.defaultData = defaultData || {}

            return api
        },
        noop = function () {}

    Abrest.prototype.ajax = function (method, url, data, headers, callback) {
        var xhr = new XMLHttpRequest(),
            timer

        data = this.encode(this.combineObjs(this.defaultData, data))
        headers = this.combineObjs(this.defaultHeaders, headers)

        url = this.baseURL + url
        callback = callback || noop

        if (method === 'GET' && data) {
            url += '?' + data
        }

        xhr.open(method, url)
        // This is just a default header
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        for (var header in headers) {
            if (headers.hasOwnProperty(header)) {
                xhr.setRequestHeader(header, headers[header])
            }
        }

        if (this.timeout) {
            timer = setTimeout(function () {
                xhr.abort()
                callback(new Error('Timeout'))
            }, this.timeout)
        }

        xhr.onreadystatechange = function () {
            if (this.timeout) {
                clearTimeout(timer)
            }
            if (xhr.readyState === 4) {
                if (!xhr.status) {
                    callback(new Error('No Status'))
                }
                else if ((xhr.status < 200 || xhr.status >= 300) && xhr.status !== 304) {
                    callback(new Error('HTTP Status Code ' + xhr.status))
                }
                else {
                    callback(null, xhr.responseText)
                }
            }
        }

        if (method !== 'GET' && data) {
            xhr.send(data)
        }
    }

    Abrest.prototype.combineObjs = function (defaults, overrides) {
        for (var i in defaults) {
            if (defaults.hasOwnProperty(i) && typeof overrides[i] === 'undefined') {
                overrides[i] = defaults[i]
            }
        }

        return overrides
    }

    Abrest.prototype.encode = function (data) {
        var result = ''

        if (typeof data === 'string') {
            return data
        }
        else {
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    result += '&' + euc(k) + '=' + euc(data[k])
                }
            }
            return result.length === 0 ? '' : result.substr(1)
        }
    }

    // OK, now Abrest is done. Time to attach it!
    // If there is an AMD module system here, use it.
    // Otherwise, add it to the 'this' variable (which is probably 'window')
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Abrest
        })
    }
    else {
        scope.Abrest = Abrest
    }
}(this, encodeURIComponent))
