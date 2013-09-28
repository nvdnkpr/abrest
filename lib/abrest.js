var url = require('url'),
    http = require('http'),
    Abrest = function (baseURL, defaultHeaders, defaultData, timeout) {
        this.baseURL = baseURL || ''
        this.timeout = timeout || 1000
        this.defaultHeaders = defaultHeaders || {}
        this.defaultData = defaultData || {}

        return this
    },
    noop = function () {},
    methods = ['get', 'post', 'put', 'delete']

Abrest.prototype.request = function (method, url, data, headers, callback) {
    var options = url.parse(this.baseURL + url),
        combineObjs = this.combineObjs,
        request

    options.method = method
    options.headers = combineObjs(this.defaultHeaders, headers)

    request = http.request(options, function (res) {
        var data = ''

        if (!res.statusCode) {
            callback(new Error('No Status'))
        }
        else if ((res.statusCode < 200 || res.statusCode >= 300) && res.statusCode !== 304) {
            callback(new Error(res.statusCode))
        }
        else {
            res.setEncoding('utf8')
            res.on('data', function (chunk) {
                data += chunk
            })
            res.on('end', function () {
                callback(null, data)
            })
            callback(null)
        }
    })

    request.setTimeout(this.timeout, function () {
        callback(new Error('Timeout'))
    })

    request.write(this.encode.call(this, combineObjs(this.defaultData, data)))
    request.end()

    return request
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
                result += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
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
