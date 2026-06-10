'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Member } from './members-table'

interface MemberDialogsProps {
  isAddOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  editingMember: Member | null
  deletingMember: Member | null
  onAddOpenChange: (open: boolean) => void
  onEditOpenChange: (open: boolean) => void
  onDeleteOpenChange: (open: boolean) => void
  onAddSubmit: (data: Omit<Member, 'id'>) => void
  onEditSubmit: (data: Member) => void
  onDeleteConfirm: () => void
}

export default function MemberDialogs({
  isAddOpen,
  isEditOpen,
  isDeleteOpen,
  editingMember,
  deletingMember,
  onAddOpenChange,
  onEditOpenChange,
  onDeleteOpenChange,
  onAddSubmit,
  onEditSubmit,
  onDeleteConfirm,
}: MemberDialogsProps) {
  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    memberId: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    dateJoined: '',
    status: 'active',
    role: 'member',
    loginId: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof Member, string>>>({})

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter'
    if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter'
    if (!/[0-9]/.test(password)) return 'Password must contain a number'
    return undefined
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
    if (!formData.memberId.trim()) newErrors.memberId = 'Member ID is required'
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.dateJoined) newErrors.dateJoined = 'Date joined is required'
    if (!formData.loginId.trim()) newErrors.loginId = 'Login ID is required'
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.loginId)) newErrors.loginId = 'Login ID must be 3-20 alphanumeric characters'
    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddOpen = (open: boolean) => {
    if (open) {
      setFormData({
        memberId: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        dateJoined: '',
        status: 'active',
        role: 'member',
        loginId: '',
        password: '',
      })
      setErrors({})
      setShowPassword(false)
    }
    onAddOpenChange(open)
  }

  const handleEditOpen = (open: boolean) => {
    if (open && editingMember) {
      setFormData(editingMember)
      setErrors({})
    }
    onEditOpenChange(open)
  }

  const handleAddSubmit = () => {
    if (validateForm()) {
      onAddSubmit(formData)
      handleAddOpen(false)
    }
  }

  const handleEditSubmit = () => {
    if (validateForm() && editingMember) {
      onEditSubmit({ ...formData, id: editingMember.id })
      handleEditOpen(false)
    }
  }

  return (
    <>
      {/* Add Member Dialog */}
      <Dialog open={isAddOpen} onOpenChange={handleAddOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription>Add a new member to the church system.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Member ID</label>
              <Input
                placeholder="e.g., MEM-001"
                value={formData.memberId}
                onChange={(e) => {
                  setFormData({ ...formData, memberId: e.target.value })
                  if (errors.memberId) setErrors({ ...errors, memberId: undefined })
                }}
              />
              {errors.memberId && <p className="text-xs text-red-500">{errors.memberId}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value })
                    if (errors.firstName) setErrors({ ...errors, firstName: undefined })
                  }}
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value })
                    if (errors.lastName) setErrors({ ...errors, lastName: undefined })
                  }}
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Contact Number</label>
              <Input
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                  if (errors.phone) setErrors({ ...errors, phone: undefined })
                }}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Address</label>
              <Input
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value })
                  if (errors.address) setErrors({ ...errors, address: undefined })
                }}
              />
              {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Date Joined</label>
                <Input
                  type="date"
                  value={formData.dateJoined}
                  onChange={(e) => {
                    setFormData({ ...formData, dateJoined: e.target.value })
                    if (errors.dateJoined) setErrors({ ...errors, dateJoined: undefined })
                  }}
                />
                {errors.dateJoined && <p className="text-xs text-red-500">{errors.dateJoined}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Status</label>
                <Select value={formData.status} onValueChange={(value: any) => {
                  setFormData({ ...formData, status: value })
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Role</label>
              <Select value={formData.role} onValueChange={(value: any) => {
                setFormData({ ...formData, role: value })
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="treasurer">Treasurer</SelectItem>
                  <SelectItem value="secretary">Secretary</SelectItem>
                  <SelectItem value="deacon">Deacon</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Login ID</label>
              <Input
                placeholder="Username (3-20 alphanumeric)"
                value={formData.loginId}
                onChange={(e) => {
                  setFormData({ ...formData, loginId: e.target.value })
                  if (errors.loginId) setErrors({ ...errors, loginId: undefined })
                }}
              />
              {errors.loginId && <p className="text-xs text-red-500">{errors.loginId}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 chars, uppercase, lowercase, number"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditOpen} onOpenChange={handleEditOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>Update member information.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Member ID</label>
              <Input
                placeholder="e.g., MEM-001"
                value={formData.memberId}
                onChange={(e) => {
                  setFormData({ ...formData, memberId: e.target.value })
                  if (errors.memberId) setErrors({ ...errors, memberId: undefined })
                }}
              />
              {errors.memberId && <p className="text-xs text-red-500">{errors.memberId}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value })
                    if (errors.firstName) setErrors({ ...errors, firstName: undefined })
                  }}
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value })
                    if (errors.lastName) setErrors({ ...errors, lastName: undefined })
                  }}
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Contact Number</label>
              <Input
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                  if (errors.phone) setErrors({ ...errors, phone: undefined })
                }}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Address</label>
              <Input
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value })
                  if (errors.address) setErrors({ ...errors, address: undefined })
                }}
              />
              {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Date Joined</label>
                <Input
                  type="date"
                  value={formData.dateJoined}
                  onChange={(e) => {
                    setFormData({ ...formData, dateJoined: e.target.value })
                    if (errors.dateJoined) setErrors({ ...errors, dateJoined: undefined })
                  }}
                />
                {errors.dateJoined && <p className="text-xs text-red-500">{errors.dateJoined}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Status</label>
                <Select value={formData.status} onValueChange={(value: any) => {
                  setFormData({ ...formData, status: value })
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Role</label>
              <Select value={formData.role} onValueChange={(value: any) => {
                setFormData({ ...formData, role: value })
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="treasurer">Treasurer</SelectItem>
                  <SelectItem value="secretary">Secretary</SelectItem>
                  <SelectItem value="deacon">Deacon</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Login ID</label>
              <Input
                placeholder="Username (3-20 alphanumeric)"
                value={formData.loginId}
                onChange={(e) => {
                  setFormData({ ...formData, loginId: e.target.value })
                  if (errors.loginId) setErrors({ ...errors, loginId: undefined })
                }}
              />
              {errors.loginId && <p className="text-xs text-red-500">{errors.loginId}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 chars, uppercase, lowercase, number"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">
                {deletingMember ? `${deletingMember.firstName} ${deletingMember.lastName}` : ''}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => onDeleteOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDeleteConfirm()
                onDeleteOpenChange(false)
              }}
            >
              Delete Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
