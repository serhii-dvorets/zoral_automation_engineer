function objectProjection(sourceObj, prototypeObj) {
    if (!sourceObj || !prototypeObj || typeof sourceObj !== 'object' || typeof prototypeObj !== 'object') {
        return {};
    }

    const result = {};

    for (const key in prototypeObj) {
        if (key in sourceObj) {
            if (Array.isArray(sourceObj[key])) {
                
                result[key] = sourceObj[key];

            } else if (typeof prototypeObj[key] === 'object' && typeof sourceObj[key] === 'object' && prototypeObj[key] !== null && sourceObj[key] !== null) {
                if (!Object.keys(prototypeObj[key]).length) {
                    result[key] = sourceObj[key]
                } else {
                    const projectedSubObject = objectProjection(sourceObj[key], prototypeObj[key]);
    
                    if (projectedSubObject !== undefined) {
                        result[key] = projectedSubObject;
                    }
                }

            } else {
                result[key] = sourceObj[key];
            }
        }
    }

    return result;
}

const testCases = [
    // {
    //     testId: 1,
    //     src: {
    //         prop11: {
    //             prop21: 21,
    //             prop22: {
    //                 prop31: 31,
    //                 prop32: 32
    //             }
    //         },
    //         prop12: 12
    //     },
    //     proto:  {
    //         prop11: {
    //             prop22: null
    //         },
    //     }, 
    //     expected: {
    //         prop11: {
    //             prop22: {
    //                 prop31: 31,
    //                 prop32: 32
    //             }
    //         },
    //     },
    // },
    // {
    //     testId: 2,
    //     src: { a: 1, b: 2, c: 3 },
    //     proto:  { a: true, c: true }, 
    //     expected: { a: 1, c: 3 }
    // },
    // {
    //     testId: 3,
    //     src: {
    //         a: 1,
    //         b: { x: 10, y: 20 },
    //         c: 3
    //     },
    //     proto:  {
    //         b: { x: true }
    //     }, 
    //     expected: { b: { x: 10 } }
    // },
    // {
    //     testId: 4,
    //     src: { a: null, b: undefined, c: 3 },
    //     proto: { a: true, b: true, c: true }, 
    //     expected: { a: null, b: undefined, c: 3 }
    // },
    // {
    //     testId: 5,
    //     src: { a: 1, b: 2 },
    //     proto: Object.assign(Object.create({ c: true }), { a: true }), 
    //     expected: { a: 1 }
    // },
    // {
    //     testId: 6,
    //     src: {},
    //     proto: { a: true, b: true }, 
    //     expected: {}
    // },
    // {
    //     testId: 7,
    //     src: { a: 1, b: 2 },
    //     proto: {}, 
    //     expected: {}
    // },
    // {
    //     testId: 8,
    //     src: {
    //         a: {
    //             b: {
    //                 c: {
    //                     d: 10
    //                 },
    //                 e: 20
    //             }
    //         },
    //         f: 5
    //     },
    //     proto: {
    //         a: {
    //             b: {
    //                 c: { d: true }
    //             }
    //         }
    //     }, 
    //     expected: {
    //         a: {
    //             b: {
    //                 c: { d: 10 }
    //             }
    //         }
    //     }
    // },
    // {
    //     testId: 9,
    //     src: { a: 1, b: { x: 10 } },
    //     proto: { a: { x: true } }, 
    //     expected: { a: 1 }
    // },
    // {
    //     testId: 10,
    //     src: { a: [1, 2, 3], b: 2 },
    //     proto: { a: [true] }, 
    //     expected: { a: [1, 2, 3] }
    // },
    {
        testId: 11,
        src: {
            prop22: null,           //prop22
            prop33: {
                prop331: 1,         //prop33.prop331
                prop332:2           //prop33.prop332
            },
            prop11: {
                prop111: "value",   //prop11.prop111
                prop112: {
                    prop112: null   //prop11.prop112.prop112
                }
            }
        },
        proto: {
            prop11: {
                prop22: null,       //prop11.prop22
                prop111: {
                    prop111: null   //prop11.prop111.prop111
                },
                prop112: null       //prop11.prop112
            },
            prop33: {},                 //prop33
            prop22: 2                   //prop22
        },
        expected: {
            prop11: {
                prop111: "value",
                prop112: {
                    prop112: null   //prop11.prop112.prop112
                }
            },
            prop33: {
                prop331: 1,         //prop33.prop331
                prop332:2           //prop33.prop332
            },
            prop22: null,
        }
    },
]

testCases.forEach(({testId, src, proto, expected}) => {
    const projectedObj = objectProjection(src, proto)
    
    console.log(projectedObj);
    
    console.log({
        testId,
        positiveResult: JSON.stringify(projectedObj) === JSON.stringify(expected)
    });
})
