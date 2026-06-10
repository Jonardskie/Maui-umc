'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FundStatsCard from '@/components/dashboard/fund-stats-card'
import FundsTable, { type Fund } from '@/components/dashboard/funds-table'
import { CreateFundDialog, EditFundDialog, DeleteFundDialog } from '@/components/dashboard/fund-dialogs'
import ChartContainer from '@/components/dashboard/chart-container'

const mockFunds: Fund[] = [
  {
    id: 'fund-001',
    name: 'General Fund',
    currentBalance: 45000,
    totalIncome: 125000,
    totalExpenses: 80000,
    status: 'active',
  },
  {
    id: 'fund-002',
    name: 'Building Fund',
    currentBalance: 78500,
    totalIncome: 95000,
    totalExpenses: 16500,
    status: 'active',
  },
  {
    id: 'fund-003',
    name: 'Mission Fund',
    currentBalance: 28000,
    totalIncome: 42000,
    totalExpenses: 14000,
    status: 'active',
  },
  {
    id: 'fund-004',
    name: 'Youth Ministry Fund',
    currentBalance: 15600,
    totalIncome: 28000,
    totalExpenses: 12400,
    status: 'active',
  },
  {
    id: 'fund-005',
    name: "Women's Benevolence Fund",
    currentBalance: 12200,
    totalIncome: 18000,
    totalExpenses: 5800,
    status: 'active',
  },
]

const fundGrowthData = [
  { name: 'Jan', 'General Fund': 35000, 'Building Fund': 65000, 'Mission Fund': 15000 },
  { name: 'Feb', 'General Fund': 38000, 'Building Fund': 68000, 'Mission Fund': 18000 },
  { name: 'Mar', 'General Fund': 40000, 'Building Fund': 72000, 'Mission Fund': 22000 },
  { name: 'Apr', 'General Fund': 42000, 'Building Fund': 75000, 'Mission Fund': 24000 },
  { name: 'May', 'General Fund': 44000, 'Building Fund': 77000, 'Mission Fund': 26000 },
  { name: 'Jun', 'General Fund': 45000, 'Building Fund': 78500, 'Mission Fund': 28000 },
]

const fundUtilizationData = [
  { name: 'General Fund', value: 45000 },
  { name: 'Building Fund', value: 78500 },
  { name: 'Mission Fund', value: 28000 },
  { name: 'Youth Ministry', value: 15600 },
  { name: "Women's Fund", value: 12200 },
]

export default function FundsPage() {
  const [funds, setFunds] = useState<Fund[]>(mockFunds)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)

  const handleCreateFund = (fundData: { name: string; targetBalance: number; description: string }) => {
    const newFund: Fund = {
      id: `fund-${Date.now()}`,
      name: fundData.name,
      currentBalance: fundData.targetBalance,
      totalIncome: 0,
      totalExpenses: 0,
      status: 'active',
    }
    setFunds([...funds, newFund])
  }

  const handleEditFund = (fund: Fund) => {
    setSelectedFund(fund)
    setEditOpen(true)
  }

  const handleSaveFund = (fundId: string, fundData: { name: string; targetBalance: number; description: string }) => {
    setFunds(
      funds.map((fund) =>
        fund.id === fundId
          ? { ...fund, name: fundData.name, currentBalance: fundData.targetBalance }
          : fund
      )
    )
  }

  const handleDeleteFund = (fund: Fund) => {
    setSelectedFund(fund)
    setDeleteOpen(true)
  }

  const handleConfirmDelete = (fundId: string) => {
    setFunds(funds.filter((fund) => fund.id !== fundId))
  }

  const totalBalance = funds.reduce((sum, fund) => sum + fund.currentBalance, 0)
  const totalIncome = funds.reduce((sum, fund) => sum + fund.totalIncome, 0)
  const totalExpenses = funds.reduce((sum, fund) => sum + fund.totalExpenses, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Funds</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">Manage church funds and allocations</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Create Fund
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">${totalBalance.toLocaleString()}</h3>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">All active funds</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <h3 className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">${totalIncome.toLocaleString()}</h3>
          <p className="mt-2 text-sm text-muted-foreground">All contributions</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <h3 className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toLocaleString()}</h3>
          <p className="mt-2 text-sm text-muted-foreground">All allocations</p>
        </div>
      </div>

      {/* Fund Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {funds.map((fund) => (
          <FundStatsCard
            key={fund.id}
            fundName={fund.name}
            currentBalance={fund.currentBalance}
            totalIncome={fund.totalIncome}
            totalExpenses={fund.totalExpenses}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer
          title="Fund Growth Trend"
          type="line"
          data={fundGrowthData}
          height={300}
          dataKey1="General Fund"
          dataKey2="Building Fund"
        />
        <ChartContainer
          title="Fund Utilization"
          type="pie"
          data={fundUtilizationData}
          height={300}
        />
      </div>

      {/* Funds Table */}
      <FundsTable funds={funds} onEdit={handleEditFund} onDelete={handleDeleteFund} />

      {/* Dialogs */}
      <CreateFundDialog open={createOpen} onOpenChange={setCreateOpen} onCreateFund={handleCreateFund} />
      <EditFundDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        fund={selectedFund}
        onSaveFund={handleSaveFund}
      />
      <DeleteFundDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        fund={selectedFund}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  )
}
