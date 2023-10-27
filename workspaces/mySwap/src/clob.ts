type Order = {
  id: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
};

type OrderBook = Order[];

function placeOrder(order: Order, orderBook: OrderBook): OrderBook {
  const newOrderBook = [...orderBook, order];
  newOrderBook.sort((a, b) => b.price - a.price);
  return newOrderBook;
}

function cancelOrder(id: string, orderBook: OrderBook): OrderBook {
  return orderBook.filter(order => order.id !== id);
}

function matchOrders(orderBook: OrderBook): { matchedOrders: Order[], newOrderBook: OrderBook } {
  const matchedOrders: Order[] = [];
  const newOrderBook = orderBook.filter(order => {
    const match = orderBook.find(o => o.type !== order.type && o.price === order.price);
    if (match) {
      matchedOrders.push(order, match);
      return false;
    }
    return true;
  });
  return { matchedOrders, newOrderBook };
}
