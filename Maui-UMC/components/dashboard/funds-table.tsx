'use client'

import { useMemo, useState } from 'react'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface Fund {
  id: string
  name: string
  currentBalance: number
  totalIncome: number
  totalExpenses: number
  status: 'active' | 'inactive'
}

interface FundsTableProps {
  funds: Fund[]
  onEdit: (fund: Fund) => void
  onDelete: (fundId: string) => void
}

type SortConfig = {
  key: keyof Fund
  direction: 'asc' | 'desc'
}

export default function FundsTable({ funds, onEdit, onDelete }: FundsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredFunds = useMemo(() => {
    return funds.filter((fund) =>
      fund.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [funds, searchTerm])

  const sortedFunds = useMemo(() => {
    const sorted = [...filteredFunds].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue)
      }

      if (typeof aValue === 'number') {
        return sortConfig.direction === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
      }

      return 0
    })
    return sorted
  }, [filteredFunds, sortConfig])

  const totalPages = Math.ceil(sortedFunds.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedFunds = sortedFunds.slice(startIndex, endIndex)

  const handleSort = (key: keyof Fund) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Church Funds</h3>
        <Input
          placeholder="Search by fund name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="text-sm sm:text-base">
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                onClick={() => handleSort('name')}
              >
                Fund Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                onClick={() => handleSort('currentBalance')}
              >
                Balance {sortConfig.key === 'currentBalance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 text-xs sm:text-sm hidden sm:table-cell"
                onClick={() => handleSort('totalIncome')}
              >
                Income {sortConfig.key === 'totalIncome' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 text-xs sm:text-sm hidden md:table-cell"
                onClick={() => handleSort('totalExpenses')}
              >
                Expenses {sortConfig.key === 'totalExpenses' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Status</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedFunds.map((fund) => (
              <TableRow key={fund.id} className="hover:bg-muted/50">
                <TableCell className="text-xs sm:text-sm font-medium text-foreground">{fund.name}</TableCell>
                <TableCell className="text-right text-xs sm:text-sm font-semibold text-foreground">
                  ${fund.currentBalance.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-xs sm:text-sm text-green-600 dark:text-green-400 hidden sm:table-cell">
                  ${fund.totalIncome.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-xs sm:text-sm text-red-600 dark:text-red-400 hidden md:table-cell">
                  ${fund.totalExpenses.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-block rounded px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium ${
                      fund.status === 'active'
                        ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                        : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {fund.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(fund)}
                      title="Edit"
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                    >
                      <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(fund.id)}
                      title="Delete"
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-muted-foreground">
        <span className="order-2 sm:order-1">Showing {displayedFunds.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, sortedFunds.length)} of {sortedFunds.length} funds</span>
        <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-xs sm:text-sm h-8 sm:h-9"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-xs sm:text-sm h-8 sm:h-9"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
