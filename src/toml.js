var toml = (function () {

    var parseGroup = function (str) {
        var start = str.indexOf('['), end = str.indexOf(']');
        return str.substring(start + 1, end);
    }

    var parse = function (str) {
        var result = {};

        if (str.charAt(0) === '[') {
            var group = parseGroup(str);
            result[group] = {};
        }

        return result;
    }

    return {
        parse: parse
    };

})();