import { clsx } from 'clsx'

export interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={clsx('flex items-center justify-center py-8', className)}>
      <div className="flex space-x-2">
        <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
        <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
        <div className="size-2 animate-bounce rounded-full bg-gray-400" />
      </div>
    </div>
  )
}
