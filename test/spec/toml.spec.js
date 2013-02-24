describe('toml.js spec', function () {
    var result;

    describe('toml construction', function () {
        it ('should exist', function () {
            expect(toml).to.be.ok;
        })
    });

    describe('when parsing a comment', function () {
        beforeEach(function () {
            result = toml.parse('# comment');
        });

        it ('should be empty object', function () {
            expect(result).to.be.empty;
        });
    });

    describe('when parsing a group', function () {
        beforeEach(function () {
            result = toml.parse('[group]');
        });

        it ('should create new group', function () {
            expect(result.group).to.be.ok;
        });

        describe('nested group', function () {
            beforeEach(function () {
                result = toml.parse('[group.sub]');
            });

            it('should create nested group', function () {
                expect(result.group.sub).to.be.ok;
            });
        });

        describe('multiple groups', function () {
            beforeEach(function () {
                result = toml.parse('[first]\n[second]');
            });

            it ('should create first group', function () {
                expect(result.first).to.be.ok;
            });

            it ('should create second group', function () {
                expect(result.second).to.be.ok;
            });
        });
    });

    describe('when parsing expression', function () {

        describe('for integer', function () {
            beforeEach(function () {
                result = toml.parse('foo=1');
            });

            it ('should create integer', function () {
                expect(result.foo).to.equal(1);
            });
        });
    });
});