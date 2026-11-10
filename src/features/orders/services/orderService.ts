const ORDERS_ENDPOINT = '/api/orders'

export interface Order {
  id: string
  userId: string
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  total: number
  status: string
  createdAt: string
}

export interface CreateOrderPayload {
  items: Order['items']
  total: number
}

export const getAllOrders = async (userId: string): Promise<Order[]> => {
  const response = await fetch(`${ORDERS_ENDPOINT}?userId=${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  return response.json()
}

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const response = await fetch(`${ORDERS_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Failed to create order')
  }
  return response.json()
}
