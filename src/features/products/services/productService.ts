const PRODUCTS_ENDPOINT = '/api/products'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  image: string
}

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${PRODUCTS_ENDPOINT}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(`${PRODUCTS_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Failed to create product')
  }
  return response.json()
}
