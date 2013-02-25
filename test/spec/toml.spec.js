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

            describe('of dates', function () {
                beforeEach(function () {
                    result = toml.parse('foo=[2013-02-24T01:13:00Z,2013-02-25T01:13:00Z]');
                });

                it('should create array of string', function () {
                    expect(result.foo).to.eql([new Date('2013-02-24T01:13:00Z'), new Date('2013-02-25T01:13:00Z')]);
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

                describe('nested nested', function () {
                    beforeEach(function () {
                        result = toml.parse('foo=[1,2,[3,4],5,[6,7,[8,9]]]');
                    });

                    it('should create nested arrays', function () {
                        expect(result.foo).to.eql([1,2,[3,4],5,[6,7,[8,9]]]);
                    });
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

        describe('when groups with expression', function () {
            describe('one group one expression', function () {
                beforeEach(function () {
                    result = toml.parse('[group]\nfoo=1');
                });

                it ('should parse group', function () {
                    expect(result.group).to.be.ok;
                });

                it ('should parse expression in group', function () {
                    expect(result.group.foo).to.eql(1);
                });
            });

            describe('one group two expressions', function () {
                beforeEach(function () {
                    result = toml.parse('[group]\nfoo=1\nboo=2');
                });

                it ('should parse group', function () {
                    expect(result.group).to.be.ok;
                });

                it ('should parse expression in group', function () {
                    expect(result.group.foo).to.eql(1);
                    expect(result.group.boo).to.eql(2);
                });
            });

            describe('one group with global expression', function () {
                beforeEach(function () {
                    result = toml.parse('global=1\n[group]\nfoo=1\nboo=2');
                });

                it ('should parse group', function () {
                    expect(result.group).to.be.ok;
                });

                it ('should parse expression in group', function () {
                    expect(result.global).to.eql(1);
                    expect(result.group.global).to.be.not.ok;
                });
            });

            describe('one group with global expression after', function () {
                beforeEach(function () {
                    result = toml.parse('[group]\nfoo=1\nboo=2\n\nglobal=1');
                });

                it ('should parse group', function () {
                    expect(result.group).to.be.ok;
                });

                it ('should parse expression in group', function () {
                    expect(result.global).to.eql(1);
                    expect(result.group.global).to.be.not.ok;
                });
            });

            describe('one group with subgroups', function () {
                beforeEach(function () {
                    result = toml.parse('[group]\nfoo=1\nboo=2\n\n[group.sub]\nmoo=1\n');
                });

                it ('should parse group', function () {
                    expect(result.group).to.be.ok;
                });

                it ('should parse sub group', function () {
                    expect(result.group.sub).to.be.ok;
                });

                it ('should parse expression in sub group', function () {
                    expect(result.group.sub.moo).to.eql(1);
                });
            });


        });

        describe('when spaces and comments', function () {
            describe('with comments', function () {
                beforeEach(function() {
                    result = toml.parse('# TOML begin\n[group]\n#TOML end');
                });

                it ('should be parsed', function () {
                    expect(result.group).to.be.ok;
                });

                describe('in the same line', function () {
                    beforeEach(function () {
                        result = toml.parse('[group] # comment');
                    });

                    it ('should be parsed', function () {
                        expect(result.group).to.be.ok;
                    });
                });
            });

            describe('with spaces', function () {
                describe('spaces before', function () {
                    describe('for group', function () {
                        beforeEach(function () {
                            result = toml.parse('   [group]');
                        });

                        it ('should skip spaces', function () {
                            expect(result.group).to.be.ok;
                        });
                    });

                    describe('for expression', function () {
                        beforeEach(function () {
                            result = toml.parse('   foo=1');
                        });

                        it ('should skip spaces', function () {
                            expect(result.foo).to.be.ok;
                        });
                    });
                });

                describe('spaces after', function () {
                    describe('for group', function () {
                        beforeEach(function () {
                            result = toml.parse('   [group]   ');
                        });

                        it ('should skip spaces', function () {
                            expect(result.group).to.be.ok;
                        });
                    });

                    describe('for expression', function () {
                        beforeEach(function () {
                            result = toml.parse('   foo=1   ');
                        });

                        it ('should skip spaces', function () {
                            expect(result.foo).to.be.ok;
                        });
                    });
                });

                describe('spaces in the middle', function () {
                    describe('for group', function () {
                        beforeEach(function () {
                            result = toml.parse('   [   group  ]   ');
                        });

                        it ('should skip spaces', function () {
                            expect(result.group).to.be.ok;
                        });
                    });

                    describe('for expression', function () {
                        beforeEach(function () {
                            result = toml.parse('   foo  =  1   ');
                        });

                        it ('should skip spaces', function () {
                            expect(result.foo).to.be.ok;
                        });

                        describe('for arrays', function () {
                            beforeEach(function () {
                                result = toml.parse('   foo  =  [1, 2,   4]   ');
                            });

                            it ('should skip spaces', function () {
                                expect(result.foo).to.be.ok;
                            });
                        });
                    });
                });
            });
        });
    });
});