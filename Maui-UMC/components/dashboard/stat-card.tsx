'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
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

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">{value}</h3>
          {change && (
            <p className="mt-2 text-xs text-muted-foreground">
              <span className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {change}
              </span>{' '}
              from last month
            </p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
