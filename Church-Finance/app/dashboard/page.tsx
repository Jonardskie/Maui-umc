'use client'

import { DollarSign, TrendingUp, Wallet, Users, PiggyBank, Gift } from 'lucide-react'
import StatCard from '@/components/dashboard/stat-card'
import ChartContainer from '@/components/dashboard/chart-container'
import TransactionsAndVouchersTable from '@/components/dashboard/transactions-table'

// Monthly income trend data
const monthlyIncomeData = [
  { name: 'Jan', income: 8500 },
  { name: 'Feb', income: 9200 },
  { name: 'Mar', income: 8800 },
  { name: 'Apr', income: 10500 },
  { name: 'May', income: 11200 },
  { name: 'Jun', income: 12800 },
]

// Monthly expense trend data
const monthlyExpenseData = [
  { name: 'Jan', expense: 4200 },
  { name: 'Feb', expense: 4800 },
  { name: 'Mar', expense: 5100 },
  { name: 'Apr', expense: 5500 },
  { name: 'May', expense: 5800 },
  { name: 'Jun', expense: 6200 },
]

// Fund distribution data
const fundDistributionData = [
  { name: 'General Fund', value: 40 },
  { name: 'Building Fund', value: 25 },
  { name: 'Benevolence Fund', value: 20 },
  { name: 'Operations Fund', value: 10 },
  { name: 'Missions Fund', value: 5 },
]

// Collection types breakdown
const collectionTypesData = [
  { name: 'Tithes', value: 35 },
  { name: 'Offerings', value: 30 },
  { name: 'Donations', value: 20 },
  { name: 'Pledges', value: 10 },
  { name: 'Other', value: 5 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to the Church Financial Management System. Here&apos;s your financial overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
        <StatCard
          title="Total Income"
          value="$61,000"
          change="+15.3%"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Total Expenses"
          value="$31,600"
          change="+8.2%"
          icon={TrendingUp}
          color="red"
        />
        <StatCard
          title="Current Balance"
          value="$29,400"
          change="+22.5%"
          icon={Wallet}
          color="blue"
        />
        <StatCard
          title="Collections This Month"
          value="$12,800"
          change="+5.1%"
          icon={Gift}
          color="orange"
        />
        <StatCard
          title="Active Funds"
          value="5"
          change="+1"
          icon={PiggyBank}
          color="purple"
        />
        <StatCard
          title="Active Members"
          value="156"
          change="+8"
          icon={Users}
          color="pink"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer
          title="Monthly Income Trend"
          type="line"
          data={monthlyIncomeData}
          height={300}
          dataKey1="income"
        />
        <ChartContainer
          title="Monthly Expense Trend"
          type="line"
          data={monthlyExpenseData}
          height={300}
          dataKey1="expense"
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer
          title="Fund Distribution"
          type="pie"
          data={fundDistributionData}
          height={300}
        />
        <ChartContainer
          title="Collection Types Breakdown"
          type="pie"
          data={collectionTypesData}
          height={300}
        />
      </div>

      {/* Transactions and Vouchers Tables */}
      <TransactionsAndVouchersTable />
    </div>
  )
}
