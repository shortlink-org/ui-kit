import type { ReactNode, FC } from 'react'

type TimelineItemProps = {
  id?: string | number
  name: string
  date: string
  action: string
  content: string
  icon: ReactNode
}

const TimelineItem: FC<TimelineItemProps> = ({
  name,
  date,
  action,
  content,
  icon,
}) => (
  <div className="relative group">
    <div className="md:flex items-center md:space-x-4 mb-3">
      <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
        {/* Icon */}
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-full
          bg-white dark:bg-gray-800 shadow-md
          transition-all duration-300 ease-in-out
          group-hover:scale-110 group-hover:shadow-lg
          md:order-1
        `}>
          <div className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
        {/* Date */}
        <time className={`
          font-caveat font-medium text-xl
          text-indigo-500 dark:text-indigo-300
          transition-colors duration-200
          md:w-28
        `}>
          {date}
        </time>
      </div>
      {/* Title */}
      <div className="text-slate-500 ml-14 dark:text-gray-300 transition-colors duration-200">
        <span className="text-slate-900 font-bold dark:text-gray-100">
          {name}
        </span>{' '}
        {action}
      </div>
    </div>
    {/* Card */}
    <div className={`
      bg-white dark:bg-gray-800 p-4 rounded-lg
      border border-slate-200 dark:border-gray-700
      text-slate-500 dark:text-gray-300
      shadow-sm ml-14 md:ml-44
      transition-all duration-300 ease-in-out
      group-hover:shadow-md group-hover:border-indigo-300 dark:group-hover:border-indigo-600
      group-hover:-translate-y-0.5
    `}>
      {content}
    </div>
  </div>
)

export type TimelineProps = {
  items: TimelineItemProps[]
}

export const Timeline: FC<TimelineProps> = ({ items }) => {
  const getItemKey = (item: TimelineItemProps, index: number): string | number => {
    // Use id if provided, otherwise create a stable key from item properties
    if (item.id !== undefined) {
      return item.id
    }
    // Create a stable key from date, name, and action
    return `${item.date}-${item.name}-${item.action}` || index
  }

  return (
    <div className={`
      space-y-8 relative
      before:absolute before:inset-0
      before:ml-5 before:-translate-x-px
      md:before:ml-[8.75rem] md:before:translate-x-0
      before:h-full before:w-0.5
      before:bg-gradient-to-b
      before:from-transparent before:via-slate-300 dark:before:via-slate-600
      before:to-transparent
      before:transition-colors duration-200
    `}>
      {items.map((item, index) => (
        <TimelineItem
          key={getItemKey(item, index)}
          date={item.date}
          name={item.name}
          action={item.action}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

export default Timeline
