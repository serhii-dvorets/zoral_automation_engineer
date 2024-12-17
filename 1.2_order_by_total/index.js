function orderByTotal(orders) {
    if (!Array.isArray(orders) || !orders?.length) return []

    return orders.map(({amount, quantity}) => ({
        amount, quantity, Total: amount * quantity
    })).sort((a, b) => a.Total - b.Total)
}

const ordersForTest = [
    {amount: 10000, quantity: 10},
    {amount: 5000, quantity: 0},
    {amount: 5000, quantity: 1},
    {amount: 10, quantity: 10},
    {amount: 55, quantity: 1},
]

const sortedOrders = orderByTotal(ordersForTest);

console.log({input: ordersForTest, output: sortedOrders});

// to log testing result run node 1.2_order_by_total
