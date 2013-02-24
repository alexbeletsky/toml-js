var toml = (function () {

    var parseGroup = function (result, str) {
        var group = parseGroupName(str);
        if (group.indexOf('.') !== -1) {
            var groups = parseSubGroups(group);
            addGroups(result, groups);
        } else {
            addGroup(result, group);
        }

        function parseGroupName(str) {
            var start = str.indexOf('['), end = str.indexOf(']');
            return str.substring(start + 1, end);
        }

        function parseSubGroups(str) {
            return str.split('.');
        }

        function addGroup(result, group) {
            result[group] = {};
        }

        function addGroups(result, groups) {
            groups.reduce(function (prev, current) {
                if (!result[prev]) {
                    addGroup(result, prev);
                }
                addGroup(result[prev], current);
                return current;
            });
        }
    }

    var parse = function (str) {
        var result = {};

        if (str.charAt(0) === '[') {
            parseGroup(result, str);
        }

        return result;
    }

    return {
        parse: parse
    };

})();