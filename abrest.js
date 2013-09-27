(function (scope) {
    var abrest = function (baseURL, defaultHeaders, defaultData, timeout) {
            var api = this

            api.baseURL = baseURL || ''
            api.timeout = timeout || 1000
            api.defaultHeaders = defaultHeaders || {}
            api.defaultData = defaultData || {}

            return api
        },
        encodeURI = function (data) {
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
        },
        noop = function () {}

    abrest.prototype.ajax = function (method, url, data, callback) {
        var xhr = new XMLHttpRequest(),
            payload = encodeURI(data),
            sentContentType = false,
            tid

        url = this.baseURL + url
        data = data || {}
        callback = callback || noop

        if (method === 'GET' && payload) {
            url += '?' + payload
        }

        xhr.open(method, url)
        for (var h in headers) {
            if (headers.hasOwnProperty(h)) {
                xhr.setRequestHeader(h, headers[h])
                if (h.toLowerCase() === 'content-type') {
                    sentContentType = true
                }
            }
        }
        if (!sentContentType) {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        }

        if (this.timeout) {
            tid = setTimeout(function () {
                xhr.abort()
                callback(new Error('Timeout'))
            }, this.timeout)
        }

        xhr.onreadystatechange = function () {
            if (this.timeout) {
                clearTimeout(tid)
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

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return abrest
        })
    }
    else {
        scope.abrest = abrest
    }
}(this))
