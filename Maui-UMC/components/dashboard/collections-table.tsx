'use client'

import { useState, useMemo } from 'react'
import { Edit2, Trash2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface Collection {
  id: string
  date: string
  memberName: string
  type: string
  fund: string
  amount: number
  verificationStatus: 'verified' | 'pending'
}

interface CollectionsTableProps {
  collections: Collection[]
  onEdit: (collection: Collection) => void
  onDelete: (id: string) => void
  onVerify: (id: string) => void
}

const ITEMS_PER_PAGE = 10

export default function CollectionsTable({
  collections,
  onEdit,
  onDelete,
  onVerify,
}: CollectionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'desc',
  })

  const filteredCollections = useMemo(() => {
    let filtered = collections.filter((collection) => {
      const matchesSearch =
        collection.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.date.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' || collection.verificationStatus === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key as keyof Collection]
      let bValue = b[sortConfig.key as keyof Collection]

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return filtered
  }, [collections, searchTerm, statusFilter, sortConfig])

  const totalPages = Math.ceil(filteredCollections.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const displayedCollections = filteredCollections.slice(startIndex, endIndex)

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as 'all' | 'verified' | 'pending')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Collections</h3>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search by member or date..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full sm:w-64 text-sm"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="text-sm sm:text-base">
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                onClick={() => handleSort('date')}
              >
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                onClick={() => handleSort('memberName')}
              >
                Member {sortConfig.key === 'memberName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm hidden md:table-cell" onClick={() => handleSort('type')}>
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm hidden lg:table-cell" onClick={() => handleSort('fund')}>
                Fund {sortConfig.key === 'fund' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-right cursor-pointer hover:bg-muted/50 text-xs sm:text-sm" onClick={() => handleSort('amount')}>
                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="text-center cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                onClick={() => handleSort('verificationStatus')}
              >
                Status {sortConfig.key === 'verificationStatus' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCollections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No collections found
                </TableCell>
              </TableRow>
            ) : (
              displayedCollections.map((collection) => (
                <TableRow key={collection.id} className="hover:bg-muted/50">
                  <TableCell className="text-xs sm:text-sm text-muted-foreground">{collection.date}</TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium text-foreground">{collection.memberName}</TableCell>
                  <TableCell className="text-xs sm:text-sm text-muted-foreground hidden md:table-cell">{collection.type}</TableCell>
                  <TableCell className="text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">{collection.fund}</TableCell>
                  <TableCell className="text-right text-xs sm:text-sm font-semibold text-green-500">${collection.amount}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-block rounded px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium ${
                        collection.verificationStatus === 'verified'
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                          : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                      }`}
                    >
                      {collection.verificationStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      {collection.verificationStatus === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onVerify(collection.id)}
                          title="Verify"
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                        >
                          <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(collection)}
                        title="Edit"
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                      >
                        <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(collection.id)}
                        title="Delete"
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-muted-foreground">
        <span className="order-2 sm:order-1">Showing {displayedCollections.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredCollections.length)} of {filteredCollections.length} collections</span>
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
