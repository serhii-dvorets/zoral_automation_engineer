function orderByTotal(orders, order) {
    const asc = order === 'asc'
    if (!Array.isArray(orders) || !orders?.length) return []

    return orders.map(({amount, quantity}) => ({
        amount, quantity, Total: amount * quantity
    })).sort((a, b) => asc ? a.Total - b.Total : b.Total - a.Total)
}

const ordersForTest = [
    {amount: 10000, quantity: 10},
    {amount: 5000, quantity: 0},
    {amount: 5000, quantity: 1},
    {amount: 10, quantity: 10},
    {amount: 55, quantity: 1},
]

const sortedOrders = orderByTotal(ordersForTest, 'desc');

console.log({input: ordersForTest, output: sortedOrders});
