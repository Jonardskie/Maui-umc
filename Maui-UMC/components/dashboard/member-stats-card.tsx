import { LucideIcon } from 'lucide-react'

interface MemberStatsCardProps {
  title: string
  value: string | number
  change?: string
  icon: LucideIcon
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'pink'
}

const colorClasses = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
}

export default function MemberStatsCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
}: MemberStatsCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">{change}</p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
