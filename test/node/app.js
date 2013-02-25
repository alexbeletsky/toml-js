var fs = require('fs');
var toml = require('../../lib/amd/toml');

fs.readFile('example.toml', function (err, data) {
    var parsed = toml.parse(data);
    console.log(parsed);
});
