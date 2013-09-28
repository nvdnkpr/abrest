var Abrest = function (baseURL, defaultHeaders, defaultData, timeout) {
        this.baseURL = baseURL || ''
        this.timeout = timeout || 1000
        this.defaultHeaders = defaultHeaders || {}
        this.defaultData = defaultData || {}

        return this
    },
    noop = function () {},
    methods = ['get', 'post', 'put', 'delete']

Abrest.prototype.request = function (method, url, data, headers, callback) {
    var xhr = new XMLHttpRequest(),
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
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, headers[header])
        }
    }

    if (timeout) {
        timer = setTimeout(function () {
            xhr.abort()
            callback(new Error('Timeout'))
        }, timeout)
    }

    xhr.onreadystatechange = function () {
        if (timeout) {
            clearTimeout(timer)
        }
        if (xhr.readyState === 4) {
            if (!xhr.status) {
                callback(new Error('No Status'))
            }
            else if ((xhr.status < 200 || xhr.status >= 300) && xhr.status !== 304) {
                callback(new Error(xhr.status))
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
        if (defaults.hasOwnProperty(j) && typeof overrides[h=j] === 'undefined') {
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
            if (data.hasOwnProperty(k)) {
                result += '&' + euc(k) + '=' + euc(data[k])
            }
        }
        return result.length === 0 ? '' : result.substr(1)
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
            this.request.call(this, method, url, data, headers, callback)
        }
    }(methods[i]))
}

module.exports = Abrest
