'use client'

import { useState, useMemo } from 'react'
import { Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface Member {
  id: string
  memberId: string
  firstName: string
  lastName: string
  phone: string
  address: string
  dateJoined: string
  status: 'active' | 'inactive'
  role: 'admin' | 'treasurer' | 'secretary' | 'deacon' | 'member'
  loginId: string
  password: string
}

interface MembersTableProps {
  members: Member[]
  onAdd: () => void
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
}

type SortField = 'name' | 'dateJoined' | 'status'
type SortOrder = 'asc' | 'desc'

export default function MembersTable({
  members,
  onAdd,
  onEdit,
  onDelete,
}: MembersTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortField, setSortField] = useState<SortField>('dateJoined')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter and search
  const filtered = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = 
        member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phone.includes(searchQuery)
      
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [members, searchQuery, statusFilter])

  // Sort
  const sorted = useMemo(() => {
    const copy = [...filtered]
    copy.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      if (sortField === 'name') {
        aValue = `${a.firstName} ${a.lastName}`.toLowerCase()
        bValue = `${b.firstName} ${b.lastName}`.toLowerCase()
      } else if (sortField === 'dateJoined') {
        aValue = new Date(a.dateJoined).getTime()
        bValue = new Date(b.dateJoined).getTime()
      } else {
        aValue = a.status
        bValue = b.status
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [filtered, sortField, sortOrder])

  // Paginate
  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const paginatedMembers = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? 
      <ChevronUp className="inline h-4 w-4 ml-1" /> : 
      <ChevronDown className="inline h-4 w-4 ml-1" />
  }

  return (
    <div className="space-y-4">
      {/* Header with search and filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4 flex-1">
          <Input
            placeholder="Search by name, ID, or phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="md:w-64"
          />
          <Select value={statusFilter} onValueChange={(value: any) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onAdd} className="w-full md:w-auto">
          Add Member
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-24">Member ID</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('name')}
              >
                Full Name <SortIcon field="name" />
              </TableHead>
              <TableHead className="hidden md:table-cell">Contact Number</TableHead>
              <TableHead className="hidden lg:table-cell">Address</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="hidden md:table-cell">Login ID</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('dateJoined')}
              >
                Date Joined <SortIcon field="dateJoined" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('status')}
              >
                Status <SortIcon field="status" />
              </TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMembers.map((member) => (
              <TableRow key={member.id} className="border-b border-border hover:bg-muted/50">
                <TableCell className="font-medium text-sm">{member.memberId}</TableCell>
                <TableCell className="font-medium">{`${member.firstName} ${member.lastName}`}</TableCell>
                <TableCell className="text-sm text-muted-foreground hidden md:table-cell">{member.phone}</TableCell>
                <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{member.address}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                    member.role === 'admin' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                    member.role === 'treasurer' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                    member.role === 'secretary' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                    member.role === 'deacon' ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400' :
                    'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                  }`}>
                    {member.role}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-mono hidden md:table-cell text-muted-foreground">{member.loginId}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{member.dateJoined}</TableCell>
                <TableCell>
                  <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                      : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                  }`}>
                    {member.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(member)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(member)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {paginatedMembers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length} members
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i
              if (page > totalPages) return null
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
