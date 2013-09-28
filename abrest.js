(function (scope, euc, hasOwnProperty) {
    var Abrest = function (baseURL, defaultHeaders, defaultData, timeout) {
            this.baseURL = baseURL || ''
            this.timeout = timeout || 1000
            this.defaultHeaders = defaultHeaders || {}
            this.defaultData = defaultData || {}
        },
        noop = function () {},
        methods = ['get', 'post', 'put', 'delete']

    Abrest.prototype.ajax = function (method, url, data, headers, callback) {
        var xhr = new XMLHttpRequest(),
            setReqHeader = xhr.setRequestHeader,
            timeout = this.timeout,
            combineObjs = this.combineObjs,
            timer

        data = this.encode(combineObjs(this.defaultData, data))
        headers = combineObjs(this.defaultHeaders, headers)

        url = this.baseURL + url

        if (method === 'get' && data) {
            url += '?' + data
        }

        xhr.open(method, url)
        // This is just a default header
        setReqHeader('content-type', 'application/x-www-form-urlencoded')
        for (var header in headers) {
            if (headers[hasOwnProperty](header)) {
                setReqHeader(header, headers[header])
            }
        }

        if (timeout) {
            timer = setTimeout(function () {
                xhr.abort()
                callback(new Error('Timeout'))
            }, timeout)
        }

        xhr.onreadystatechange = function () {
            var status = xhr.status

            if (timeout) {
                clearTimeout(timer)
            }
            if (xhr.readyState === 4) {
                if ((status < 200 || status >= 300) && status !== 304) {
                    callback(new Error(status))
                }
                else {
                    callback(null, xhr.responseText)
                }
            }
        }

        if (method !== 'get' && data) {
            xhr.send(data)
        }
    }

    Abrest.prototype.combineObjs = function (defaults, overrides) {
        for (var j in defaults) {
            if (defaults[hasOwnProperty](j) && !overrides[j]) {
                overrides[j] = defaults[j]
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
                if (data[hasOwnProperty](k)) {
                    result += '&' + euc(k) + '=' + euc(data[k])
                }
            }
            return result === '' ? '' : result.substr(1)
        }
    }

    for (var i = 0; i < methods.length; i += 1) {
        (function (method) {
            Abrest.prototype[method] = function (url, data, headers, callback) {
                if (typeof data === 'function') {
                    callback = data
                    data = {}
                    headers = {}
                }
                else if (typeof headers === 'function') {
                    callback = headers
                    headers = {}
                }
                else if (typeof data === 'undefined') {
                    data = {}
                    headers = {}
                    callback = noop
                }
                else if (typeof headers === 'undefined') {
                    headers = {}
                    callback = noop
                }
                this.ajax.call(this, method, url, data, headers, callback)
            }
        }(methods[i]))
    }

    // OK, now Abrest is done. Time to attach it!
    // If there is an AMD module system here, use it.
    // Otherwise, add it to the 'this' variable (which is probably 'window')
    if (typeof define === 'function') {
        define(function () {
            return Abrest
        })
    }
    else {
        scope.Abrest = Abrest
    }
}(this, encodeURIComponent, 'hasOwnProperty'))
