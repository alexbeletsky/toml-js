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
                expect(result.foo).to.eql(1);
            });
        });

        describe('for float', function () {
            beforeEach(function () {
                result = toml.parse('foo=1.23');
            });

            it ('should create float', function () {
                expect(result.foo).to.eql(1.23);
            });
        });

        describe('for boolean', function () {
            beforeEach(function () {
                result = toml.parse('foo=true');
            });

            it ('should create boolean', function () {
                expect(result.foo).to.eql(true);
            });
        });

        describe('for strings', function () {
            beforeEach(function () {
                result = toml.parse('foo="true"');
            });

            it ('should create boolean', function () {
                expect(result.foo).to.eql("true");
            });
        });

        describe('for dates', function () {
            beforeEach(function () {
                result = toml.parse('foo=2013-02-24T01:13:00Z');
            });

            it ('should create dates', function () {
                expect(result.foo).to.eql(new Date('2013-02-24T01:13:00Z'));
            });
        });

        describe('for arrays', function () {
            describe('of ints', function () {
                beforeEach(function () {
                    result = toml.parse('foo=[1,2,3]');
                });

                it('should create array of ints', function () {
                    expect(result.foo).to.eql([1,2,3]);
                });
            });
        });

    });
});