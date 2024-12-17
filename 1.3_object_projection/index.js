function objectProjection(sourceObj, prototypeObj) {
    if (!sourceObj || !prototypeObj || typeof sourceObj !== 'object' || typeof prototypeObj !== 'object') {
        return {};
    }

    const result = {};

    for (const key in prototypeObj) {
        if (key in sourceObj) {
            if (prototypeObj[key] && typeof prototypeObj[key] === 'object') {
                const projectedSubObject = objectProjection(sourceObj[key], prototypeObj[key]);
                if (projectedSubObject !== undefined) {
                    result[key] = projectedSubObject;
                }
            } else {
                result[key] = sourceObj[key];
            }
        }
    }

    return result;

}

const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31,
            prop32: 32
        }
    },
    prop12: 12
}

const proto = {
    prop11: {
        prop22: null
    },
}

const projectedObj = objectProjection(src, proto)

console.log(projectedObj);

// to log testing result run node 1.3_object_projection
