var toml = (function () {

    var parseGroup = function (context, result, str) {
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
            var current = result[group] = {};
            context.currentGroup = current;
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
    };

    var parseExpression = function (context, result, line) {
        var pair = parseNameValue(line);
        var value = parseValue(pair.value);
        var currentGroup = context.currentGroup || result;

        currentGroup[pair.name] = value;

        function parseNameValue(line) {
            var equal = line.indexOf('=');
            return {
                name: line.substring(0, equal),
                value: line.substring(equal + 1)
            };
        }

        function parseValue(value) {
            if (array(value)) {
                return parseArray(value);
            }

            return parsePrimitive(value);

            function array(value) {
                return value.charAt(0) === '[' && value.charAt(value.length - 1) === ']';
            }
        }

        function parseArray(value) {
            var values = parseArrayValues(value);
            return values.map(function(v) {
                return parseValue(v);
            });

            function parseArrayValues(value) {
                var parsed = [];
                var array = value.substring(1, value.length - 1);
                var map = commasMap(array);
                map.reduce(function(prev, next) {
                    parsed.push(array.substring(prev + 1, next));
                    return next;
                }, -1);

                return parsed;

                function commasMap(value) {
                    var map = [];
                    var inArray = false, depth = 0;
                    for(var index = 0; index < value.length; index++) {
                        var element = value[index];
                        if (element === '[') {
                            depth++;
                        } else if (element === ']') {
                            depth--;
                        }

                        if (element === ',' && depth === 0) {
                            map.push(index);
                        }
                    }

                    map.push(value.length);

                    return map;
                }
            }
        }

        function parsePrimitive(value) {
            if (date(value)) {
                return new Date(value);
            }

            return eval(value);

            function date(value) {
                return (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/).test(value);
            }
        }
    };

    var parseLine = function (context, result, line) {
        if (group(line)) {
            parseGroup(context, result, line);
        } else if (expression(line)) {
            parseExpression(context, result, line);
        } else if (empty(line)) {
            resetContext();
        }

        function group(line) {
            return line.charAt(0) === '[';
        }

        function expression(line) {
            return line.indexOf('=') > 0;
        }

        function empty(line) {
            return line === '';
        }

        function resetContext() {
            delete context.currentGroup;
        }
    };

    var parse = function (str) {
        var result = {}, context = {};
        var lines = str.toString().split('\n');

        lines.forEach(function (line) {
            line = stripComments(replaceWhitespaces(line));
            parseLine(context, result, line);
        });

        return result;

        function replaceWhitespaces(line) {
            return line.replace(/\s/g, '');
        }

        function stripComments(line) {
            return line.split('#')[0];
        }
    };

    return {
        parse: parse
    };

})();