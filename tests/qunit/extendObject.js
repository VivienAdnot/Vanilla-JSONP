QUnit.module("extendObject");

QUnit.test("extendObject", function (assert) {
    // valid

    var source = {
        prop1: "123",
        prop2: "456",
        propO: {
            A: "1",
            B: "2",
            testArray2: [10, 12]
        }
    };

    var dest = {
        prop3: "789",
        prop4: "ABC",
        propO: {
            A: "10",
            C: "110",
            testArray1: [1, 2, 3],
            testArray3: [
                {
                    sub1: "test",
                    sub2: [
                        7,
                        8,
                        {
                            test: 9
                        }
                    ]
                }
            ],
            propO1: {
                test: "1"
            }
        }
    };

    var expectedResult = {
        prop1: "123",
        prop2: "456",
        prop3: "789",
        prop4: "ABC",
        propO: {
            A: "10",
            B: "2",
            C: "110",
            testArray1: [1, 2, 3],
            testArray2: [10, 12],
            testArray3: [
                {
                    sub1: "test",
                    sub2: [
                        7,
                        8,
                        {
                            test: 9
                        }
                    ]
                }
            ],
            propO1: {
                test: "1"
            }
        }
    };
    
    var mergeResult = app.Framework.extendObject(source, dest);
    assert.equal(_.isEqual(mergeResult, expectedResult), true, "merge source with dest ok");

    // invalid

    var wrongType1 = "this is a string";
    var wrongType2 = 1;
    var wrongType3 = function () {
        return null;
    }

    var notEmptyArray = [1, 2, 3];

    var notEmptyObject1 = { test: "test" };
    var notEmptyObject2 = { prop: "prop" };

    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, undefined), notEmptyObject1), true, "notEmptyObject1 unchanged");
    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, undefined), notEmptyObject2), false, "notEmptyObject1 unchanged");
    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, null), notEmptyObject1), true, "notEmptyObject1 unchanged");
    assert.equal(_.isEqual(app.Framework.extendObject(notEmptyObject1, {}), notEmptyObject1), true, "notEmptyObject1 unchanged");
});