import preview from '#.storybook/preview'
import { ProductDescription } from './ProductDescription'

const meta = preview.meta({
  title: 'Shop/ProductDescription',
  component: ProductDescription,
  parameters: {
    layout: 'padded',
  },
})

export default meta

export const Default = meta.story({
  args: {
    description:
      'The Storm Shell Parka is built for wet commutes, cold city evenings, and travel days where you need one layer to do everything. It balances weather protection with a clean silhouette, so it feels technical without looking overly outdoorsy.',
    highlights: [
      'Water-resistant shell with sealed seams',
      'Insulated interior for transitional weather',
      'Adjustable hood and storm cuffs',
      'Two zip pockets plus hidden passport pocket',
    ],
    details:
      'Designed for everyday wear, the parka uses a lightweight recycled shell fabric and a soft matte finish. The fit is relaxed enough for layering over knitwear, while the internal drawcord lets you shape the silhouette when needed.',
  },
})
