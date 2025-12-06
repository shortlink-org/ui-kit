import preview from '#.storybook/preview'
import { useState, type ComponentProps } from 'react'
import { Basket } from './Basket'
import type { BasketProps } from './Basket'
import { Button } from '../../Button/Button'

const mockItems = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Zip Tote Basket',
    href: '#',
    color: 'White and black',
    price: '$140.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
]

const meta = preview.meta({
  title: 'Shop/Basket',
  component: Basket,
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    onRemoveItem: {
      action: 'itemRemoved',
    },
    onCheckout: {
      action: 'checkoutClicked',
    },
    onContinueShopping: {
      action: 'continueShoppingClicked',
    },
  },
})

export default meta

function BasketWrapper(args: Omit<BasketProps, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open basket</Button>
      <Basket {...args} open={open} onClose={setOpen} />
    </div>
  )
}

export const Default = meta.story({
  render: (args: ComponentProps<typeof Basket>) => <BasketWrapper {...args} />,
  args: {
    items: mockItems,
    subtotal: '$262.00',
  },
})

export const Empty = meta.story({
  render: (args: ComponentProps<typeof Basket>) => <BasketWrapper {...args} />,
  args: {
    items: [],
    subtotal: '$0.00',
  },
})

