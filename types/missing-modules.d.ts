declare module 'react-wrap-balancer' {
  type ComponentType = import('react').ComponentType
  type ReactNode = import('react').ReactNode
  type HTMLAttributes<T> = import('react').HTMLAttributes<T>

  interface BalancerProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode
  }

  const Balancer: ComponentType<BalancerProps>
  export const Provider: ComponentType<{ children?: ReactNode }>
  export default Balancer
}

declare module '@chromatic-com/storybook' {
  import type { AddonAnnotation } from '@storybook/types'
  const chromatic: () => AddonAnnotation
  export default chromatic
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}


