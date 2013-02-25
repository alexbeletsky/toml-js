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

            describe('of floats', function () {
                beforeEach(function () {
                    result = toml.parse('foo=[1.1,2.2,3.3]');
                });

                it('should create array of floats', function () {
                    expect(result.foo).to.eql([1.1,2.2,3.3]);
                });
            });

            describe('of strings', function () {
                beforeEach(function () {
                    result = toml.parse('foo=["one","two","three"]');
                });

                it('should create array of string', function () {
                    expect(result.foo).to.eql(["one","two","three"]);
                });
            });

            describe('of multiple types', function () {
                beforeEach(function () {
                    result = toml.parse('foo=["one",1,2.2]');
                });

                it('should create array of multiple types', function () {
                    expect(result.foo).to.eql(["one",1,2.2]);
                });
            });

            describe('nested arrays', function () {
                beforeEach(function () {
                    result = toml.parse('foo=[1,2,[1,2,3]]');
                });

                it('should create nested arrays', function () {
                    expect(result.foo).to.eql([1,2,[1,2,3]]);
                });

                describe('with different types', function () {
                    beforeEach(function () {
                        result = toml.parse('foo=[[1,2],["a","b","c"]]');
                    });

                    it('should create nested arrays', function () {
                        expect(result.foo).to.eql([[1,2],["a","b","c"]]);
                    });
                });
            });

        });

    });
});