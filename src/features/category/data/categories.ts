import { products } from '@/features/products/data/products'
import type { Category } from '../types/category.types'

const countProducts = (slug: string) =>
  products.filter((product) => product.categorySlug === slug).length

export const categories: Category[] = [
  {
    id: 1,
    name: 'Earrings',
    slug: 'earrings',
    collectionNumber: '01',
    badge: 'Curated Essentials',
    productCount: countProducts('earrings'),
    description:
      'Explore styles selected to complement your everyday look. Thoughtfully sculpted with fluid simplicity, tactile warmth, and recycled precious metals.',
    craftNote:
      'Every earring pair is handcrafted in small batches using 100% certified recycled precious metals.',
    consultationTitle: 'Looking for a custom ear stack?',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCnVU1M6cyRuupRbrAxNBTQWmMqroY7J76gsswvhQvL60zkRaHqj-L7Ovv9yLC9l5HxpfihcjQwPhaXRge8_T2VC9vuPBU09Y0LdzpP_B1BzRmW9PJOL7kMwoFOMYcHLpJ2kXRd002_mgv0UmOdGsSwY8IBoyemd8S6NApxEmMyFG-oOsX115BKde9AbmOJXD0cXNKhofzAw807mg8VYZu2HbsGXe9kWUJHhkANV1-',
  },
  {
    id: 2,
    name: 'Frames',
    slug: 'frames',
    collectionNumber: '02',
    badge: 'Artisanal Profiles',
    productCount: countProducts('frames'),
    description:
      'Explore thoughtfully selected frames to make your favourite moments stand out, milled from sustainable solid woods with archival mounts.',
    craftNote:
      'Every frame is milled from FSC-certified solid wood and finished with archival, acid-free mounts.',
    consultationTitle: 'Planning a gallery wall?',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTplEYRMl7XSgmVWv8es3gjLJl434H7wGb36-3DYyAAx3RbVR_DD8cybjgLACtKKa1DnOSrXN2zJ9C10E0Bf9X90XDY94LAqcrpds-UZ4XV_Z3quWScIuVKYwO83ItksfOxp5Ptj5rFyjxH4ftHzJNOQzZgYEmE0D9XeYMZSQFrwvY0pks5HIEp_U29SYO3wWoKiNvrQ9NYsW2fhlCLOqQfMkWFNJBdeitnVTlsHbB',
  },
]

export const getCategoryBySlug = (slug?: string) =>
  categories.find((category) => category.slug === slug)
