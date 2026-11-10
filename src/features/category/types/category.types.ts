export interface Category {
  id: number
  name: string
  slug: string
  collectionNumber?: string
  badge?: string
  productCount?: number
  description?: string
  /** Short note shown in the listing sidebar ("Craft Guarantee") */
  craftNote?: string
  /** Consultation strip at the bottom of the listing page */
  consultationTitle?: string
  image: string
}
