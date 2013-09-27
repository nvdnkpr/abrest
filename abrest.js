(function (scope) {
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
            payload,
            timer

        url = this.baseURL + url
        data = data || {}
        payload = this.encode(data)
        callback = callback || noop

        if (method === 'GET' && payload) {
            url += '?' + payload
        }

        xhr.open(method, url)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        for (var defaultHeader in this.defaultHeaders) {
            if (this.defaultHeaders.hasOwnProperty(defaultHeader)) {
                xhr.setRequestHeader(defaultHeader, this.defaultHeaders[defaultHeader])
            }
        }
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

        if (method !== 'GET' && payload) {
            xhr.send(payload)
        }
    }

    Abrest.prototype.encode = function (data) {
        var result = ''

        if (typeof data === 'string') {
            return data
        }
        else {
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    result += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                }
            }
            return result
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
}(this))
