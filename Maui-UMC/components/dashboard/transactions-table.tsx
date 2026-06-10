'use client'

import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'

interface Transaction {
  id: string
  date: string
  type: 'income' | 'expense'
  description: string
  fund: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

interface Voucher {
  id: string
  voucherNumber: string
  payee: string
  amount: number
  status: 'approved' | 'pending' | 'rejected'
}

interface TablesProps {
  transactions?: Transaction[]
  vouchers?: Voucher[]
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-06-08',
    type: 'income',
    description: 'Sunday Collections',
    fund: 'General Fund',
    amount: 2500,
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-06-07',
    type: 'expense',
    description: 'Utilities Payment',
    fund: 'Operations Fund',
    amount: 450,
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-06-06',
    type: 'income',
    description: 'Donations',
    fund: 'Benevolence Fund',
    amount: 1200,
    status: 'completed',
  },
  {
    id: '4',
    date: '2024-06-05',
    type: 'expense',
    description: 'Building Maintenance',
    fund: 'Building Fund',
    amount: 800,
    status: 'completed',
  },
  {
    id: '5',
    date: '2024-06-04',
    type: 'income',
    description: 'Pledges',
    fund: 'General Fund',
    amount: 3000,
    status: 'pending',
  },
]

const sampleVouchers: Voucher[] = [
  {
    id: '1',
    voucherNumber: 'V-2024-001',
    payee: 'City Utilities',
    amount: 450,
    status: 'approved',
  },
  {
    id: '2',
    voucherNumber: 'V-2024-002',
    payee: 'Building Contractor',
    amount: 2500,
    status: 'approved',
  },
  {
    id: '3',
    voucherNumber: 'V-2024-003',
    payee: 'Office Supplies Inc',
    amount: 180,
    status: 'pending',
  },
  {
    id: '4',
    voucherNumber: 'V-2024-004',
    payee: 'Cleaning Services',
    amount: 300,
    status: 'approved',
  },
  {
    id: '5',
    voucherNumber: 'V-2024-005',
    payee: 'Insurance Provider',
    amount: 1500,
    status: 'pending',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
    case 'approved':
      return 'bg-green-500/10 text-green-700 dark:text-green-400'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
    case 'failed':
    case 'rejected':
      return 'bg-red-500/10 text-red-700 dark:text-red-400'
    default:
      return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
  }
}

export default function TransactionsAndVouchersTable({
  transactions = sampleTransactions,
  vouchers = sampleVouchers,
}: TablesProps) {
  return (
    <div className="space-y-6">
      {/* Recent Transactions */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Transactions</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Fund</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full p-1 ${
                          transaction.type === 'income'
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-sm capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{transaction.description}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.fund}</td>
                  <td
                    className={`px-4 py-3 text-right text-sm font-semibold ${
                      transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Vouchers */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Vouchers</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Voucher Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payee</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{voucher.voucherNumber}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{voucher.payee}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">${voucher.amount}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${getStatusColor(voucher.status)}`}>
                      {voucher.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
