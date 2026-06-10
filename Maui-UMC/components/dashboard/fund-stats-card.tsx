'use client'

import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

interface FundStatsCardProps {
  fundName: string
  currentBalance: number
  totalIncome: number
  totalExpenses: number
}

export default function FundStatsCard({
  fundName,
  currentBalance,
  totalIncome,
  totalExpenses,
}: FundStatsCardProps) {
  const incomeChange = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-muted-foreground">{fundName}</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold text-foreground">${currentBalance.toLocaleString()}</h3>
          
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Income</p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-green-600 dark:text-green-400">
                +${totalIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Expenses</p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-red-600 dark:text-red-400">
                -${totalExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <div className="rounded-full bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
            <Wallet className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
