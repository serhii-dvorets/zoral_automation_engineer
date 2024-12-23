Date.prototype.daysTo = function(date) {
    const dayInMs = 1000 * 60 * 60 * 24
    let inputDate = date

    if (['string', 'number'].includes(typeof date)) {
        inputDate = new Date(date);
    } else if (date instanceof Date) {
        inputDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    if (!(inputDate instanceof Date) || isNaN(inputDate.getTime())) {
        return 'wrong type of date'
    }
        
    const diff = inputDate.getTime() - this.getTime()

    return Math.floor(Math.abs(diff) / dayInMs)   
}

const testCases = {
    valid_input: [
        ['2024-12-25', '2024-12-01'],
        [1704067200000, '1970/01/01'],
        [1704067200000, 0],
        ['2024-12-20T08:29:45.077Z', '2024-12-26'],
        ['2024-12-20T08:29:45.077Z', '2024-12-20T23:00:00.000Z'],
        ['2024-12-22', '2024-12-21'],
        ['2024-12-21T00:00:01.000Z', '2024-12-22T00:00:00.000Z'],
        ['2024-12-23T00:00:00.000Z', '2024-12-23T01:00:00.000Z'],
        ['2024-12-21', '2024/12/22'],
    ],
    invalid_input: [
        ['9999-12-31', 'large date'],
        ['invalid-date', 'error'],
        [null, 'error'],
        [undefined, 'error'],
        [{}, 'error'],
        [12345, 'error'],
        [() => {}, 'error'],
    ]
};

Object.entries(testCases).forEach(([key, values]) => {
    values.forEach(([date1, date2]) => {
        const result = new Date(date1).daysTo(new Date(date2))
        console.log({key, date1, date2, result});
    })
})
