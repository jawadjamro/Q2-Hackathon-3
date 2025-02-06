import { type SchemaTypeDefinition } from 'sanity'
import product from "./product"
import banner from './banner'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, banner, order],
}
