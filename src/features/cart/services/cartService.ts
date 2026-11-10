const CART_ENDPOINT = '/api/cart'

export interface CartItem {
  productId: string
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
}

export const getCart = async (): Promise<Cart> => {
  const response = await fetch(`${CART_ENDPOINT}`)
  if (!response.ok) {
    throw new Error('Failed to fetch cart')
  }
  return response.json()
}

export const addToCart = async (item: CartItem): Promise<Cart> => {
  const response = await fetch(`${CART_ENDPOINT}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  if (!response.ok) {
    throw new Error('Failed to add item to cart')
  }
  return response.json()
}

export const removeFromCart = async (productId: string): Promise<Cart> => {
  const response = await fetch(`${CART_ENDPOINT}/items/${productId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to remove item from cart')
  }
  return response.json()
}
